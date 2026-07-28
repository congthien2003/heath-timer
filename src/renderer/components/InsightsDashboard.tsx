import { useEffect, useState } from "react";
import { HistoryRecord, UserStats } from "../../shared/models/history.model";

interface InsightsDashboardProps {
	isOpen: boolean;
	onClose: () => void;
}

export const InsightsDashboard = ({
	isOpen,
	onClose,
}: InsightsDashboardProps) => {
	const [stats, setStats] = useState<UserStats | null>(null);
	const [history, setHistory] = useState<HistoryRecord[]>([]);

	useEffect(() => {
		if (isOpen && window.electronAPI) {
			const fetchData = async () => {
				const [historyData, statsData] = await Promise.all([
					window.electronAPI.getHistory(),
					window.electronAPI.getStats(),
				]);
				setHistory(historyData.reverse());
				setStats(statsData);
			};
			fetchData();
		}
	}, [isOpen]);

	if (!isOpen) return null;

	const taskEmoji = (title: string) => {
		if (title.includes("nước")) return "💧";
		if (title.includes("vận động")) return "🚶";
		return "👀";
	};

	return (
		<div
			className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn"
			style={{ background: "var(--color-overlay)" }}>
			{/* Backdrop */}
			<div className="absolute inset-0" onClick={onClose} />

			{/* Modal */}
			<div
				className="card relative w-full max-w-sm overflow-hidden animate-slideUp"
				style={{ borderRadius: "var(--radius-xl)" }}>
				{/* Header */}
				<div
					className="flex items-start justify-between p-3 border-b"
					style={{ borderColor: "var(--color-border)" }}>
					<div>
						<h2
							className="text-base font-semibold"
							style={{ color: "var(--color-text)" }}>
							Sức khỏe & Thống kê
						</h2>
						<p
							className="text-[11px] mt-0.5"
							style={{ color: "var(--color-muted)" }}>
							Theo dõi hành trình của bạn
						</p>
					</div>
					<button
						onClick={onClose}
						className="btn-icon"
						style={{ width: 26, height: 26 }}>
						<span className="text-xs">✕</span>
					</button>
				</div>

				{/* Body */}
				<div className="p-3 space-y-3 max-h-[70vh] overflow-y-auto">
					{/* Stats Grid */}
					<div className="grid grid-cols-2 gap-2.5">
						<div className="stat-card p-3 pt-5 text-center">
							<p
								className="text-2xl font-bold leading-tight"
								style={{ color: "var(--color-primary)" }}>
								{stats?.currentStreak || 0}
							</p>
							<p
								className="text-[10px] font-semibold uppercase tracking-widest mt-1"
								style={{ color: "var(--color-muted)" }}>
								Chu kỳ hiện tại
							</p>
						</div>
						<div className="stat-card stat-card-accent p-3 pt-5 text-center">
							<p
								className="text-2xl font-bold leading-tight"
								style={{ color: "var(--color-accent)" }}>
								{stats?.totalCompleted || 0}
							</p>
							<p
								className="text-[10px] font-semibold uppercase tracking-widest mt-1"
								style={{ color: "var(--color-muted)" }}>
								Tổng hoàn thành
							</p>
						</div>
					</div>

					{/* Best Streak */}
					<div className="stat-card stat-card-accent p-3 pt-3.5 flex items-center justify-between">
						<div>
							<p
								className="font-semibold text-sm"
								style={{ color: "var(--color-text)" }}>
								Kỷ lục của bạn
							</p>
							<p
								className="text-[11px] mt-0.5"
								style={{ color: "var(--color-muted)" }}>
								Tiếp tục duy trì nhé!
							</p>
						</div>
						<p
							className="text-xl font-bold leading-none"
							style={{ color: "var(--color-primary)" }}>
							{stats?.bestStreak || 0}
							<span className="text-xs ml-1">ngày</span>
						</p>
					</div>

					{/* Recent History */}
					<div className="space-y-2">
						<h3
							className="text-[10px] font-bold uppercase tracking-widest px-1"
							style={{ color: "var(--color-muted)" }}>
							Lịch sử gần đây
						</h3>

						{history.length > 0 ? (
							<div className="space-y-1.5">
								{history.slice(0, 5).map((item) => (
									<div
										key={item.id}
										className="flex items-center gap-2.5 p-2 rounded-lg transition-colors duration-200"
										style={{
											background: "var(--color-surface-hover)",
											border: "1px solid var(--color-border)",
										}}>
										<div
											className="w-7 h-7 rounded-lg flex items-center justify-center text-sm leading-none flex-shrink-0"
											style={{
												background: "var(--color-primary-faint)",
											}}>
											{taskEmoji(item.taskTitle)}
										</div>
										<div className="flex-1 min-w-0">
											<p
												className="font-semibold text-xs truncate"
												style={{
													color: "var(--color-text)",
												}}>
												{item.taskTitle}
											</p>
											<p
												className="text-[11px]"
												style={{
													color: "var(--color-muted)",
												}}>
												{new Date(
													item.completedAt,
												).toLocaleTimeString([], {
													hour: "2-digit",
													minute: "2-digit",
												})}
											</p>
										</div>
									</div>
								))}
							</div>
						) : (
							<div
								className="text-center py-5 rounded-lg"
								style={{
									background: "var(--color-surface-hover)",
									border: "1px solid var(--color-border)",
								}}>
								<p className="text-lg mb-1 opacity-50">🌱</p>
								<p
									className="text-xs font-semibold"
									style={{ color: "var(--color-muted)" }}>
									Chưa có dữ liệu
								</p>
								<p
									className="text-[11px] mt-0.5"
									style={{ color: "var(--color-muted)" }}>
									Hoàn thành task đầu tiên để bắt đầu!
								</p>
							</div>
						)}
					</div>
				</div>

				{/* Footer */}
				<div
					className="p-2.5 text-center border-t"
					style={{ borderColor: "var(--color-border)" }}>
					<p
						className="text-[11px] italic"
						style={{ color: "var(--color-muted)" }}>
						"Sức khỏe là khởi đầu của mọi thành công" 🌿
					</p>
				</div>
			</div>
		</div>
	);
};
