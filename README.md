# Health Timer 🏃‍♂️💧

A compact desktop widget that reminds you to take regular health breaks throughout your workday. Built with Electron, React, and TypeScript.

> Version 2.0.0 — redesigned as a small always-on-top widget with light/dark/system theming, Vietnamese-first UI (Be Vietnam Pro), and a built-in insights dashboard.

## ✨ Features

### 🔔 Smart Health Reminders

- **Customizable Intervals**: Choose 30, 45, or 60 minutes via a slider
- **Random Tasks** — one of three health breaks fires each cycle:
  - 💧 **Uống 1 ngụm nước** — hydration
  - 🚶 **Đứng dậy vận động 2 phút** — movement/stretch
  - 👀 **Nhìn xa 20 giây (20-20-20 rule)** — eye rest

### ⏱️ Flexible Timer Control

- **Visual Countdown**: large tabular-nums timer with a hairline progress rule
- **Snooze**: postpone a break by **5 / 10 / 15** minutes; the original interval auto-restores after the snooze fires
- **Pause/Resume**: full control over the timer (system-tray menu)

### 🎯 Compact Widget UI

- **Small footprint**: 320×430 non-resizable window, minimizes to tray
- **Light / Dark / System theme**: "Editorial Quiet" palette (warm paper / warm charcoal) applied via CSS variables and `data-theme`
- **Be Vietnam Pro** font, lowercase tracking, gentle animations
- **Top-bar actions**: 📊 Insights, 🌙/☀️ quick theme toggle, ⚙️ Settings
- **Celebration overlay** with confetti on task completion

### 📊 Insights Dashboard

- Current streak (chu kỳ hiện tại) and best streak (kỷ lục)
- Total completed tasks
- Recent history (last 5 completions with time)

### ⚙️ Configuration Options

- **Interval** (30/45/60 min) — only changing this resets the countdown; toggling theme/sound/notifications/autoStart no longer disturbs the running timer
- **Auto-start** with Windows
- **Sound notifications** on/off
- **Desktop notifications** on/off
- **Theme**: light / dark / system (follows OS `prefers-color-scheme` and updates live)

## 📦 Installation

### Download

