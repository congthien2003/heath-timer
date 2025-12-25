import { app } from "electron";
import { join } from "path";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { Settings, DEFAULT_SETTINGS } from "../../shared/models/settings.model";

export class StorageService {
	private settingsPath: string;

	constructor() {
		const userDataPath = app.getPath("userData");
		const configDir = join(userDataPath, "config");

		// Ensure config directory exists
		if (!existsSync(configDir)) {
			mkdirSync(configDir, { recursive: true });
		}

		this.settingsPath = join(configDir, "settings.json");
		console.log("Settings path:", this.settingsPath);
	}

	loadSettings(): Settings {
		try {
			if (existsSync(this.settingsPath)) {
				const data = readFileSync(this.settingsPath, "utf-8");
				const settings = JSON.parse(data);
				console.log("Loaded settings:", settings);
				return { ...DEFAULT_SETTINGS, ...settings };
			}
		} catch (error) {
			console.error("Failed to load settings:", error);
		}

		console.log("Using default settings");
		return DEFAULT_SETTINGS;
	}

	saveSettings(settings: Settings): void {
		try {
			writeFileSync(
				this.settingsPath,
				JSON.stringify(settings, null, 2),
				"utf-8"
			);
			console.log("Settings saved:", settings);
		} catch (error) {
			console.error("Failed to save settings:", error);
		}
	}
}
