export interface Task {
	id: string;
	title: string;
	type: "water" | "break" | "eye";
	duration?: number; // seconds
	icon?: string;
}

export interface TaskStatus {
	taskId: string;
	status: "pending" | "active" | "completed" | "snoozed";
	triggeredAt?: Date;
	completedAt?: Date;
	snoozedUntil?: Date;
}
