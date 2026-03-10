import Store from "electron-store";
import { Settings, DEFAULT_SETTINGS } from "../../shared/models/settings.model";
import { HistoryRecord, UserStats } from "../../shared/models/history.model";

interface Schema {
	settings: Settings;
	history: HistoryRecord[];
	stats: UserStats;
}

export class StorageService {
	private store: Store<Schema>;

	constructor() {
		this.store = new Store<Schema>({
			defaults: {
				settings: DEFAULT_SETTINGS,
				history: [],
				stats: {
					totalCompleted: 0,
					currentStreak: 0,
					bestStreak: 0,
				},
			},
		});

		console.log("Store path:", this.store.path);
	}

	loadSettings(): Settings {
		return this.store.get("settings");
	}

	saveSettings(settings: Settings): void {
		this.store.set("settings", settings);
	}

	// History methods
	addHistory(record: HistoryRecord): void {
		const history = this.store.get("history") || [];
		history.push(record);
		// Keep only last 100 records to avoid bloat
		if (history.length > 100) {
			history.shift();
		}
		this.store.set("history", history);
		this.updateStats(record);
	}

	getHistory(): HistoryRecord[] {
		return this.store.get("history") || [];
	}

	// Stats methods
	getStats(): UserStats {
		return this.store.get("stats");
	}

	private updateStats(record: HistoryRecord): void {
		const stats = this.store.get("stats");
		const today = new Date(record.completedAt).toISOString().split("T")[0];

		stats.totalCompleted += 1;

		if (stats.lastCompletedDate === today) {
			// Already completed today, do nothing to streak
		} else {
			const yesterday = new Date();
			yesterday.setDate(yesterday.getDate() - 1);
			const yesterdayStr = yesterday.toISOString().split("T")[0];

			if (stats.lastCompletedDate === yesterdayStr) {
				stats.currentStreak += 1;
			} else {
				stats.currentStreak = 1;
			}

			if (stats.currentStreak > stats.bestStreak) {
				stats.bestStreak = stats.currentStreak;
			}
			stats.lastCompletedDate = today;
		}

		this.store.set("stats", stats);
	}
}
