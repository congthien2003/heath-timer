export interface HistoryRecord {
	id: string; // epoch timestamp + taskId
	taskId: string;
	taskTitle: string;
	completedAt: number; // timestamp
}

export interface UserStats {
	totalCompleted: number;
	currentStreak: number;
	bestStreak: number;
	lastCompletedDate?: string; // YYYY-MM-DD
}

export interface AppData {
	settings: any; // Keep settings here or separate
	history: HistoryRecord[];
	stats: UserStats;
}
