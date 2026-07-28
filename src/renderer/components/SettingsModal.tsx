import { useState, useEffect } from "react";
import { Settings } from "../../shared/models/settings.model";
import { useThemeStore } from "../stores/theme.store";

interface SettingsModalProps {
	isOpen: boolean;
	onClose: () => void;
}

type TabType = "time" | "notifications" | "system";

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
	const [settings, setSettings] = useState<Settings | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [activeTab, setActiveTab] = useState<TabType>("time");
	const { theme, setTheme } = useThemeStore();

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
			window.electronAPI.saveSettings({ ...settings, theme });
			onClose();
		}
	};

	if (!isOpen) return null;

	const tabs: { id: TabType; icon: string; label: string }[] = [
		{ id: "time", icon: "⏱️", label: "Thời gian" },
		{ id: "notifications", icon: "🔔", label: "Thông báo" },
		{ id: "system", icon: "🎨", label: "Giao diện" },
	];

	return (
		<div
			className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn"
			style={{ background: "var(--color-overlay)" }}>
			<div
				className="card w-[300px] max-h-[90vh] flex flex-col overflow-hidden animate-slideUp"
				style={{ borderRadius: "var(--radius-xl)" }}>
				{/* Header */}
				<div
					className="flex items-center justify-between p-3 border-b"
					style={{ borderColor: "var(--color-border)" }}>
					<h2
						className="text-base font-semibold"
						style={{ color: "var(--color-text)" }}>
						Cài đặt
					</h2>
					<button
						onClick={onClose}
						className="btn-icon"
						style={{ width: 26, height: 26 }}>
						<span className="text-xs">✕</span>
					</button>
				</div>

				{/* Tabs */}
				<div
					className="flex gap-1 p-2 border-b"
					style={{ borderColor: "var(--color-border)" }}>
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className="flex-1 py-1.5 px-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200 flex items-center justify-center gap-1.5"
							style={{
								background:
									activeTab === tab.id
										? "var(--color-primary-faint)"
										: "transparent",
								color:
									activeTab === tab.id
										? "var(--color-primary)"
										: "var(--color-muted)",
							}}>
							<span className="text-sm leading-none">{tab.icon}</span>
							<span className="leading-none">{tab.label}</span>
						</button>
					))}
				</div>

				{isLoading ? (
					<div className="flex-1 flex flex-col items-center justify-center py-8">
						<div
							className="inline-block w-5 h-5 rounded-full animate-spin"
							style={{
								border: "2px solid var(--color-border)",
								borderTopColor: "var(--color-primary)",
							}}
						/>
						<p
							className="mt-2.5 text-xs"
							style={{ color: "var(--color-muted)" }}>
							Đang tải...
						</p>
					</div>
				) : (
					<>
						{/* Scrollable tab content */}
						<div className="flex-1 overflow-y-auto p-3">
							{/* Time Tab */}
							{activeTab === "time" && (
								<div className="space-y-3 animate-fadeIn">
									<label
										className="block text-[11px] font-semibold text-center tracking-wide"
										style={{
											color: "var(--color-text-secondary)",
										}}>
										Chu kỳ nhắc nhở
									</label>

									<div className="flex items-baseline justify-center gap-1.5">
										<span
											className="text-4xl font-bold leading-none"
											style={{
												color: "var(--color-primary)",
											}}>
											{settings?.intervalMinutes || 45}
										</span>
										<span
											className="text-xs font-semibold"
											style={{
												color: "var(--color-text-secondary)",
											}}>
											phút
										</span>
									</div>

									<div className="px-1">
										<input
											type="range"
											min="30"
											max="60"
											step="15"
											value={settings?.intervalMinutes || 45}
											onChange={(e) =>
												setSettings({
													...settings!,
													intervalMinutes: Number(
														e.target.value,
													) as 30 | 45 | 60,
												})
											}
											className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
											style={{
												background: "var(--color-border)",
												accentColor: "var(--color-primary)",
											}}
										/>
										<div
											className="flex justify-between text-[11px] font-medium px-0.5 mt-1.5"
											style={{ color: "var(--color-muted)" }}>
											<span>30</span>
											<span>45</span>
											<span>60</span>
										</div>
									</div>
								</div>
							)}

							{/* Notifications Tab */}
							{activeTab === "notifications" && (
								<div className="space-y-2 animate-fadeIn">
									<ToggleRow
										icon="🔊"
										label="Âm thanh"
										checked={settings?.soundEnabled ?? true}
										onChange={(v) =>
											setSettings({
												...settings!,
												soundEnabled: v,
											})
										}
									/>
									<ToggleRow
										icon="📢"
										label="Thông báo"
										checked={
											settings?.notificationEnabled ?? true
										}
										onChange={(v) =>
											setSettings({
												...settings!,
												notificationEnabled: v,
											})
										}
									/>
									<ToggleRow
										icon="🚀"
										label="Tự động khởi động"
										description="Chạy khi khởi động Windows"
										checked={settings?.autoStart ?? false}
										onChange={(v) =>
											setSettings({
												...settings!,
												autoStart: v,
											})
										}
									/>
								</div>
							)}

							{/* System/Theme Tab */}
							{activeTab === "system" && (
								<div className="space-y-2.5 animate-fadeIn">
									<p
										className="text-[11px] font-semibold"
										style={{
											color: "var(--color-text-secondary)",
										}}>
										Chế độ hiển thị
									</p>
									<div className="grid grid-cols-3 gap-2">
										{(
											[
												{
													id: "light" as const,
													icon: "☀️",
													label: "Sáng",
												},
												{
													id: "dark" as const,
													icon: "🌙",
													label: "Tối",
												},
												{
													id: "system" as const,
													icon: "💻",
													label: "Hệ thống",
												},
											] as const
										).map((option) => (
											<button
												key={option.id}
												onClick={() => setTheme(option.id)}
												className="py-2.5 px-1.5 rounded-xl text-center transition-all duration-200"
												style={{
													background:
														theme === option.id
															? "var(--color-primary-faint)"
															: "var(--color-surface-hover)",
													border:
														theme === option.id
															? "1px solid var(--color-primary)"
															: "1px solid var(--color-border)",
													color:
														theme === option.id
															? "var(--color-primary)"
															: "var(--color-text-secondary)",
												}}>
												<div className="text-base leading-none">
													{option.icon}
												</div>
												<div className="text-[11px] font-semibold leading-none mt-1.5">
													{option.label}
												</div>
											</button>
										))}
									</div>
								</div>
							)}
						</div>

						{/* Pinned footer */}
						<div
							className="flex gap-2.5 p-3 border-t"
							style={{ borderColor: "var(--color-border)" }}>
							<button
								onClick={onClose}
								className="btn-ghost flex-1 py-1.5 text-sm">
								Hủy
							</button>
							<button
								onClick={handleSave}
								className="btn-primary flex-1 py-1.5 text-sm">
								Lưu
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

/* ===== Toggle Row Sub-component ===== */

interface ToggleRowProps {
	icon: string;
	label: string;
	description?: string;
	checked: boolean;
	onChange: (value: boolean) => void;
}

function ToggleRow({
	icon,
	label,
	description,
	checked,
	onChange,
}: ToggleRowProps) {
	return (
		<label
			className="flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors duration-200"
			style={{
				background: "var(--color-surface-hover)",
				border: "1px solid var(--color-border)",
			}}>
			<span className="flex items-center gap-2.5 min-w-0">
				<span className="text-base leading-none flex-shrink-0">{icon}</span>
				<span className="min-w-0">
					<span
						className="font-semibold text-xs block"
						style={{ color: "var(--color-text)" }}>
						{label}
					</span>
					{description && (
						<span
							className="text-[11px] block mt-0.5"
							style={{ color: "var(--color-muted)" }}>
							{description}
						</span>
					)}
				</span>
			</span>
			<div
				className={`toggle-track ${checked ? "active" : ""}`}
				onClick={() => onChange(!checked)}>
				<div className="toggle-thumb" />
			</div>
			<input
				type="checkbox"
				checked={checked}
				onChange={(e) => onChange(e.target.checked)}
				className="sr-only"
			/>
		</label>
	);
}
