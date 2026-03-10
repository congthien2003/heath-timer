export interface Settings {
	intervalMinutes: 30 | 45 | 60;
	soundEnabled: boolean;
	autoStart: boolean;
	notificationEnabled: boolean;
	theme: "light" | "dark" | "system";
}

export const DEFAULT_SETTINGS: Settings = {
	intervalMinutes: 60,
	soundEnabled: true,
	autoStart: false,
	notificationEnabled: true,
	theme: "system",
};
