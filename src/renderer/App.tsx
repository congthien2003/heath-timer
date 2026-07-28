import { useCallback, useEffect, useState } from "react";
import { useTimerStore } from "./stores/timer.store";
import { useThemeStore } from "./stores/theme.store";
import { Task } from "../shared/models/task.model";
import { TaskCard } from "./components/TaskCard";
import { CelebrationOverlay } from "./components/CelebrationOverlay";
import { SettingsModal } from "./components/SettingsModal";
import { InsightsDashboard } from "./components/InsightsDashboard";

function App() {
	const {
		sittingTime,
		currentTask,
		formatTime,
		setCurrentTask,
		setSittingTime,
		completeTask,
		snoozeTask,
	} = useTimerStore();

	const { initTheme } = useThemeStore();

	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [isInsightsOpen, setIsInsightsOpen] = useState(false);
	const [currentInterval, setCurrentInterval] = useState(60);
	const [isSnoozed, setIsSnoozed] = useState(false);
	const [snoozeInterval, setSnoozeInterval] = useState(0);
	const [showCelebration, setShowCelebration] = useState(false);

	// Initialize theme on mount
	useEffect(() => {
		initTheme();
	}, [initTheme]);

	// Subscribe to IPC events once. Each `on*` returns an unsubscribe so we
	// clean up on unmount and avoid stacking duplicate listeners on remount.
	useEffect(() => {
		if (!window.electronAPI) {
			console.error("electronAPI not available!");
			return;
		}

		// One-time snapshot of current timer/snooze state, then updates flow via
		// onTimerInfoUpdated (no polling).
		window.electronAPI.getTimerInfo().then((info) => {
			setIsSnoozed(info.isSnoozed);
			setSnoozeInterval(info.currentThreshold);
		});

		window.electronAPI.getSettings().then((settings) => {
			setCurrentInterval(settings.intervalMinutes);
		});

		const unsubTick = window.electronAPI.onTimerTick((time: number) => {
			setSittingTime(time);
		});

		const unsubTaskTriggered = window.electronAPI.onTaskTriggered(
			(task: Task) => {
				setCurrentTask(task);
			},
		);

		const unsubTaskCompleted = window.electronAPI.onTaskCompleted(() => {
			setCurrentTask(null);
		});

		const unsubSettings = window.electronAPI.onSettingsUpdated(
			(settings) => {
				setCurrentInterval(settings.intervalMinutes);
			},
		);

		const unsubTimerInfo = window.electronAPI.onTimerInfoUpdated((info) => {
			setIsSnoozed(info.isSnoozed);
			setSnoozeInterval(info.currentThreshold);
		});

		return () => {
			unsubTick();
			unsubTaskTriggered();
			unsubTaskCompleted();
			unsubSettings();
			unsubTimerInfo();
		};
	}, [setSittingTime, setCurrentTask]);

	const handleComplete = useCallback(() => {
		setShowCelebration(true);
		completeTask();
	}, [completeTask]);

	const handleSnooze = useCallback(
		(minutes: number) => {
			snoozeTask(minutes);
		},
		[snoozeTask],
	);

	const handleCelebrationDone = useCallback(() => {
		setShowCelebration(false);
	}, []);

	const progress = Math.min(sittingTime / (currentInterval * 60), 1);
	const circumference = 2 * Math.PI * 90;
	const strokeDasharray = `${progress * circumference} ${circumference}`;

	return (
		<div
			className="flex flex-col h-screen overflow-hidden relative"
			style={{ background: "var(--color-bg)" }}>
			{/* Top Bar */}
			<div className="flex items-center justify-between px-5 pt-4 pb-2 animate-fadeIn">
				<h1
					className="text-base font-bold"
					style={{ color: "var(--color-text-secondary)" }}>
					Health Timer
				</h1>
				<div className="flex gap-1.5">
					<button
						onClick={() => setIsInsightsOpen(true)}
						className="btn-icon"
						title="Thống kê">
						<span className="text-lg">📊</span>
					</button>
					<button
						onClick={() => setIsSettingsOpen(true)}
						className="btn-icon"
						title="Cài đặt">
						<span className="text-lg">⚙️</span>
					</button>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex flex-col items-center justify-center px-6 pb-6">
				<div className="w-full max-w-sm animate-slideUp">
					{/* Timer Display */}
					<div className="text-center mb-6">
						<div className="relative inline-block">
							<svg
								className="transform -rotate-90"
								width="200"
								height="200"
								viewBox="0 0 200 200">
								{/* Track */}
								<circle
									cx="100"
									cy="100"
									r="90"
									stroke="var(--color-timer-track)"
									strokeWidth="10"
									fill="none"
								/>
								{/* Progress */}
								<circle
									cx="100"
									cy="100"
									r="90"
									stroke="var(--color-timer-progress)"
									strokeWidth="10"
									strokeLinecap="round"
									fill="none"
									strokeDasharray={strokeDasharray}
									style={{
										transition:
											"stroke-dasharray 1s ease-in-out",
									}}
								/>
							</svg>

							{/* Timer text */}
							<div className="absolute inset-0 flex items-center justify-center">
								<p
									className="text-5xl font-extrabold tabular-nums"
									style={{ color: "var(--color-text)" }}>
									{formatTime()}
								</p>
							</div>
						</div>
					</div>

					{/* Status */}
					{isSnoozed ? (
						<div
							className="card p-4 text-center mb-5 animate-fadeIn"
							style={{
								borderColor: "var(--color-accent)",
								borderLeftWidth: "3px",
							}}>
							<p
								className="text-sm font-bold flex items-center justify-center gap-2"
								style={{ color: "var(--color-text)" }}>
								<span className="animate-pulse-soft">⏰</span>
								Đang snooze — Nhắc lại sau {snoozeInterval} phút
							</p>
							<p
								className="text-xs mt-1"
								style={{ color: "var(--color-muted)" }}>
								Sau đó trở về chu kỳ {currentInterval} phút
							</p>
						</div>
					) : !currentTask ? (
						<div
							className="card-flat p-4 text-center mb-5 animate-fadeIn"
							style={{ borderColor: "var(--color-primary)" }}>
							<div className="flex items-center justify-center gap-2">
								<span
									className="w-2 h-2 rounded-full animate-pulse-soft"
									style={{
										background: "var(--color-primary)",
									}}
								/>
								<p
									className="text-sm font-semibold"
									style={{
										color: "var(--color-text-secondary)",
									}}>
									Nhắc nhở sau {currentInterval} phút
								</p>
							</div>
						</div>
					) : null}

					{/* Task Card */}
					{currentTask && (
						<TaskCard
							task={currentTask}
							onComplete={handleComplete}
							onSnooze={handleSnooze}
						/>
					)}

					{/* Idle state - motivational */}
					{!currentTask && !isSnoozed && (
						<div className="text-center animate-fadeIn mt-2">
							<p
								className="text-sm font-medium"
								style={{ color: "var(--color-muted)" }}>
								Đang theo dõi sức khỏe của bạn 🌿
							</p>
						</div>
					)}
				</div>
			</div>

			{/* Celebration */}
			<CelebrationOverlay
				show={showCelebration}
				onDone={handleCelebrationDone}
			/>

			{/* Modals */}
			<InsightsDashboard
				isOpen={isInsightsOpen}
				onClose={() => setIsInsightsOpen(false)}
			/>
			<SettingsModal
				isOpen={isSettingsOpen}
				onClose={() => setIsSettingsOpen(false)}
			/>
		</div>
	);
}

export default App;
