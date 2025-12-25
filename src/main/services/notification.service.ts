import { Notification } from "electron";
import { Task } from "../../shared/models/task.model";

export class NotificationService {
	show(task: Task): void {
		const notification = new Notification({
			title: "⏰ Đã ngồi 60 phút rồi!",
			body: task.title,
			silent: false,
			timeoutType: "default",
		});

		notification.show();

		notification.on("click", () => {
			console.log("Notification clicked");
			// Focus the app window
		});
	}

	showSimple(title: string, body: string): void {
		const notification = new Notification({
			title,
			body,
			silent: false,
		});

		notification.show();
	}
}
