import { Task } from "../models/task.model";

export const DEFAULT_TASKS: Task[] = [
	{
		id: "drink_water",
		title: "Uống 1 ngụm nước 💧",
		type: "water",
		duration: 30,
		icon: "💧",
	},
	{
		id: "stand_up",
		title: "Đứng dậy vận động 2 phút 🚶",
		type: "break",
		duration: 120,
		icon: "🚶",
	},
	{
		id: "eye_rest",
		title: "Nhìn xa 20 giây (20-20-20 rule) 👀",
		type: "eye",
		duration: 20,
		icon: "👀",
	},
];

export function getRandomTask(): Task {
	const randomIndex = Math.floor(Math.random() * DEFAULT_TASKS.length);
	return DEFAULT_TASKS[randomIndex];
}
