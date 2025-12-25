import { contextBridge, ipcRenderer } from "electron";
import { IPC_EVENTS } from "../shared/ipc-events";

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("electronAPI", {
	// Timer controls
	startTimer: () => ipcRenderer.send(IPC_EVENTS.TIMER_START),
	pauseTimer: () => ipcRenderer.send(IPC_EVENTS.TIMER_PAUSE),
	resetTimer: () => ipcRenderer.send(IPC_EVENTS.TIMER_RESET),

	// Task controls
	completeTask: (taskId: string) =>
		ipcRenderer.send(IPC_EVENTS.TASK_DONE, taskId),
	snoozeTask: (minutes: number) =>
		ipcRenderer.send(IPC_EVENTS.TASK_SNOOZE, minutes),

	// Settings
	getSettings: () => ipcRenderer.invoke(IPC_EVENTS.SETTINGS_GET),
	saveSettings: (settings: any) =>
		ipcRenderer.send(IPC_EVENTS.SETTINGS_SAVE, settings),

	// Timer info
	getTimerInfo: () => ipcRenderer.invoke(IPC_EVENTS.TIMER_INFO_GET),

	// Event listeners
	onTimerTick: (callback: (time: number) => void) => {
		ipcRenderer.on(IPC_EVENTS.TIMER_TICK, (_, time) => callback(time));
	},
	onTaskTriggered: (callback: (task: any) => void) => {
		ipcRenderer.on(IPC_EVENTS.TASK_TRIGGERED, (_, task) => callback(task));
	},
	onTaskCompleted: (callback: () => void) => {
		ipcRenderer.on(IPC_EVENTS.TASK_COMPLETED, () => callback());
	},
	onSettingsUpdated: (callback: (settings: any) => void) => {
		ipcRenderer.on(IPC_EVENTS.SETTINGS_UPDATED, (_, settings) =>
			callback(settings)
		);
	},
});
