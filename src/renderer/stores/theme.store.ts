import { create } from "zustand";

type ThemeMode = "light" | "dark" | "system";

interface ThemeStore {
	theme: ThemeMode;
	resolved: "light" | "dark";
	setTheme: (theme: ThemeMode) => void;
	initTheme: () => void;
}

function getSystemTheme(): "light" | "dark" {
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

function applyTheme(resolved: "light" | "dark") {
	document.documentElement.setAttribute("data-theme", resolved);
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
	theme: "system",
	resolved: "light",

	setTheme: (theme: ThemeMode) => {
		const resolved = theme === "system" ? getSystemTheme() : theme;
		applyTheme(resolved);
		set({ theme, resolved });

		if (window.electronAPI) {
			window.electronAPI.getSettings().then((settings) => {
				window.electronAPI.saveSettings({ ...settings, theme });
			});
		}
	},

	initTheme: async () => {
		let savedTheme: ThemeMode = "system";

		if (window.electronAPI) {
			try {
				const settings = await window.electronAPI.getSettings();
				if (settings.theme) {
					savedTheme = settings.theme;
				}
			} catch {
				savedTheme = "system";
			}
		}

		const resolved =
			savedTheme === "system" ? getSystemTheme() : savedTheme;
		applyTheme(resolved);
		set({ theme: savedTheme, resolved });

		if (savedTheme === "system") {
			window
				.matchMedia("(prefers-color-scheme: dark)")
				.addEventListener("change", (e) => {
					const { theme: currentTheme } = get();
					if (currentTheme === "system") {
						const newResolved = e.matches ? "dark" : "light";
						applyTheme(newResolved);
						set({ resolved: newResolved });
					}
				});
		}
	},
}));