1. Download the latest release from the [Releases](https://github.com/congthien2003/heath-timer/releases) page
2. Run the installer (`HealthTimer-Setup-2.0.0.exe`)
3. Follow the installation wizard

### From Source

```bash
# Clone the repository
git clone https://github.com/congthien2003/heath-timer.git
cd health-timer

# Install dependencies
npm install        # or: bun install

# Run in development mode
npm run dev

# Build for production
npm run build:win
```

## 🚀 Usage

### First Launch

1. The app opens as a compact widget after installation
2. Default timer interval is 60 minutes; theme follows system
3. Configure preferences via ⚙️ **Settings** (top-right)

### Daily Operation

1. **Timer Display**: countdown shown in MM:SS (or H:MM:SS past an hour)
2. **When Notified** — a Task Card appears:
   - Click **Hoàn thành** to complete → celebration overlay → timer resets and the task is logged to history
   - Click **5m / 10m / 15m** to snooze; after the snooze fires, the original cycle resumes
3. **Top bar**: 📊 Insights, 🌙/☀️ toggle theme, ⚙️ Settings
4. **System Tray** (right-click):
   - **Show App** — restore the window
   - **Start/Pause Timer** — toggle the countdown
   - **Quit** — exit completely
   - Closing the window minimizes to tray (does not quit)

### Settings (3 tabs)

- **⏱️ Thời gian** — interval slider (30–60 min, step 15)
- **🔔 Thông báo** — Âm thanh (sound), Thông báo (notifications), Tự động khởi động (auto-start)
- **🎨 Giao diện** — theme: Sáng / Tối / Hệ thống

## 🛠️ Development

### Tech Stack

- **Electron 28** — cross-platform desktop framework
- **React 18 + TypeScript** — UI
- **electron-vite + Vite 5** — build tool and dev server
- **Tailwind CSS 3** — utility styling
- **Zustand** — state management (`timer.store`, `theme.store`)
- **electron-store** — persistent settings/history/stats

### Project Structure

```
health-timer/
├── src/
│   ├── main/                       # Electron main process
│   │   ├── index.ts                # Entry, window/tray/IPC handlers
│   │   └── services/
│   │       ├── timer.service.ts    # Countdown + threshold + snooze logic
│   │       ├── notification.service.ts
│   │       └── storage.service.ts  # electron-store (settings/history/stats)
│   ├── renderer/                   # React UI
│   │   ├── App.tsx                 # Widget layout
│   │   ├── components/
│   │   │   ├── TaskCard.tsx
│   │   │   ├── CelebrationOverlay.tsx
│   │   │   ├── SettingsModal.tsx
│   │   │   └── InsightsDashboard.tsx
│   │   ├── stores/
│   │   │   ├── timer.store.ts
│   │   │   └── theme.store.ts
│   │   ├── types/electron.d.ts
│   │   └── index.css              # Theme tokens + animations
│   ├── preload/index.ts            # contextBridge API
│   └── shared/
│       ├── ipc-events.ts           # IPC channel constants
│       ├── data/tasks.data.ts      # Default tasks + getRandomTask()
│       └── models/                 # Settings, Task, HistoryRecord, UserStats
├── resources/                      # App + tray icons
└── docs/                           # Documentation
```

### Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start electron-vite dev server |
| `npm run build` | Build production bundles |
| `npm run preview` / `npm start` | Preview the built app |
| `npm run build:win` | Build Windows installer (NSIS x64) |
| `npm run build:dir` | Build unpacked directory |

### Building

The app uses `electron-builder`:

```bash
# Build Windows installer (NSIS)
npm run build:win

# Output: dist/HealthTimer-Setup-2.0.0.exe
```

`package.json` `build` config: appId `com.healthtimer.app`, productName `HealthTimer`, ASAR enabled, NSIS with optional install directory + desktop/start-menu shortcuts, `requestedExecutionLevel: asInvoker`.

## 🔌 API Reference

### IPC channels (`src/shared/ipc-events.ts`)

| Channel | Direction | Payload | Notes |
| --- | --- | --- | --- |
| `timer:tick` | main → renderer | `sittingTime: number` (seconds) | every 1s |
| `timer:start` / `timer:pause` / `timer:reset` | renderer → main | — | timer control |
| `task:triggered` | main → renderer | `Task` | when threshold reached |
| `task:done` | renderer → main | `taskId: string` | complete + log history |
| `task:snooze` | renderer → main | `minutes: number` | set snooze threshold |
| `task:completed` | main → renderer | — | clears current task |
| `settings:get` | renderer → main (invoke) | → `Settings` | |
| `settings:save` | renderer → main | `Settings` | persists + applies |
| `settings:updated` | main → renderer | `Settings` | |
| `timer:info:get` | renderer → main (invoke) | → `{ isSnoozed, currentThreshold, originalThreshold }` | |
| `timer:info:updated` | main → renderer | `{ isSnoozed, currentThreshold }` | pushed on snooze/threshold changes (no polling) |
| `history:get-all` | renderer → main (invoke) | → `HistoryRecord[]` | last 100 |
| `stats:get` | renderer → main (invoke) | → `UserStats` | |

### Preload API (`window.electronAPI`)

```ts
interface ElectronAPI {
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  completeTask: (taskId: string) => void;
  snoozeTask: (minutes: number) => void;
  getSettings: () => Promise<Settings>;
  saveSettings: (settings: Settings) => void;
  getTimerInfo: () => Promise<{ isSnoozed: boolean; currentThreshold: number; originalThreshold: number }>;
  getHistory: () => Promise<HistoryRecord[]>;
  getStats: () => Promise<UserStats>;
  // Listeners — each returns an unsubscribe () => void
  onTimerTick: (cb: (time: number) => void) => () => void;
  onTaskTriggered: (cb: (task: Task) => void) => () => void;
  onTaskCompleted: (cb: () => void) => () => void;
  onSettingsUpdated: (cb: (settings: Settings) => void) => () => void;
  onTimerInfoUpdated: (cb: (info: { isSnoozed: boolean; currentThreshold: number }) => void) => () => void;
}
```

### Models

```ts
interface Settings {
  intervalMinutes: 30 | 45 | 60;  // default 60
  soundEnabled: boolean;          // default true
  autoStart: boolean;             // default false
  notificationEnabled: boolean;   // default true
  theme: "light" | "dark" | "system"; // default "system"
}

interface Task {
  id: string;
  title: string;
  type: "water" | "break" | "eye";
  duration?: number;  // seconds
  icon?: string;
}

interface HistoryRecord {
  id: string;          // `${Date.now()}-${taskId}`
  taskId: string;
  taskTitle: string;
  completedAt: number; // timestamp
}

interface UserStats {
  totalCompleted: number;
  currentStreak: number;
  bestStreak: number;
  lastCompletedDate?: string; // YYYY-MM-DD
}
```

## 🎨 Customization

### Adding / Editing Tasks

Edit `src/shared/data/tasks.data.ts`:

```ts
export const DEFAULT_TASKS: Task[] = [
  { id: "custom-task", title: "Your Custom Task 🎯", type: "break", duration: 60, icon: "🎯" },
];
```

### Theme tokens

Color/radius tokens live in `src/renderer/index.css` under `:root, [data-theme="light"]` and `[data-theme="dark"]` (e.g. `--color-bg`, `--color-primary`, `--color-timer-progress`, `--radius-xl`).

### Storage location

`electron-store` writes to `%APPDATA%\health-timer\config\config.json` (settings, history, stats). Back up this file to preserve data.

## 🐛 Troubleshooting

### App doesn't start
- Check the system tray for a running instance
- Try running as administrator once
- Check Windows Event Viewer for errors

### Notifications not showing
- Disable Focus Assist
- Check Windows notification settings
- Verify **Thông báo** is ON in Settings → 🔔

### Timer not accurate
- Uses `setInterval`; Electron may throttle intervals when hidden/sleeping. The service uses `>=` threshold comparison so a skipped tick still triggers on the next caught tick instead of missing forever
- Restart the app to resync after long sleep/wake cycles

### Auto-start not working
- Run the app as administrator once
- Check Task Manager → Startup tab
- Or manually add via `Win+R → shell:startup`

### Theme not following system
- Set theme to **Hệ thống** (Settings → 🎨); the app listens to `prefers-color-scheme` and updates live

## 📄 License

ISC License — see [LICENSE](LICENSE).

## 🙏 Acknowledgments

- Icons created using PowerShell GDI+
- Health task ideas inspired by ergonomic best practices
- Built with ❤️ for healthier work habits

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/congthien2003/heath-timer/issues)
- **Discussions**: [GitHub Discussions](https://github.com/congthien2003/heath-timer/discussions)
- **Release notes**: [CHANGELOG.md](CHANGELOG.md)

---

**Stay healthy, stay productive! 💪**
