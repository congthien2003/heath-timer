import { Task } from "../../shared/models/task.model";

interface TaskCardProps {
	task: Task;
	onComplete: () => void;
	onSnooze: (minutes: number) => void;
}

export function TaskCard({ task, onComplete, onSnooze }: TaskCardProps) {
	return (
		<div className="space-y-4 animate-slideUp">
			{/* Task Card */}
			<div className="card p-6 text-center">
				<div className="text-5xl mb-4 animate-bounce-gentle">
					{task.icon}
				</div>
				<h2
					className="text-lg font-bold mb-2"
					style={{ color: "var(--color-text)" }}>
					{task.title}
				</h2>
				{task.duration && (
					<div
						className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold"
						style={{
							background: "var(--color-primary-faint)",
							color: "var(--color-primary)",
						}}>
						<span>⏱</span>
						<span>{task.duration} giây</span>
					</div>
				)}
			</div>

			{/* Actions */}
			<div className="space-y-2">
				{/* Primary CTA — Von Restorff: visually distinct */}
				<button
					onClick={onComplete}
					className="btn-primary w-full py-3 px-5 text-base flex items-center justify-center gap-2">
					<span className="text-lg">✅</span>
					<span>Hoàn thành</span>
				</button>

				{/* Snooze options - secondary */}
				<div className="flex gap-2">
					{[5, 10, 15].map((mins) => (
						<button
							key={mins}
							onClick={() => onSnooze(mins)}
							className="btn-ghost flex-1 py-2 px-3 text-sm">
							⏰ {mins} phút
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
