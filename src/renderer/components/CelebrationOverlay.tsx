import { useEffect, useState } from "react";

interface CelebrationOverlayProps {
	show: boolean;
	onDone: () => void;
}

const CONFETTI_COLORS = [
	"#4A7C59",
	"#6DA67A",
	"#E8985E",
	"#F0A868",
	"#FBBF24",
	"#34D399",
];

export function CelebrationOverlay({ show, onDone }: CelebrationOverlayProps) {
	const [visible, setVisible] = useState(false);
	const [confetti, setConfetti] = useState<
		Array<{
			id: number;
			color: string;
			left: number;
			delay: number;
			size: number;
		}>
	>([]);

	useEffect(() => {
		if (show) {
			setVisible(true);

			const particles = Array.from({ length: 20 }, (_, i) => ({
				id: i,
				color: CONFETTI_COLORS[
					Math.floor(Math.random() * CONFETTI_COLORS.length)
				],
				left: Math.random() * 100,
				delay: Math.random() * 0.4,
				size: 4 + Math.random() * 6,
			}));
			setConfetti(particles);

			const timer = setTimeout(() => {
				setVisible(false);
				onDone();
			}, 1800);

			return () => clearTimeout(timer);
		}
	}, [show, onDone]);

	if (!visible) return null;

	return (
		<div className="fixed inset-0 z-[200] flex items-center justify-center animate-celebrate-fade pointer-events-none">
			{/* Confetti particles */}
			{confetti.map((p) => (
				<div
					key={p.id}
					className="absolute animate-confetti"
					style={{
						left: `${p.left}%`,
						top: "30%",
						width: `${p.size}px`,
						height: `${p.size}px`,
						borderRadius: p.size > 7 ? "50%" : "2px",
						background: p.color,
						animationDelay: `${p.delay}s`,
					}}
				/>
			))}

			{/* Central celebration */}
			<div className="text-center animate-celebrate">
				<div className="text-7xl mb-3">✅</div>
				<p
					className="text-2xl font-extrabold"
					style={{ color: "var(--color-primary)" }}>
					Tuyệt vời!
				</p>
				<p
					className="text-sm mt-1"
					style={{ color: "var(--color-text-secondary)" }}>
					Tiếp tục phát huy nhé 💪
				</p>
			</div>
		</div>
	);
}
