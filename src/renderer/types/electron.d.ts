// Type definitions for electron API exposed via preload
export interface ElectronAPI {
	startTimer: () => void;
	pauseTimer: () => void;
	resetTimer: () => void;
	completeTask: (taskId: string) => void;
	snoozeTask: (minutes: number) => void;
	getSettings: () => Promise<any>;
	saveSettings: (settings: any) => void;
	getTimerInfo: () => Promise<{
		isSnoozed: boolean;
		currentThreshold: number;
		originalThreshold: number;
	}>;
	onTimerTick: (callback: (time: number) => void) => void;
	onTaskTriggered: (callback: (task: any) => void) => void;
	onTaskCompleted: (callback: () => void) => void;
	onSettingsUpdated: (callback: (settings: any) => void) => void;
}

declare global {
	interface Window {
		electronAPI: ElectronAPI;
	}
}

export {};
