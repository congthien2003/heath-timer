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

	// History & Stats events
	HISTORY_ADD: "history:add",
	HISTORY_GET_ALL: "history:get-all",
	STATS_GET: "stats:get",
	BEST_STREAK_GET: "stats:best-streak",
} as const;

export type IpcEventType = (typeof IPC_EVENTS)[keyof typeof IPC_EVENTS];
