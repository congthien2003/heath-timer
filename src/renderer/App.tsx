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

	const { initTheme, resolved, setTheme } = useThemeStore();

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

	const handleToggleTheme = useCallback(() => {
		setTheme(resolved === "dark" ? "light" : "dark");
	}, [resolved, setTheme]);

	const progress = Math.min(sittingTime / (currentInterval * 60), 1);
	const minutesLeft = Math.max(0, currentInterval - Math.floor(sittingTime / 60));

	const caption = currentTask
		? null
		: isSnoozed
			? { text: `snoozed · resumes in ${snoozeInterval}m`, accent: true }
			: { text: `next break · ${minutesLeft}m`, accent: false };

	return (
		<div
			className="flex flex-col h-screen overflow-hidden relative"
			style={{ background: "var(--color-bg)" }}>
			{/* Top Bar */}
			<div className="flex items-center justify-between px-5 pt-4 pb-2 animate-fadeIn">
				<h1
					className="text-xs font-semibold tracking-widest lowercase"
					style={{ color: "var(--color-text-secondary)" }}>
					health timer
				</h1>
				<div className="flex gap-1.5">
					<button
						onClick={() => setIsInsightsOpen(true)}
						className="btn-icon"
						title="Thống kê">
						<span className="text-base leading-none">📊</span>
					</button>
					<button
						onClick={handleToggleTheme}
						className="btn-icon"
						title={resolved === "dark" ? "Chuyển sáng" : "Chuyển tối"}>
						<span className="text-base leading-none">{resolved === "dark" ? "☀️" : "🌙"}</span>
					</button>
					<button
						onClick={() => setIsSettingsOpen(true)}
						className="btn-icon"
						title="Cài đặt">
						<span className="text-base leading-none">⚙️</span>
					</button>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex flex-col items-center justify-center px-6 pb-6">
				<div className="w-full max-w-sm animate-fadeIn">
					{currentTask ? (
						<TaskCard
							task={currentTask}
							onComplete={handleComplete}
							onSnooze={handleSnooze}
						/>
					) : (
						<div className="text-center">
							{/* Timer — serif numerals */}
							<p
								className="text-6xl font-bold tabular-nums leading-none"
								style={{ color: "var(--color-text)" }}>
								{formatTime()}
							</p>

							{/* Hairline progress rule */}
							<div
								className="relative mt-6 h-px w-full rounded-full overflow-hidden"
								style={{ background: "var(--color-timer-track)" }}>
								<div
									className="absolute inset-y-0 left-0 rounded-full"
									style={{
										width: `${progress * 100}%`,
										height: "2px",
										top: "-0.5px",
										background: "var(--color-timer-progress)",
										transition: "width 1s linear",
									}}
								/>
							</div>

							{/* Caption */}
							{caption && (
								<p
									className="mt-3 text-xs font-medium tracking-wide animate-fadeIn"
									style={{
										color: caption.accent
											? "var(--color-accent)"
											: "var(--color-muted)",
									}}>
									{caption.text}
								</p>
							)}

							{/* Idle hint */}
							{!isSnoozed && (
								<p
									className="mt-8 text-xs font-medium animate-fadeIn"
									style={{ color: "var(--color-muted)" }}>
									Đang theo dõi sức khỏe của bạn 🌿
								</p>
							)}
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
