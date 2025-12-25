import React, { useEffect, useState } from "react";
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
		<div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			{/* Header */}
			<div className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
				<div>
					<h1 className="text-xl font-bold text-gray-800">Health Timer</h1>
					<p className="text-sm text-gray-500">Stay healthy while working 💪</p>
				</div>
				<button
					onClick={() => setIsSettingsOpen(true)}
					className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
					title="Settings">
					<span className="text-2xl">⚙️</span>
				</button>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex flex-col items-center justify-center p-6">
				<div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
					{/* Timer Display */}
					<div className="text-center mb-8">
						<p className="text-gray-600 text-sm mb-2">Đã ngồi</p>
						<p className="text-5xl font-bold text-indigo-600">{formatTime()}</p>
						{isSnoozed ? (
							<div className="mt-2">
								<p className="text-orange-600 text-xs font-semibold">
									⏰ Đang snooze - Nhắc lại sau {snoozeInterval} phút
								</p>
								<p className="text-gray-400 text-xs mt-1">
									Sau đó trở về chu kỳ {currentInterval} phút
								</p>
							</div>
						) : (
							<p className="text-gray-500 text-xs mt-2">
								Nhắc nhở sau {currentInterval} phút
							</p>
						)}
					</div>

					{/* Status or Task */}
					{!currentTask ? (
						<div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
							<p className="text-green-700 font-medium">✅ Đang theo dõi</p>
							<p className="text-green-600 text-sm mt-1">Timer đang chạy...</p>
						</div>
					) : (
						<div className="space-y-4">
							{/* Task Card */}
							<div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 rounded-xl p-6 text-center">
								<p className="text-4xl mb-3">{currentTask.icon}</p>
								<p className="text-lg font-bold text-gray-800 mb-2">
									{currentTask.title}
								</p>
								{currentTask.duration && (
									<p className="text-sm text-gray-600">
										⏱️ {currentTask.duration} giây
									</p>
								)}
							</div>

							{/* Action Buttons */}
							<div className="space-y-2">
								<button
									onClick={handleComplete}
									className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
									✅ Hoàn thành
								</button>
								<div className="flex gap-2">
									<button
										onClick={() => handleSnooze(5)}
										className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg text-sm transition-colors">
										⏰ 5 phút
									</button>
									<button
										onClick={() => handleSnooze(10)}
										className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg text-sm transition-colors">
										⏰ 10 phút
									</button>
									<button
										onClick={() => handleSnooze(15)}
										className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg text-sm transition-colors">
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

			{/* Footer */}
			<div className="bg-white border-t py-3 px-6 text-center">
				<p className="text-xs text-gray-400">
					Health Timer v1.0 - MVP Phase Complete 🎉
				</p>
			</div>
		</div>
	);
}

export default App;
