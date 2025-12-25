import { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage } from "electron";
import { join } from "path";
import { IPC_EVENTS } from "../shared/ipc-events";
import { TimerService } from "./services/timer.service";
import { NotificationService } from "./services/notification.service";
import { StorageService } from "./services/storage.service";
import { getRandomTask } from "../shared/data/tasks.data";
import { Task } from "../shared/models/task.model";
import { Settings } from "../shared/models/settings.model";

let mainWindow: BrowserWindow | null = null;
let timerService: TimerService | null = null;
let notificationService: NotificationService | null = null;
let storageService: StorageService | null = null;
let currentTask: Task | null = null;
let tray: Tray | null = null;
let isQuitting = false;
let currentSettings: Settings;

function createWindow(): void {
	mainWindow = new BrowserWindow({
		width: 400,
		height: 600,
		resizable: false,
		webPreferences: {
			preload: join(__dirname, "../preload/index.cjs"),
			contextIsolation: true,
			nodeIntegration: false,
		},
	});

	// Load the renderer
	if (process.env.NODE_ENV === "development") {
		// Wait a bit for Vite dev server to be ready
		const loadURL = async () => {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			try {
				await mainWindow!.loadURL("http://localhost:5173");
				console.log("URL loaded successfully");
			} catch (err) {
				console.error("Failed to load URL:", err);
			}
		};
		loadURL();
		mainWindow.webContents.openDevTools(); // Enable để debug
	} else {
		mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
	}

	// Debug: log when page finishes loading
	mainWindow.webContents.on("did-finish-load", () => {
		console.log("Renderer page loaded successfully");
	});

	mainWindow.webContents.on(
		"did-fail-load",
		(_event, errorCode, errorDescription) => {
			console.error("Failed to load page:", errorCode, errorDescription);
		}
	);

	mainWindow.on("close", (event) => {
		// Minimize to tray instead of closing
		if (!isQuitting) {
			event.preventDefault();
			mainWindow?.hide();
		}
	});

	mainWindow.on("closed", () => {
		if (timerService) {
			timerService.destroy();
			timerService = null;
		}
		mainWindow = null;
	});

	// Initialize services
	storageService = new StorageService();
	currentSettings = storageService.loadSettings();

	timerService = new TimerService(mainWindow);
	notificationService = new NotificationService();

	// Apply settings to timer
	timerService.setThreshold(currentSettings.intervalMinutes);

	console.log("Services initialized with settings:", currentSettings);

	// Setup timer threshold callback
	timerService.onThresholdReached(() => {
		currentTask = getRandomTask();
		console.log("Task triggered:", currentTask);

		// Show notification
		if (notificationService && currentTask) {
			notificationService.show(currentTask);
		}

		// Send task to renderer
		if (mainWindow && !mainWindow.isDestroyed()) {
			console.log("Sending task to renderer...");
			mainWindow.webContents.send(IPC_EVENTS.TASK_TRIGGERED, currentTask);
		}
	});

	// Auto-start timer after page loads
	mainWindow.webContents.on("did-finish-load", () => {
		console.log("Starting timer with 60-minute interval...");
		timerService?.start();
	});
}

function createTray(): void {
	// Use the tray icon from resources
	const iconPath = join(__dirname, "../../resources/icon-tray.png");
	const icon = nativeImage.createFromPath(iconPath);
	tray = new Tray(icon);

	const contextMenu = Menu.buildFromTemplate([
		{
			label: "Health Timer",
			enabled: false,
		},
		{
			type: "separator",
		},
		{
			label: "Show App",
			click: () => {
				mainWindow?.show();
			},
		},
		{
			label: timerService?.getIsRunning() ? "Pause Timer" : "Start Timer",
			click: () => {
				if (timerService?.getIsRunning()) {
					timerService?.pause();
				} else {
					timerService?.start();
				}
			},
		},
		{
			type: "separator",
		},
		{
			label: "Quit",
			click: () => {
				isQuitting = true;
				app.quit();
			},
		},
	]);

	tray.setToolTip("Health Timer - Running");
	tray.setContextMenu(contextMenu);

	// Double click to show window
	tray.on("double-click", () => {
		mainWindow?.show();
	});
}

