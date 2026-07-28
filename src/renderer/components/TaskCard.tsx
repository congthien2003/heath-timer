import { Task } from "../../shared/models/task.model";

interface TaskCardProps {
	task: Task;
	onComplete: () => void;
	onSnooze: (minutes: number) => void;
}

export function TaskCard({ task, onComplete, onSnooze }: TaskCardProps) {
	return (
		<div className="space-y-5 animate-slideUp">
			{/* Task Card */}
			<div className="card p-5 text-center">
				<div className="text-4xl leading-none mb-3 animate-bounce-gentle">
					{task.icon}
				</div>
				<h2
					className="text-lg font-semibold mb-2"
					style={{ color: "var(--color-text)" }}>
					{task.title}
				</h2>
				{task.duration && (
					<p
						className="text-xs font-medium"
						style={{ color: "var(--color-muted)" }}>
						⏱ {task.duration}s
					</p>
				)}
			</div>

			{/* Actions */}
			<div className="space-y-2">
				<button
					onClick={onComplete}
					className="btn-primary w-full py-3 px-5 text-sm">
					Hoàn thành
				</button>

				<div className="flex gap-2">
					{[5, 10, 15].map((mins) => (
						<button
							key={mins}
							onClick={() => onSnooze(mins)}
							className="btn-ghost flex-1 py-2 px-3 text-xs">
							{mins}m
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
