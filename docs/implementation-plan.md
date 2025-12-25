# Health Timer - Implementation Plan

## 🎯 Phase Overview

```
Phase 1: MVP (Core Functionality)           → 1-2 days
Phase 2: Stability & UX                    → 2-3 days
Phase 3: Tracking & Insights               → 2-3 days
Phase 4: Distribution & Polish             → 1-2 days
```

---

## 📋 Phase 1: MVP - Core Functionality (1-2 days)

**Goal**: App chạy được, có timer + notification cơ bản

### Day 1: Project Setup & Infrastructure

#### 1.1 Initialize Electron + React Project

- [ ] Setup Electron với React + TypeScript
- [ ] Config Vite/Webpack cho hot reload
- [ ] Setup folder structure theo architecture
- [ ] Install dependencies cơ bản

**Files to create:**

```
package.json
tsconfig.json
electron.vite.config.ts (or webpack config)
.gitignore
```

**Dependencies:**

```json
{
	"electron": "^28.0.0",
	"react": "^18.2.0",
	"react-dom": "^18.2.0",
	"typescript": "^5.3.0",
	"tailwindcss": "^3.4.0",
	"zustand": "^4.4.0"
}
```

#### 1.2 Main Process Setup

- [ ] Create main process entry (`main/index.ts`)
- [ ] Setup IPC handlers
- [ ] Create app window với basic config

**Files to create:**

```
src/main/index.ts
src/main/preload.ts
src/shared/ipc-events.ts
```

#### 1.3 Renderer Setup

- [ ] Create React app entry point
- [ ] Setup Tailwind CSS
- [ ] Create basic layout component

**Files to create:**

```
src/renderer/index.tsx
src/renderer/App.tsx
src/renderer/index.css
tailwind.config.js
```

### Day 2: Timer & Notification System

#### 2.1 Timer Service (Main Process)

- [ ] Create TimerService class
- [ ] Implement countdown logic (60 minutes)
- [ ] Emit events qua IPC mỗi giây/phút
- [ ] Handle start/pause/reset

**Files to create:**

```
src/main/services/timer.service.ts
src/main/services/base.service.ts (optional)
```

**Core logic:**

```typescript
class TimerService {
	private sittingTime: number = 0;
	private interval: NodeJS.Timeout | null = null;

	start() {
		/* đếm thời gian */
	}
	pause() {
		/* tạm dừng */
	}
	reset() {
		/* reset về 0 */
	}
	onTick(callback) {
		/* emit mỗi giây */
	}
	onThresholdReached(callback) {
		/* trigger task */
	}
}
```

#### 2.2 Task Model & Data

- [ ] Define Task type/interface
- [ ] Create hardcoded task list (3 tasks)
- [ ] Random task selector

**Files to create:**

```
src/shared/models/task.model.ts
src/shared/data/tasks.data.ts
```

**Sample tasks:**

```typescript
const DEFAULT_TASKS: Task[] = [
	{
		id: "drink_water",
		title: "Uống 1 ngụm nước 💧",
		type: "water",
		duration: 30,
	},
	{
		id: "stand_up",
		title: "Đứng dậy vận động 2 phút 🚶",
		type: "break",
		duration: 120,
	},
	{
		id: "eye_rest",
		title: "Nhìn xa 20s (20-20-20 rule) 👀",
		type: "eye",
		duration: 20,
	},
];
```

#### 2.3 Notification Service

- [ ] Create NotificationService
- [ ] Implement Electron notification
- [ ] Handle notification click
- [ ] Optional sound

**Files to create:**

```
src/main/services/notification.service.ts
```

**Core features:**

```typescript
class NotificationService {
	show(task: Task) {
		new Notification({
			title: "Đã ngồi 60 phút rồi!",
			body: task.title,
			silent: false,
		});
	}
}
```

#### 2.4 Storage Service (Simple)

- [ ] Use localStorage trong renderer
- [ ] Store config cơ bản (interval setting)

**Files to create:**

```
src/renderer/utils/storage.ts
```

### Day 3: UI & Task Flow

#### 3.1 Main UI Components

