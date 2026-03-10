// Type definitions for electron API exposed via preload
import { Settings } from "../../shared/models/settings.model";
import { Task } from "../../shared/models/task.model";
import { HistoryRecord, UserStats } from "../../shared/models/history.model";

export interface ElectronAPI {
	startTimer: () => void;
	pauseTimer: () => void;
	resetTimer: () => void;
	completeTask: (taskId: string) => void;
	snoozeTask: (minutes: number) => void;
	getSettings: () => Promise<Settings>;
	saveSettings: (settings: Settings) => void;
	getTimerInfo: () => Promise<{
		isSnoozed: boolean;
		currentThreshold: number;
		originalThreshold: number;
	}>;
	getHistory: () => Promise<HistoryRecord[]>;
	getStats: () => Promise<UserStats>;
	onTimerTick: (callback: (time: number) => void) => void;
	onTaskTriggered: (callback: (task: Task) => void) => void;
	onTaskCompleted: (callback: () => void) => void;
	onSettingsUpdated: (callback: (settings: Settings) => void) => void;
}

declare global {
	interface Window {
		electronAPI: ElectronAPI;
	}
}

export {};
