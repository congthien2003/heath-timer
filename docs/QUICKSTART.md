# Health Timer - Quick Start Guide

> Version 2.0.0

## 📦 Installation

1. **Download** the installer:
   - Get `HealthTimer-Setup-2.0.0.exe` from Releases
   - File size: ~100-150 MB

2. **Run** the installer:
   - Double-click the `.exe`
   - Choose installation directory (or use default)
   - Select "Create desktop shortcut" if desired
   - Click "Install"

3. **Launch**:
   - App opens automatically after installation
   - Or find "Health Timer" in Start Menu

## ⚡ Quick Setup

### First Time Setup

1. **Timer starts automatically** with a 60-minute default interval
2. **Theme** follows your system (light/dark) by default
3. **Configure settings** (optional) via ⚙️ Settings (top-right):
   - ⏱️ **Thời gian**: interval slider (30 / 45 / 60 minutes)
   - 🔔 **Thông báo**: sound, notifications, auto-start with Windows
   - 🎨 **Giao diện**: theme — Sáng / Tối / Hệ thống
   - Click **Lưu** to save

### Understanding the Interface

```
┌─────────────────────────────┐
│  health timer        📊 🌙 ⚙️ │
├─────────────────────────────┤
│                              │
│           42:18              │
│        ───────────           │
│      next break · 17m        │
│                              │
│   Đang theo dõi sức khỏe 🌿  │
│                              │
└─────────────────────────────┘
```

**Top bar**:
- 📊 **Insights** — streak, total completed, recent history
- 🌙 / ☀️ **Theme toggle** — quick switch light/dark
- ⚙️ **Settings** — configuration

**Main area**:
- **Timer** — countdown to next break (MM:SS, or H:MM:SS past an hour)
- **Task card** — appears when it's time for a break
- **Hairline progress rule** — fills as the cycle progresses

## 🎯 Daily Usage

### Normal Operation

1. **Timer counts down** in the background; closing the window minimizes to tray
2. **Break time!** — desktop notification + Task Card appears:
   - 💧 **Uống 1 ngụm nước** — hydration
   - 🚶 **Đứng dậy vận động 2 phút** — movement/stretch
   - 👀 **Nhìn xa 20 giây (20-20-20 rule)** — eye rest
3. **Complete the task**:
   - Click **Hoàn thành** → celebration overlay → timer resets and the task is logged to history
4. **Need more time?**:
   - Click **5m / 10m / 15m** to snooze
   - After the snooze fires, the original cycle resumes automatically

### System Tray (right-click icon)

- 👁️ **Show App** — restore the window
- ⏸️ **Pause Timer** / ▶️ **Start Timer** — toggle the countdown
- ❌ **Quit** — close the app completely

**Tip**: the app runs in the tray so you can keep working without distraction.

## 📊 Insights Dashboard

Click 📊 in the top bar to open:

- **Chu kỳ hiện tại** — current streak (consecutive days with a completed task)
- **Tổng hoàn thành** — total completed tasks
- **Kỷ lục của bạn** — best streak (days)
- **Lịch sử gần đây** — last 5 completions with task + time

## ⚙️ Settings Explained

### ⏱️ Thời gian — Timer Interval
- **30 min**: frequent breaks (intense work)
- **45 min**: balanced
- **60 min**: less frequent breaks
- Changing the interval resets the countdown; other settings do not disturb the running timer.

### 🔔 Thông báo — Notifications
- **🔊 Âm thanh**: play sound with notifications
- **📢 Thông báo**: show desktop notifications
- **🚀 Tự động khởi động**: launch with Windows

### 🎨 Giao diện — Theme
- **☀️ Sáng** / **🌙 Tối** / **💻 Hệ thống** (follows OS `prefers-color-scheme`, updates live)

**Note**: Settings persist via `electron-store` when you click **Lưu**.

## 💡 Tips & Tricks

1. **Start with 60 minutes**, then adjust based on your needs
2. **Don't skip breaks** — your health matters
3. **Use snooze wisely** — only when truly needed
4. **Pause during meetings** — right-click tray → Pause Timer
5. **Check Insights** regularly to stay motivated

### Health Benefits

- **💧 Hydration**: aids concentration and energy
- **🚶 Movement**: reduces back pain and stiffness, improves circulation
- **👀 Eye rest**: follow the 20-20-20 rule to reduce eye strain and headaches

## 🔧 Troubleshooting

**Notifications not showing?**
1. Check Windows notification settings
2. Disable Focus Assist
3. Ensure **Thông báo** is ON (Settings → 🔔)

**Timer not starting?**
1. Check if paused (tray menu)
2. Restart the app
3. Check Task Manager for multiple instances

**App not in system tray?**
1. Check hidden icons (click ^ in the system tray)
2. Customize the notification area to always show the icon

**Auto-start not working?**
1. Run the app as administrator once
2. Check Task Manager → Startup

**Theme not following system?**
1. Set theme to **💻 Hệ thống** (Settings → 🎨)

### Getting Help

- [README.md](../README.md) — full documentation
- [CHANGELOG.md](../CHANGELOG.md) — release notes
- Report bugs on GitHub Issues

## 📈 Recommended Usage Patterns

| User | Interval | Auto-start | Sound |
| --- | --- | --- | --- |
| Office workers | 45–60 min | ON | ON |
| Developers/Designers | 45 min | ON | ON (snooze during deep work) |
| Students | 30–45 min | OFF | ON |

## 🔌 Data Storage

`electron-store` persists settings, history, and stats at:

```
%APPDATA%\health-timer\config\config.json
```

Back up this file to preserve your data across reinstalls.

## ✅ Quick Reference

| Action | How To |
| --- | --- |
| Open app | Click tray icon or Start Menu |
| Change interval | Settings → ⏱️ → slider → Lưu |
| Toggle theme | Click 🌙/☀️ in top bar |
| View stats | Click 📊 in top bar |
| Complete task | Click **Hoàn thành** |
| Snooze break | Click **5m / 10m / 15m** |
| Pause timer | Right-click tray → Pause Timer |
| Hide to tray | Close the window |
| Quit app | Right-click tray → Quit |

---

**Need more help?** Check the full [README.md](../README.md) or [create an issue](https://github.com/congthien2003/heath-timer/issues).

**Stay healthy! 💪**
