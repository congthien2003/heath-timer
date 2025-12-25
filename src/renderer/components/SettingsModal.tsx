import React, { useState, useEffect } from "react";
import { Settings } from "../../shared/models/settings.model";

interface SettingsModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
	const [settings, setSettings] = useState<Settings | null>(null);
	const [isLoading, setIsLoading] = useState(true);

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

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-2xl shadow-2xl p-6 w-80">
				<h2 className="text-xl font-bold text-gray-800 mb-4">⚙️ Cài đặt</h2>

				{isLoading ? (
					<div className="text-center py-4 text-gray-500">Đang tải...</div>
				) : (
					<div className="space-y-4">
						{/* Interval Setting */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Thời gian nhắc nhở
							</label>
							<div className="space-y-2">
								{[30, 45, 60].map((minutes) => (
									<label
										key={minutes}
										className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
										style={{
											borderColor:
												settings?.intervalMinutes === minutes
													? "#6366f1"
													: "#e5e7eb",
										}}>
										<input
											type="radio"
											name="interval"
											value={minutes}
											checked={settings?.intervalMinutes === minutes}
											onChange={(e) =>
												setSettings({
													...settings!,
													intervalMinutes: Number(e.target.value) as
														| 30
														| 45
														| 60,
												})
											}
											className="mr-3"
										/>
										<span className="font-medium">{minutes} phút</span>
									</label>
								))}
							</div>
						</div>

						{/* Sound Setting */}
						<div>
							<label className="flex items-center justify-between p-3 border-2 border-gray-200 rounded-lg">
								<span className="font-medium text-gray-700">🔔 Âm thanh</span>
								<input
									type="checkbox"
									checked={settings?.soundEnabled ?? true}
									onChange={(e) =>
										setSettings({
											...settings!,
											soundEnabled: e.target.checked,
										})
									}
									className="w-5 h-5"
								/>
							</label>
						</div>

						{/* Notification Setting */}
						<div>
							<label className="flex items-center justify-between p-3 border-2 border-gray-200 rounded-lg">
								<span className="font-medium text-gray-700">📢 Thông báo</span>
								<input
									type="checkbox"
									checked={settings?.notificationEnabled ?? true}
									onChange={(e) =>
										setSettings({
											...settings!,
											notificationEnabled: e.target.checked,
										})
									}
									className="w-5 h-5"
								/>
							</label>
						</div>

						{/* Auto-start Setting */}
						<div>
							<label className="flex items-center justify-between p-3 border-2 border-gray-200 rounded-lg">
								<span className="font-medium text-gray-700">
									🚀 Tự động khởi động
								</span>
								<input
									type="checkbox"
									checked={settings?.autoStart ?? false}
									onChange={(e) =>
										setSettings({
											...settings!,
											autoStart: e.target.checked,
										})
									}
									className="w-5 h-5"
								/>
							</label>
							<p className="text-xs text-gray-500 mt-2 px-3">
								Tự động chạy Health Timer khi khởi động Windows
							</p>
						</div>

						{/* Buttons */}
						<div className="flex gap-2 mt-6">
							<button
								onClick={onClose}
								className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors">
								Hủy
							</button>
							<button
								onClick={handleSave}
								className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
								Lưu
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
