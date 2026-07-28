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

	// Event listeners — each returns an unsubscribe so the renderer can clean
	// up in a useEffect return and avoid stacking duplicate listeners on remount.
	onTimerTick: (callback: (time: number) => void) => {
		const handler = (_: unknown, time: number) => callback(time);
		ipcRenderer.on(IPC_EVENTS.TIMER_TICK, handler);
		return () => ipcRenderer.removeListener(IPC_EVENTS.TIMER_TICK, handler);
	},
	onTaskTriggered: (callback: (task: any) => void) => {
		const handler = (_: unknown, task: any) => callback(task);
		ipcRenderer.on(IPC_EVENTS.TASK_TRIGGERED, handler);
		return () =>
			ipcRenderer.removeListener(IPC_EVENTS.TASK_TRIGGERED, handler);
	},
	onTaskCompleted: (callback: () => void) => {
		const handler = () => callback();
		ipcRenderer.on(IPC_EVENTS.TASK_COMPLETED, handler);
		return () => ipcRenderer.removeListener(IPC_EVENTS.TASK_COMPLETED, handler);
	},
	onSettingsUpdated: (callback: (settings: any) => void) => {
		const handler = (_: unknown, settings: any) => callback(settings);
		ipcRenderer.on(IPC_EVENTS.SETTINGS_UPDATED, handler);
		return () =>
			ipcRenderer.removeListener(IPC_EVENTS.SETTINGS_UPDATED, handler);
	},
	onTimerInfoUpdated: (
		callback: (info: {
			isSnoozed: boolean;
			currentThreshold: number;
		}) => void,
	) => {
		const handler = (
			_: unknown,
			info: { isSnoozed: boolean; currentThreshold: number },
		) => callback(info);
		ipcRenderer.on(IPC_EVENTS.TIMER_INFO_UPDATED, handler);
		return () =>
			ipcRenderer.removeListener(IPC_EVENTS.TIMER_INFO_UPDATED, handler);
	},
	// History & Stats
	getHistory: () => ipcRenderer.invoke(IPC_EVENTS.HISTORY_GET_ALL),
	getStats: () => ipcRenderer.invoke(IPC_EVENTS.STATS_GET),
});