- [ ] TimerDisplay component (hiển thị thời gian)
- [ ] TaskCard component (show current task)
- [ ] ActionButtons (Done, Snooze)

**Files to create:**

```
src/renderer/components/TimerDisplay.tsx
src/renderer/components/TaskCard.tsx
src/renderer/components/ActionButtons.tsx
```

**UI Layout:**

```
┌─────────────────────────┐
│   Health Timer          │
├─────────────────────────┤
│   Đã ngồi: 45:32       │
│                         │
│  ┌──────────────────┐   │
│  │  💧 Uống nước    │   │
│  │  Thời gian: 30s  │   │
│  └──────────────────┘   │
│                         │
│  [Done]    [Snooze 5'] │
└─────────────────────────┘
```

#### 3.2 State Management (Zustand)

- [ ] Create timer store
- [ ] Create task store
- [ ] IPC listeners trong React

**Files to create:**

```
src/renderer/stores/timer.store.ts
src/renderer/stores/task.store.ts
```

**Store structure:**

```typescript
interface TimerStore {
	sittingTime: number;
	isRunning: boolean;
	currentTask: Task | null;
	completeTask: () => void;
	snoozeTask: (minutes: number) => void;
}
```

#### 3.3 IPC Communication

- [ ] Connect main → renderer events
- [ ] Handle user actions (Done/Snooze)
- [ ] Update UI real-time

**IPC Events:**

```typescript
// Main → Renderer
"timer:tick"; // cập nhật thời gian
"task:triggered"; // show task
"task:completed"; // task done

// Renderer → Main
"task:done"; // user click Done
"task:snooze"; // user click Snooze
"timer:start";
"timer:pause";
```

### Day 4: Polish & Build

#### 4.1 Testing & Fixing

- [ ] Test full flow: timer → notification → done
- [ ] Test snooze logic
- [ ] Fix bugs

#### 4.2 Basic Build

- [ ] Setup electron-builder
- [ ] Build exe cho Windows (hoặc dmg cho macOS)
- [ ] Test installed app

**Files to create:**

```
electron-builder.json
```

---

## 📋 Phase 2: Stability & UX (2-3 days)

**Goal**: App dùng được lâu dài, không khó chịu

### 2.1 Configuration System

- [ ] Settings screen/modal
- [ ] Configurable interval (30/45/60 min)
- [ ] Save settings to file
- [ ] Load settings on startup

**Files to create:**

```
src/renderer/screens/Settings.tsx
src/main/services/storage.service.ts (upgrade to lowdb/json)
src/shared/models/settings.model.ts
```

**Settings:**

```typescript
interface Settings {
	intervalMinutes: 30 | 45 | 60;
	soundEnabled: boolean;
	autoStart: boolean;
}
```

### 2.2 System Tray Integration

- [ ] Minimize to tray thay vì close
- [ ] Tray icon với menu
- [ ] Show/Hide window từ tray

**Tray menu:**

```
🕐 Health Timer
───────────────
⏸️  Pause Timer
⚙️  Settings
───────────────
❌ Quit
```

### 2.3 Auto-start với OS

- [ ] Add to startup (Windows Registry / macOS Login Items)
- [ ] Setting để bật/tắt auto-start

### 2.4 Snooze Logic Improvement

- [ ] Snooze options: 5, 10, 15 phút
- [ ] Không spam notification nếu user ignore
- [ ] Delay progressive nếu snooze nhiều lần

### 2.5 Random Task Algorithm

- [ ] Weighted random (task nào ít làm → priority cao)
- [ ] Không repeat task liền kề
- [ ] Time-based task (buổi sáng → uống nước)

---

## 📋 Phase 3: Tracking & Insights (2-3 days)

**Goal**: Tạo động lực cho user

### 3.1 Activity Logging

- [ ] Log mỗi task completed
- [ ] Store vào local database (lowdb/sqlite)
- [ ] Track: timestamp, task_id, completed_status

**Files to create:**

```
src/main/services/activity.service.ts
src/shared/models/activity.model.ts
```

**Activity schema:**

