import { useEffect, useState } from "react";
import { useTimerStore } from "./stores/timer.store";
import { Task } from "../shared/models/task.model";
import { SettingsModal } from "./components/SettingsModal";

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

	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [currentInterval, setCurrentInterval] = useState(60);
	const [isSnoozed, setIsSnoozed] = useState(false);
	const [snoozeInterval, setSnoozeInterval] = useState(0);

	// Poll timer info periodically to check snooze status
	useEffect(() => {
		const checkTimerInfo = async () => {
			if (window.electronAPI) {
				const info = await window.electronAPI.getTimerInfo();
				setIsSnoozed(info.isSnoozed);
				setSnoozeInterval(info.currentThreshold);
			}
		};

		checkTimerInfo();
		const interval = setInterval(checkTimerInfo, 2000); // Check every 2 seconds

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (!window.electronAPI) {
			console.error("electronAPI not available!");
			return;
		}

		// Load initial settings
		window.electronAPI.getSettings().then((settings) => {
			setCurrentInterval(settings.intervalMinutes);
		});

		// Listen to timer ticks
		window.electronAPI.onTimerTick((time: number) => {
			setSittingTime(time);
		});

		// Listen to task triggered
		window.electronAPI.onTaskTriggered((task: Task) => {
			setCurrentTask(task);
		});

		// Listen to task completed
		window.electronAPI.onTaskCompleted(() => {
			setCurrentTask(null);
		});

		// Listen to settings updates
		window.electronAPI.onSettingsUpdated((settings) => {
			setCurrentInterval(settings.intervalMinutes);
		});
	}, [setSittingTime, setCurrentTask]);

	const handleComplete = () => {
		completeTask();
	};

	const handleSnooze = (minutes: number) => {
		snoozeTask(minutes);
	};

	return (
		<div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 overflow-hidden relative">
			{/* Animated Background Blobs - Soft Liquid Colors */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-0 -left-4 w-72 h-72 bg-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse-slow" />
				<div
					className="absolute top-0 -right-4 w-72 h-72 bg-emerald-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse-slow"
					style={{ animationDelay: "1s" }}
				/>
				<div
					className="absolute -bottom-8 left-20 w-72 h-72 bg-violet-400 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse-slow"
					style={{ animationDelay: "2s" }}
				/>
			</div>

			{/* Noise Texture Overlay */}
			<div className="absolute inset-0 noise-texture pointer-events-none" />

			{/* Settings Button - Liquid Glass */}
			<button
				onClick={() => setIsSettingsOpen(true)}
				className="fixed top-4 right-4 z-50 p-3 glass-effect backdrop-blur-xl hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(103,232,249,0.3)] group animate-fadeIn"
				title="Settings">
				<span className="text-xl group-hover:rotate-90 transition-transform duration-300 inline-block">
					⚙️
				</span>
			</button>

			{/* Main Content */}
			<div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
				<div className="w-full max-w-sm animate-slideUp">
					{/* Circular Timer Display */}
					<div className="text-center mb-4">
						<div className="relative inline-block transition-liquid">
							{/* SVG Circular Progress with Liquid Gradient */}
							<svg className="transform -rotate-90" width="220" height="220">
								{/* Background Circle */}
								<circle
									cx="110"
									cy="110"
									r="95"
									stroke="rgba(255,255,255,0.1)"
									strokeWidth="12"
									fill="none"
								/>
								{/* Progress Circle */}
								<circle
									cx="110"
									cy="110"
									r="95"
									stroke="url(#liquidGradient)"
									strokeWidth="12"
									strokeLinecap="round"
									fill="none"
									strokeDasharray={`${
										(sittingTime / (currentInterval * 60)) * 596.9
									} 596.9`}
									className="transition-all duration-1000 ease-in-out"
								/>
								{/* Liquid Gradient Definition */}
								<defs>
									<linearGradient
										id="liquidGradient"
										x1="0%"
										y1="0%"
										x2="100%"
										y2="100%">
										<stop offset="0%" stopColor="#67e8f9" />
										<stop offset="50%" stopColor="#6ee7b7" />
										<stop offset="100%" stopColor="#67e8f9" />
									</linearGradient>
								</defs>
							</svg>

							{/* Timer Text in Center with Glow */}
							<div className="absolute inset-0 flex items-center justify-center">
								<div className="text-center">
									<p className="text-6xl font-black text-white text-glow-cyan">
										{formatTime()}
									</p>
								</div>
							</div>
						</div>

						{/* Status Info */}
						{isSnoozed ? (
							<div className="mt-6 glass-effect backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-[0_0_30px_rgba(196,181,253,0.15)]">
								<p className="text-white text-sm font-bold flex items-center justify-center gap-2 text-glow">
									<span className="animate-pulse">⏰</span>
									Đang snooze - Nhắc lại sau {snoozeInterval} phút
								</p>
								<p className="text-white/70 text-xs mt-2">
									Sau đó trở về chu kỳ {currentInterval} phút
								</p>
							</div>
						) : (
							<div className="mt-5 inline-flex items-center gap-2 glass-effect backdrop-blur-lg px-5 py-3 rounded-2xl border border-cyan-300/30 shadow-[0_0_30px_rgba(103,232,249,0.15)]">
								<span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/60"></span>
								<p className="text-white text-sm font-semibold text-glow">
									Nhắc nhở sau {currentInterval} phút
								</p>
							</div>
						)}
					</div>

					{/* Status or Task */}
					{!currentTask ? (
						<div className="glass-effect backdrop-blur-lg rounded-2xl p-4 text-center border border-emerald-300/30 mt-5 shadow-[0_0_30px_rgba(110,231,183,0.15)]">
							<div className="flex items-center justify-center gap-2">
								<span className="text-2xl">✅</span>
								<p className="text-white font-bold text-base text-glow-emerald">
									Đang theo dõi
								</p>
							</div>
						</div>
					) : (
						<div className="space-y-3 animate-fadeIn mt-5">
							{/* Task Card with Liquid Glass */}
							<div className="relative group">
								{/* Soft Glow Background */}
								<div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 animate-pulse-slow"></div>

								{/* Glass Card */}
								<div className="relative glass-effect backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-center shadow-2xl transition-liquid hover:scale-105">
									{/* Noise Overlay */}
									<div className="absolute inset-0 noise-texture rounded-3xl" />

									<p className="text-6xl mb-3 animate-bounce-slow relative z-10">
										{currentTask.icon}
									</p>
									<p className="text-lg font-black text-white mb-2 text-glow relative z-10">
										{currentTask.title}
									</p>
									{currentTask.duration && (
										<div className="inline-flex items-center gap-2 glass-effect backdrop-blur-lg px-4 py-2 rounded-full border border-white/15 relative z-10">
											<span className="text-white">⏱️</span>
											<p className="text-sm font-bold text-white">
												{currentTask.duration} giây
											</p>
										</div>
									)}
								</div>
							</div>

							{/* Action Buttons */}
							<div className="space-y-2">
								<button
									onClick={handleComplete}
									className="relative overflow-hidden w-full bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-900 font-bold py-3 px-5 rounded-xl shadow-[0_0_30px_rgba(103,232,249,0.4)] hover:shadow-[0_0_50px_rgba(103,232,249,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group">
									<span className="text-xl group-hover:scale-125 transition-transform relative z-10">
										✅
									</span>
									<span className="relative z-10">Hoàn thành</span>
								</button>
								<div className="flex gap-2">
									<button
										onClick={() => handleSnooze(5)}
										className="flex-1 glass-effect backdrop-blur-lg hover:bg-white/10 border border-white/20 hover:border-white/30 text-white font-semibold py-2 px-3 rounded-xl text-sm transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95">
										⏰ 5 phút
									</button>
									<button
										onClick={() => handleSnooze(10)}
										className="flex-1 glass-effect backdrop-blur-lg hover:bg-white/10 border border-white/20 hover:border-white/30 text-white font-semibold py-2 px-3 rounded-xl text-sm transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95">
										⏰ 10 phút
									</button>
									<button
										onClick={() => handleSnooze(15)}
										className="flex-1 glass-effect backdrop-blur-lg hover:bg-white/10 border border-white/20 hover:border-white/30 text-white font-semibold py-2 px-3 rounded-xl text-sm transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95">
										⏰ 15 phút
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Settings Modal */}
			<SettingsModal
				isOpen={isSettingsOpen}
				onClose={() => setIsSettingsOpen(false)}
			/>
		</div>
	);
}

export default App;
