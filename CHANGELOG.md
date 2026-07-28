# Health Timer - Release Notes

## Version 2.0.0 - 2026-07-28

### 🎉 What's New

#### UI & Theming (Added)

- **Compact widget redesign**: 320×430 non-resizable window replacing the previous full-size app
- **Light / Dark / System theme** ("Editorial Quiet" palette) via CSS variables + `data-theme`, with live `prefers-color-scheme` tracking
- **Be Vietnam Pro** font, lowercase tracking, gentle fade/slide animations
- **Top-bar actions**: 📊 Insights, 🌙/☀️ quick theme toggle, ⚙️ Settings
- **Celebration overlay** with confetti particles on task completion

#### Insights & Tracking (Added)

- **Insights Dashboard**: current streak, best streak, total completed, recent history (last 5)
- **History logging** of completed tasks (`HistoryRecord`), capped at 100 records
- **Streak tracking** (`UserStats`): current/best streak + total completed, persisted via `electron-store`

#### Timer & Snooze (Added / Changed)

- **Snooze 5 / 10 / 15 minutes** (was single 5-min only); snooze temporarily lowers the threshold and auto-restores the original interval after it fires
- Snooze completion pushes `timer:info:updated` to the renderer so the UI reflects state without polling
- `getTimerInfo` now also returns `originalThreshold`

### Changed

- **Settings modal** reorganized into 3 tabs (⏱️ Thời gian / 🔔 Thông báo / 🎨 Giao diện) with an interval slider (30–60 min, step 15)
- Saving settings now **only resets the timer when the interval actually changes** — toggling theme/sound/notifications/autoStart no longer disturbs the running countdown
- Snooze confirmation shown as a native notification with the resume cycle
- IPC listeners exposed via preload now return unsubscribe functions to avoid stacking duplicate listeners on remount
- Vietnamese-first UI labels throughout

### Fixed

- Timer drift after sleep/throttling: uses `>=` threshold comparison so a skipped `setInterval` tick still triggers on the next caught tick instead of missing the break forever
- Snooze state no longer desynchronizes between main and renderer (pushed via `timer:info:updated`)
- Theme toggle no longer resets `sittingTime`

### Breaking changes

- `Settings` interface adds required `theme: "light" | "dark" | "system"` field (defaults to `"system"` via `DEFAULT_SETTINGS`)
- New IPC channels: `history:add`, `history:get-all`, `stats:get`, `timer:info:updated`
- `window.electronAPI` gains `getHistory()`, `getStats()`, and `onTimerInfoUpdated()`; event listeners now return `() => void` unsubscribe functions

### 📦 Installation

1. Download `HealthTimer-Setup-2.0.0.exe` from Releases
2. Run the installer and follow the wizard
3. App launches automatically after installation

### 🔄 Upgrade Notes

Upgrading from 1.0.0 is seamless — `electron-store` merges the new `theme` default (`"system"`) on first load; existing settings/history are preserved.

### 🐛 Known Issues

- Windows-only (macOS/Linux not yet supported)
- Single timer instance only (no concurrent timers)
- `setInterval`-based timer may still drift slightly over very long uptime; restart to resync

---

## Version 1.0.0 - Initial Release

### 🎉 What's New

#### Core Features

- **Smart Timer System**: Countdown timer with customizable intervals (30, 45, 60 minutes)
- **Health Task Reminders**: Three types of health breaks:
  - 💧 Hydration reminders to drink water
  - 🚶 Movement breaks for stretching and walking
  - 👀 Eye rest reminders to reduce screen strain
- **Desktop Notifications**: Native Windows notifications with sound support
- **System Tray Integration**: Minimize to tray for unobtrusive operation
- **Persistent Settings**: Automatically saves your preferences

#### User Interface

- Modern gradient design with smooth animations
- Real-time countdown display
- Interactive task cards with emoji indicators
- Settings modal for easy configuration
- Responsive layout

#### Customization Options

- Adjustable timer intervals (30/45/60 minutes)
- Enable/disable sound notifications
- Enable/disable desktop notifications
- Auto-start with Windows option
- Snooze functionality (5-minute postpone)

### 🛠️ Technical Details

#### Architecture

- Built with Electron 28 for cross-platform desktop support
- React 18 with TypeScript for type-safe UI development
- Vite for fast development and optimized builds
- Zustand for lightweight state management
- Tailwind CSS for modern styling

#### Performance

- Low memory footprint (< 150MB)
- Minimal CPU usage when idle
- Fast startup time (< 3 seconds)
- Efficient file-based settings storage

#### Security

- Uses Electron's contextBridge for secure IPC communication
- No external network requests
- Local-only data storage

### 📦 Installation

#### System Requirements

- Windows 10 or later (64-bit)
- 200 MB free disk space
- Screen resolution: 1024x768 or higher

#### Installation Steps

1. Download `Health-Timer-Setup-1.0.0.exe`
2. Run the installer
3. Follow the installation wizard
4. App launches automatically after installation

### 🔄 Upgrade Notes

This is the initial release - no upgrades needed.

### 🐛 Known Issues

#### Minor Issues

- Timer may drift slightly after extended system sleep/wake cycles
  - **Workaround**: Restart the app to resync
- Auto-start may require administrator privileges on first enable
  - **Workaround**: Run app as administrator once

#### Limitations

- Windows-only (macOS/Linux support planned for future releases)
- Single timer instance only (no multiple concurrent timers)
- No cloud sync for settings across devices

### 🔮 Roadmap

#### Planned for Version 1.1.0

- [ ] Statistics tracking (tasks completed, breaks taken)
- [ ] Custom task creation
- [ ] Theme customization (light/dark modes)
- [ ] More interval options (15, 90, 120 minutes)

#### Planned for Version 2.0.0

- [ ] Multi-timer support
- [ ] Cloud sync for settings
- [ ] macOS and Linux support
- [ ] Advanced scheduling (work hours only, weekend modes)
- [ ] Integration with calendar apps

### 📋 Changelog

```
[1.0.0] - 2024-01-XX

Added:
- Initial release with core timer functionality
- Three default health tasks (water, break, eye rest)
- System tray integration with context menu
- Desktop notifications with sound
- Persistent settings storage
- Auto-start with Windows option
- Snooze functionality (5 minutes)
- Settings UI with interval selection
- Modern gradient UI design

Technical:
- Electron 28.3.3
- React 18.3.1
- TypeScript 5.9.3
- Vite 5.4.21
- Zustand 4.5.7
- Tailwind CSS 3.4.19
```

### 🙏 Acknowledgments

Special thanks to:

- The Electron.js team for the amazing framework
- The React community for excellent tooling
- All beta testers who provided valuable feedback

### 📞 Support

- **Report Issues**: [GitHub Issues](https://github.com/congthien2003/heath-timer/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/congthien2003/heath-timer/discussions)
- **Documentation**: [docs/](docs/)

### 📜 License

ISC License - See LICENSE file for details

---

**Download**: [Latest Release](https://github.com/congthien2003/heath-timer/releases/latest)  
**Documentation**: [README.md](README.md)  
**Testing Guide**: [docs/TESTING.md](docs/TESTING.md)