```typescript
interface Activity {
	id: string;
	taskId: string;
	timestamp: Date;
	status: "completed" | "snoozed" | "ignored";
	sittingDuration: number; // seconds
}
```

### 3.2 Statistics Screen

- [ ] Daily summary screen
- [ ] Charts: tasks completed hôm nay
- [ ] Streak counter 🔥

**Metrics:**

- Tasks completed today: 8
- Total sitting time: 6.5 hours
- Streak: 3 days 🔥

### 3.3 Progress Visualization

- [ ] Progress bar cho sitting time
- [ ] Task completion rate
- [ ] Weekly view

---

## 📋 Phase 4: Distribution & Polish (1-2 days)

**Goal**: Sẵn sàng share/public

### 4.1 Branding & Assets

- [ ] App icon (512x512, 256x256, 128x128)
- [ ] Tray icon (16x16, 32x32)
- [ ] App name & description

### 4.2 Installer & Packaging

- [ ] Windows: NSIS installer (.exe)
- [ ] macOS: DMG file
- [ ] App signing (optional, cho production)

### 4.3 Versioning & Updates

- [ ] Semantic versioning (v1.0.0)
- [ ] Changelog file
- [ ] Auto-update setup (electron-updater)

### 4.4 Documentation

- [ ] README.md với screenshots
- [ ] User guide
- [ ] Development guide

---

## 🔑 Critical Decisions Before Starting

### 1. Window Behavior

**Decision needed:**

- Close window → minimize to tray? hoặc quit app?
- **Recommend**: Minimize to tray (app chạy background)

### 2. Notification Priority

**Options:**

- Critical (focus-steal)
- Normal (show in corner)
- **Recommend**: Normal, không gây phiền

### 3. Data Storage

**Options:**

- localStorage (simple, browser-like)
- lowdb (JSON file, easy)
- sqlite (structured, scalable)
- **Recommend MVP**: localStorage → Phase 2: lowdb

### 4. Build Target

**Priority:**

- Windows only first?
- Windows + macOS?
- **Recommend**: Windows first (nhanh hơn), macOS phase sau

---

## 📦 Dependencies Summary

### Phase 1 (MVP)

```json
{
	"dependencies": {
		"electron": "^28.0.0",
		"react": "^18.2.0",
		"react-dom": "^18.2.0",
		"zustand": "^4.4.0"
	},
	"devDependencies": {
		"typescript": "^5.3.0",
		"vite": "^5.0.0",
		"electron-vite": "^2.0.0",
		"tailwindcss": "^3.4.0",
		"@types/react": "^18.2.0",
		"@types/node": "^20.0.0"
	}
}
```

### Phase 2 additions

```json
{
  "lowdb": "^7.0.0",
  "node-notifier": "^10.0.0" (fallback)
}
```

### Phase 3 additions

```json
{
  "recharts": "^2.10.0" (charts),
  "date-fns": "^3.0.0" (date handling)
}
```

### Phase 4 additions

```json
{
	"devDependencies": {
		"electron-builder": "^24.0.0",
		"electron-updater": "^6.0.0"
	}
}
```

---

## ✅ Success Criteria

### Phase 1 MVP

- ✅ App boots và show window
- ✅ Timer đếm từ 0 → 60 phút
- ✅ Notification show sau 60 phút
- ✅ User click Done → reset timer
- ✅ Snooze 5 phút works

### Phase 2 Stability

- ✅ App chạy startup
- ✅ Minimize to tray
- ✅ Settings persist sau restart
- ✅ Không crash sau chạy 8 giờ

### Phase 3 Tracking

- ✅ Log activities vào database
- ✅ Show statistics screen
- ✅ Streak counter works

### Phase 4 Distribution

- ✅ Installer works trên máy clean
- ✅ App icon hiển thị đúng
- ✅ README complete với screenshots

---

## 🚀 Ready to Start?

**Recommended first step:**

```bash
# 1. Initialize project
npm create @quick-start/electron

# Hoặc manual setup
mkdir health-timer
cd health-timer
npm init -y
npm install electron react react-dom
```

**Next**: Create folder structure theo architecture đã định nghĩa

Bạn ready để bắt đầu Phase 1.1 chưa? 🎯
