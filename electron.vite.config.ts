import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
	main: {
		plugins: [externalizeDepsPlugin()],
		resolve: {
			alias: {
				"@main": resolve("src/main"),
				"@shared": resolve("src/shared"),
			},
		},
	},
	preload: {
		plugins: [externalizeDepsPlugin()],
		build: {
			rollupOptions: {
				output: {
					format: "cjs",
				},
			},
		},
	},
	renderer: {
		root: ".",
		resolve: {
			alias: {
				"@renderer": resolve("src/renderer"),
				"@shared": resolve("src/shared"),
			},
		},
		plugins: [react()],
		build: {
			rollupOptions: {
				input: resolve(__dirname, "index.html"),
			},
		},
	},
});
