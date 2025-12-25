// IPC Events Constants
export const IPC_EVENTS = {
	// Timer events
	TIMER_TICK: "timer:tick",
	TIMER_START: "timer:start",
	TIMER_PAUSE: "timer:pause",
	TIMER_RESET: "timer:reset",

	// Task events
	TASK_TRIGGERED: "task:triggered",
	TASK_DONE: "task:done",
	TASK_SNOOZE: "task:snooze",
	TASK_COMPLETED: "task:completed",

	// Settings events
	SETTINGS_GET: "settings:get",
	SETTINGS_SAVE: "settings:save",
	SETTINGS_UPDATED: "settings:updated",

	// Timer info
	TIMER_INFO_GET: "timer:info:get",
} as const;

export type IpcEventType = (typeof IPC_EVENTS)[keyof typeof IPC_EVENTS];
