import { create } from "zustand";
import { Task } from "../../shared/models/task.model";

interface TimerStore {
	sittingTime: number;
	isRunning: boolean;
	currentTask: Task | null;
	setSittingTime: (time: number) => void;
	setIsRunning: (running: boolean) => void;
	setCurrentTask: (task: Task | null) => void;
	completeTask: () => void;
	snoozeTask: (minutes: number) => void;
	formatTime: () => string;
}

export const useTimerStore = create<TimerStore>((set, get) => ({
	sittingTime: 0,
	isRunning: false,
	currentTask: null,

	setSittingTime: (time: number) => set({ sittingTime: time }),
	setIsRunning: (running: boolean) => set({ isRunning: running }),
	setCurrentTask: (task: Task | null) => set({ currentTask: task }),

	completeTask: () => {
		const { currentTask } = get();
		if (currentTask && window.electronAPI) {
			window.electronAPI.completeTask(currentTask.id);
		}
		set({ currentTask: null });
	},

	snoozeTask: (minutes: number) => {
		if (window.electronAPI) {
			window.electronAPI.snoozeTask(minutes);
		}
		set({ currentTask: null });
	},

	formatTime: () => {
		const { sittingTime } = get();
		const hours = Math.floor(sittingTime / 3600);
		const minutes = Math.floor((sittingTime % 3600) / 60);
		const seconds = sittingTime % 60;

		if (hours > 0) {
			return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
				.toString()
				.padStart(2, "0")}`;
		}
		return `${minutes.toString().padStart(2, "0")}:${seconds
			.toString()
			.padStart(2, "0")}`;
	},
}));