// App lifecycle
app.whenReady().then(() => {
	// Setup auto-launch on Windows
	if (currentSettings && currentSettings.autoStart) {
		app.setLoginItemSettings({
			openAtLogin: true,
			path: process.execPath,
		});
	}

	createWindow();
	createTray();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on("window-all-closed", () => {
	// Prevent quit on Windows when window is closed (keep running in tray)
	// Still quit on macOS when all windows closed
	if (process.platform === "darwin" && !isQuitting) {
		app.quit();
	}
});

// IPC Handlers - Settings
ipcMain.handle(IPC_EVENTS.SETTINGS_GET, () => {
	return currentSettings;
});

ipcMain.on(IPC_EVENTS.SETTINGS_SAVE, (_event, settings: Settings) => {
	console.log("Saving settings:", settings);
	currentSettings = settings;

	if (storageService) {
		storageService.saveSettings(settings);
	}

	// Apply auto-start setting
	app.setLoginItemSettings({
		openAtLogin: settings.autoStart,
		path: process.execPath,
	});

	// Apply new interval to timer
	if (timerService) {
		timerService.setThreshold(settings.intervalMinutes);
		timerService.reset();
		timerService.start();
	}

	// Notify renderer
	if (mainWindow && !mainWindow.isDestroyed()) {
		mainWindow.webContents.send(IPC_EVENTS.SETTINGS_UPDATED, settings);
	}
});

// IPC Handlers - Timer Info
ipcMain.handle(IPC_EVENTS.TIMER_INFO_GET, () => {
	if (timerService) {
		return {
			isSnoozed: timerService.getIsSnoozed(),
			currentThreshold: timerService.getThreshold(),
			originalThreshold: timerService.getOriginalThreshold(),
		};
	}
	return {
		isSnoozed: false,
		currentThreshold: 60,
		originalThreshold: 60,
	};
});

// IPC Handlers - Timer
ipcMain.on(IPC_EVENTS.TIMER_START, () => {
	console.log("Timer start requested");
	if (timerService) {
		timerService.start();
	}
});

ipcMain.on(IPC_EVENTS.TIMER_PAUSE, () => {
	console.log("Timer pause requested");
	if (timerService) {
		timerService.pause();
	}
});

ipcMain.on(IPC_EVENTS.TIMER_RESET, () => {
	console.log("Timer reset requested");
	if (timerService) {
		timerService.reset();
		currentTask = null;
		// Notify renderer that task is cleared
		if (mainWindow && !mainWindow.isDestroyed()) {
			mainWindow.webContents.send(IPC_EVENTS.TASK_COMPLETED);
		}
	}
});

ipcMain.on(IPC_EVENTS.TASK_DONE, (_event, taskId: string) => {
	console.log(`Task ${taskId} marked as done`);
	currentTask = null;

	// Reset timer after completing task
	if (timerService) {
		timerService.reset();
		timerService.start();
	}

	// Notify renderer
	if (mainWindow && !mainWindow.isDestroyed()) {
		mainWindow.webContents.send(IPC_EVENTS.TASK_COMPLETED);
	}
});

ipcMain.on(IPC_EVENTS.TASK_SNOOZE, (_event, minutes: number) => {
	console.log(`Task snoozed for ${minutes} minutes`);
	currentTask = null;

	// Reset timer and set SNOOZE threshold (will restore original after trigger)
	if (timerService) {
		timerService.reset();
		timerService.setSnoozeThreshold(minutes); // Use snooze method instead
		timerService.start();
	}

	// Notify renderer
	if (mainWindow && !mainWindow.isDestroyed()) {
		mainWindow.webContents.send(IPC_EVENTS.TASK_COMPLETED);
	}

	// Show snooze notification
	if (notificationService) {
		const originalInterval = timerService?.getOriginalThreshold() || 60;
		notificationService.showSimple(
			"⏰ Đã snooze",
			`Sẽ nhắc lại sau ${minutes} phút, sau đó trở về chu kỳ ${originalInterval} phút`
		);
	}
});

app.on("before-quit", () => {
	isQuitting = true;
	if (timerService) {
		timerService.destroy();
	}
	if (tray) {
		tray.destroy();
	}
});
