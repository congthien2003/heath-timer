import React, { useState, useEffect } from "react";
import { Settings } from "../../shared/models/settings.model";

interface SettingsModalProps {
	isOpen: boolean;
	onClose: () => void;
}

type TabType = "time" | "notifications" | "system";

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
	const [settings, setSettings] = useState<Settings | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [activeTab, setActiveTab] = useState<TabType>("time");

	useEffect(() => {
		if (isOpen && window.electronAPI) {
			loadSettings();
		}
	}, [isOpen]);

	const loadSettings = async () => {
		try {
			const currentSettings = await window.electronAPI.getSettings();
			setSettings(currentSettings);
			setIsLoading(false);
		} catch (error) {
			console.error("Failed to load settings:", error);
			setIsLoading(false);
		}
	};

	const handleSave = () => {
		if (settings && window.electronAPI) {
			window.electronAPI.saveSettings(settings);
			onClose();
		}
	};

	if (!isOpen) return null;

	const tabs = [
		{ id: "time" as TabType, icon: "⏱️", label: "Thời gian" },
		{ id: "notifications" as TabType, icon: "🔔", label: "Thông báo" },
		{ id: "system" as TabType, icon: "⚙️", label: "Hệ thống" },
	];

	return (
		<div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn">
			<div className="glass-intense backdrop-blur-3xl rounded-3xl shadow-2xl w-96 border-2 border-white/20 animate-slideUp overflow-hidden">
				{/* Noise Overlay */}
				<div className="absolute inset-0 noise-texture pointer-events-none" />

				{/* Header with Navigation */}
				<div className="bg-gradient-to-r from-cyan-500 to-violet-500 p-5 shadow-[0_0_40px_rgba(103,232,249,0.3)] relative z-10">
					<div className="flex items-center justify-between">
						{/* Left Arrow */}
						<button
							onClick={() => {
								const currentIndex = tabs.findIndex((t) => t.id === activeTab);
								const prevIndex =
									currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
								setActiveTab(tabs[prevIndex].id);
							}}
							className="w-9 h-9 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
							<span className="text-white text-lg">←</span>
						</button>

						{/* Center Title */}
						<div className="flex-1 text-center">
							<div className="flex items-center justify-center gap-2">
								<span className="text-2xl">
									{tabs.find((t) => t.id === activeTab)?.icon}
								</span>
								<h2 className="text-xl font-black text-white text-glow">
									{tabs.find((t) => t.id === activeTab)?.label}
								</h2>
							</div>
						</div>

						{/* Right Arrow */}
						<button
							onClick={() => {
								const currentIndex = tabs.findIndex((t) => t.id === activeTab);
								const nextIndex =
									currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
								setActiveTab(tabs[nextIndex].id);
							}}
							className="w-9 h-9 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
							<span className="text-white text-lg">→</span>
						</button>
					</div>
				</div>

				{isLoading ? (
					<div className="text-center py-12 relative z-10">
						<div className="inline-block w-8 h-8 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin"></div>
						<p className="text-white/80 mt-3 font-medium">Đang tải...</p>
					</div>
				) : (
					<div className="p-5 relative z-10">
						{/* Time Tab */}
						{activeTab === "time" && (
							<div className="space-y-6 animate-fadeIn">
								<label className="block text-sm font-bold text-white/90 text-center text-glow">
									Chu kỳ nhắc nhở
								</label>

								{/* Value Display - Centered */}
								<div className="flex items-center justify-center">
									<div className="glass-effect backdrop-blur-xl px-6 py-3 rounded-xl shadow-[0_0_30px_rgba(103,232,249,0.3)] border border-cyan-300/30">
										<span className="text-3xl font-black text-white text-glow-cyan">
											{settings?.intervalMinutes || 45}
										</span>
										<span className="text-sm font-bold text-white/80 ml-2">
											phút
										</span>
									</div>
								</div>

								{/* Slider */}
								<div className="px-2">
									<input
										type="range"
										min="30"
										max="60"
										step="15"
										value={settings?.intervalMinutes || 45}
										onChange={(e) =>
											setSettings({
												...settings!,
												intervalMinutes: Number(e.target.value) as 30 | 45 | 60,
											})
										}
										className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-cyan-500"
									/>

									{/* Value Markers Below */}
									<div className="flex justify-between text-xs font-medium text-white/60 px-1 mt-2">
										<span>30</span>
										<span>45</span>
										<span>60</span>
									</div>
								</div>
							</div>
						)}

						{/* Notifications Tab */}
						{activeTab === "notifications" && (
							<div className="space-y-3 animate-fadeIn">
								{/* Sound Toggle */}
								<label className="flex items-center justify-between p-4 glass-effect backdrop-blur-sm border border-white/20 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/10 group">
									<span className="font-bold text-white flex items-center gap-3">
										<span className="text-2xl group-hover:scale-110 transition-transform">
											🔊
										</span>
										<span>Âm thanh</span>
									</span>
									<div className="relative">
										<input
											type="checkbox"
											checked={settings?.soundEnabled ?? true}
											onChange={(e) =>
												setSettings({
													...settings!,
													soundEnabled: e.target.checked,
												})
											}
											className="sr-only peer"
										/>
										<div className="w-11 h-6 bg-white/20 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-cyan-400 peer-checked:to-emerald-400 transition-all duration-300 peer-checked:shadow-[0_0_15px_rgba(103,232,249,0.4)]"></div>
										<div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-5 shadow-lg"></div>
									</div>
								</label>

								{/* Notification Toggle */}
								<label className="flex items-center justify-between p-4 glass-effect backdrop-blur-sm border border-white/20 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/10 group">
									<span className="font-bold text-white flex items-center gap-3">
										<span className="text-2xl group-hover:scale-110 transition-transform">
											📢
										</span>
										<span>Thông báo</span>
									</span>
									<div className="relative">
										<input
											type="checkbox"
											checked={settings?.notificationEnabled ?? true}
											onChange={(e) =>
												setSettings({
													...settings!,
													notificationEnabled: e.target.checked,
												})
											}
											className="sr-only peer"
										/>
										<div className="w-11 h-6 bg-white/20 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-cyan-400 peer-checked:to-emerald-400 transition-all duration-300 peer-checked:shadow-[0_0_15px_rgba(103,232,249,0.4)]"></div>
										<div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-5 shadow-lg"></div>
									</div>
								</label>
							</div>
						)}

						{/* System Tab */}
						{activeTab === "system" && (
							<div className="space-y-3 animate-fadeIn">
								{/* Auto-start Toggle */}
								<label className="flex items-center justify-between p-4 glass-effect backdrop-blur-sm border border-white/20 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/10 group">
									<span className="font-bold text-white flex items-center gap-3">
										<span className="text-2xl group-hover:scale-110 transition-transform">
											🚀
										</span>
										<span>Tự động khởi động</span>
									</span>
									<div className="relative">
										<input
											type="checkbox"
											checked={settings?.autoStart ?? false}
											onChange={(e) =>
												setSettings({
													...settings!,
													autoStart: e.target.checked,
												})
											}
											className="sr-only peer"
										/>
										<div className="w-11 h-6 bg-white/20 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-cyan-400 peer-checked:to-emerald-400 transition-all duration-300 peer-checked:shadow-[0_0_15px_rgba(103,232,249,0.4)]"></div>
										<div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-5 shadow-lg"></div>
									</div>
								</label>
								<p className="text-xs text-white/60 px-4 font-medium">
									Tự động chạy Health Timer khi khởi động Windows
								</p>
							</div>
						)}

						{/* Buttons */}
						<div className="flex gap-3 mt-6 pt-5 border-t border-white/10">
							<button
								onClick={onClose}
								className="flex-1 glass-effect backdrop-blur-lg hover:bg-white/10 border border-white/20 text-white font-bold py-2.5 px-5 rounded-xl transition-all duration-300 hover:shadow-xl active:scale-95">
								Hủy
							</button>
							<button
								onClick={handleSave}
								className="flex-1 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white font-bold py-2.5 px-5 rounded-xl shadow-[0_0_30px_rgba(103,232,249,0.3)] hover:shadow-[0_0_40px_rgba(103,232,249,0.5)] transition-all duration-300 hover:scale-105 active:scale-95">
								Lưu
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
