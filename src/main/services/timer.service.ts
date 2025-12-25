import { BrowserWindow } from "electron";
import { IPC_EVENTS } from "../../shared/ipc-events";

export class TimerService {
	private sittingTime: number = 0; // seconds
	private interval: NodeJS.Timeout | null = null;
	private isRunning: boolean = false;
	private threshold: number = 60 * 60; // 60 minutes in seconds
	private originalThreshold: number = 60 * 60; // Store original threshold
	private isSnoozed: boolean = false;
	private window: BrowserWindow | null = null;
	private onThresholdReachedCallback: (() => void) | null = null;

	constructor(window: BrowserWindow) {
		this.window = window;
	}

	start(): void {
		if (this.isRunning) return;

		this.isRunning = true;
		this.interval = setInterval(() => {
			this.tick();
		}, 1000); // Update every second

		console.log("Timer started");
	}

	pause(): void {
		if (this.interval) {
			clearInterval(this.interval);
			this.interval = null;
		}
		this.isRunning = false;
		console.log("Timer paused");
	}

	reset(): void {
		this.pause();
		this.sittingTime = 0;
		this.sendTickToRenderer();
		console.log("Timer reset");
	}

	private tick(): void {
		this.sittingTime++;
		this.sendTickToRenderer();

		// Check if threshold reached
		if (
			this.sittingTime >= this.threshold &&
			this.sittingTime % this.threshold === 0
		) {
			console.log(`Threshold reached: ${this.sittingTime} seconds`);

			// If snoozed, restore original threshold after trigger
			if (this.isSnoozed) {
				console.log(
					`Restoring original threshold: ${this.originalThreshold / 60} minutes`
				);
				this.threshold = this.originalThreshold;
				this.isSnoozed = false;
			}

			if (this.onThresholdReachedCallback) {
				this.onThresholdReachedCallback();
			}
		}
	}

	private sendTickToRenderer(): void {
		if (this.window && !this.window.isDestroyed()) {
			this.window.webContents.send(IPC_EVENTS.TIMER_TICK, this.sittingTime);
		}
	}

	onThresholdReached(callback: () => void): void {
		this.onThresholdReachedCallback = callback;
	}

	setThreshold(minutes: number): void {
		this.threshold = minutes * 60;
		this.originalThreshold = minutes * 60; // Update original as well
		this.isSnoozed = false;
		console.log(`Threshold set to ${minutes} minutes`);
	}

	setSnoozeThreshold(minutes: number): void {
		// Temporarily set threshold for snooze without changing original
		this.threshold = minutes * 60;
		this.isSnoozed = true;
		console.log(
			`Snooze set to ${minutes} minutes (will restore to ${
				this.originalThreshold / 60
			} minutes after)`
		);
	}

	getThreshold(): number {
		return this.threshold / 60; // Return in minutes
	}

	getOriginalThreshold(): number {
		return this.originalThreshold / 60; // Return in minutes
	}

	getIsSnoozed(): boolean {
		return this.isSnoozed;
	}

	getSittingTime(): number {
		return this.sittingTime;
	}

	getIsRunning(): boolean {
		return this.isRunning;
	}

	destroy(): void {
		this.pause();
		this.onThresholdReachedCallback = null;
		this.window = null;
	}
}
