# Health Timer - Quick Start Guide

## 📦 Installation

1. **Download** the installer:

   - Get `Health-Timer-Setup-1.0.0.exe` from releases
   - File size: ~100-150 MB

2. **Run** the installer:

   - Double-click the `.exe` file
   - Click "Next" through the installation wizard
   - Choose installation directory (or use default)
   - Select "Create desktop shortcut" if desired
   - Click "Install"

3. **Launch**:
   - App opens automatically after installation
   - Or find "Health Timer" in Start Menu

## ⚡ Quick Setup

### First Time Setup

1. **Timer starts automatically** with 60-minute default interval
2. **Configure settings** (optional):
   - Click the ⚙️ Settings button
   - Choose your preferred interval: 30, 45, or 60 minutes
   - Enable/disable features:
     - ✅ Auto-start with Windows
     - ✅ Enable sound notifications
     - ✅ Enable desktop notifications
   - Click "Save Settings"

### Understanding the Interface

```
┌─────────────────────────────────────┐
│  Health Timer         [_][□][×]      │
├─────────────────────────────────────┤
│                                      │
│         Time Until Break             │
│            45:30                     │
│                                      │
│    [Task card appears when ready]    │
│                                      │
│                          [⚙️]         │
└─────────────────────────────────────┘
```

**Main Display:**

- **Timer**: Shows countdown to next break
- **Task Card**: Appears when it's time for a break
- **Settings Button** (⚙️): Opens configuration

## 🎯 Daily Usage

### Normal Operation

1. **Timer Counts Down**:

   - Displays time until next health break
   - Runs in background

2. **Break Time!**:

   - Desktop notification appears
   - Task card shows on app
   - Three types of tasks:
     - 💧 **Drink Water**: Stay hydrated
     - 🚶 **Take a Break**: Move and stretch
     - 👀 **Rest Eyes**: Look away from screen

3. **Complete the Task**:

   - Click ✅ **Complete** button
   - Timer resets to full interval
   - Continue working!

4. **Need More Time?**:
   - Click ⏸️ **Snooze 5min** button
   - Timer postpones for 5 minutes
   - After snooze, returns to normal interval

### System Tray

**Minimize to Tray:**

- Minimize window → app hides to system tray
- Find icon in notification area (bottom-right)

**Tray Menu** (right-click icon):

- 👁️ **Show App**: Restore window
- ⏸️ **Pause Timer**: Stop countdown
- ▶️ **Start Timer**: Resume countdown
- ❌ **Quit**: Close app completely

**Tip**: App runs in tray so you can keep working without distraction!

## ⚙️ Settings Explained

### Timer Interval

Choose how often you want break reminders:

- **30 minutes**: Frequent breaks (recommended for intense work)
- **45 minutes**: Balanced approach
- **60 minutes**: Less frequent breaks

### Auto-start with Windows

- ✅ **ON**: App launches automatically when Windows starts
- ❌ **OFF**: Manual launch required

### Enable Sound

- ✅ **ON**: Plays sound with notifications
- ❌ **OFF**: Silent notifications

### Enable Notifications

- ✅ **ON**: Desktop notifications appear
- ❌ **OFF**: No notifications (timer only)

**Note**: Settings save automatically when you close the modal.

## 💡 Tips & Tricks

### Productivity Tips

1. **Start with 60 minutes**: Adjust based on your needs
2. **Don't skip breaks**: Your health is important!
3. **Use snooze wisely**: Only when truly needed
4. **Pause during meetings**: Right-click tray icon → Pause

### Health Benefits

**💧 Hydration breaks:**

- Drink 8 glasses of water daily
- Helps concentration and energy

**🚶 Movement breaks:**

- Stand up and walk around
- Reduces back pain and stiffness
- Improves circulation

**👀 Eye rest breaks:**

- Follow 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds
- Reduces eye strain and headaches

## 🔧 Troubleshooting

### Common Issues

**Notifications not showing?**

1. Check Windows notification settings
2. Disable Focus Assist
3. Ensure "Enable Notifications" is ON in app settings

**Timer not starting?**

1. Check if timer is paused (tray menu)
2. Restart the app
3. Check task manager for multiple instances

**App not in system tray?**

1. Check hidden icons (click ^ in system tray)
2. Customize notification area to always show icon

**Auto-start not working?**

1. Run app as administrator once
2. Check Windows Startup apps (Task Manager → Startup)

### Getting Help

- Check [README.md](../README.md) for detailed documentation
- Review [TESTING.md](TESTING.md) for known issues
- Report bugs on GitHub Issues

## 🚀 Advanced Features

### Keyboard Shortcuts (Coming Soon)

- `Ctrl+P`: Pause/Resume timer
- `Ctrl+R`: Reset timer
- `Ctrl+,`: Open settings

### Data Storage

Settings are saved at:

```
%APPDATA%\health-timer\config\settings.json
```

You can back up this file to preserve your settings.

## 📈 Recommended Usage Patterns

### For Office Workers

- Interval: 45-60 minutes
- Auto-start: ON
- Sound: ON
- Perfect for desk jobs with long sitting periods

### For Developers/Designers

- Interval: 45 minutes
- Sound: ON (stay focused but healthy)
- Use snooze during critical debugging

### For Students

- Interval: 30-45 minutes
- Sound: ON
- Helps maintain focus and prevent fatigue

## ✅ Quick Reference

| Action          | How To                         |
| --------------- | ------------------------------ |
| Open app        | Click tray icon or Start Menu  |
| Change interval | Settings → Select time → Save  |
| Pause timer     | Right-click tray → Pause Timer |
| Complete task   | Click ✅ Complete button       |
| Snooze break    | Click ⏸️ Snooze 5min button    |
| Hide to tray    | Click minimize button          |
| Quit app        | Right-click tray → Quit        |

---

**Need more help?** Check the full [README.md](../README.md) or [create an issue](https://github.com/yourusername/health-timer/issues).

**Stay healthy! 💪**
