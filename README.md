# Health Timer 🏃‍♂️💧

A beautiful desktop application that reminds you to take regular health breaks throughout your workday. Built with Electron, React, and TypeScript.

## ✨ Features

### 🔔 Smart Health Reminders

- **Customizable Intervals**: Choose between 30, 45, or 60-minute reminder intervals
- **Random Tasks**: Get reminded to:
  - 💧 Drink water and stay hydrated
  - 🚶 Take movement breaks and stretch
  - 👀 Rest your eyes from screen strain

### ⏱️ Flexible Timer Control

- **Visual Countdown**: Real-time display showing time until next break
- **Snooze Function**: Postpone breaks for 5 minutes when needed
- **Pause/Resume**: Full control over your timer

### 🎯 User-Friendly Interface

- **Modern Design**: Clean gradient UI with smooth animations
- **System Tray**: Minimizes to tray for unobtrusive operation
- **Desktop Notifications**: Clear reminders when it's time for a break
- **Persistent Settings**: Your preferences are saved automatically

### ⚙️ Configuration Options

- **Auto-start**: Launch automatically when Windows starts
- **Sound Notifications**: Enable/disable notification sounds
- **Notification Toggle**: Turn notifications on/off as needed

## 📦 Installation

### Download

1. Download the latest release from the [Releases](https://github.com/yourusername/health-timer/releases) page
2. Run the installer (`Health-Timer-Setup-1.0.0.exe`)
3. Follow the installation wizard

### From Source

```bash
# Clone the repository
git clone https://github.com/yourusername/health-timer.git
cd health-timer

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build:win
```

## 🚀 Usage

### First Launch

1. The app opens automatically after installation
2. Default timer interval is set to 60 minutes
3. Configure your preferences via the ⚙️ Settings button

### Daily Operation

1. **Timer Display**: The main screen shows your countdown
2. **When Notified**:
   - Click ✅ **Complete** to acknowledge and reset the timer
   - Click ⏸️ **Snooze 5min** to postpone the break
3. **System Tray**:
   - Click the tray icon to show/hide the app
   - Right-click for quick actions (pause, resume, quit)

### Settings

Access settings by clicking the ⚙️ button:

- **Timer Interval**: Select your preferred break frequency
- **Auto-start**: Launch with Windows
- **Enable Sound**: Toggle notification sounds
- **Enable Notifications**: Turn desktop notifications on/off

## 🛠️ Development

### Tech Stack

- **Electron 28**: Cross-platform desktop framework
- **React 18**: UI library with TypeScript
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first styling
- **Zustand**: Lightweight state management

### Project Structure

```
health-timer/
├── src/
│   ├── main/               # Electron main process
│   │   ├── index.ts        # Main entry point
│   │   └── services/       # Timer, notifications, storage
│   ├── renderer/           # React UI
│   │   ├── App.tsx         # Main component
│   │   ├── components/     # UI components
│   │   └── stores/         # State management
│   ├── preload/            # Electron preload scripts
│   └── shared/             # Shared types and constants
├── resources/              # App icons and assets
└── docs/                   # Documentation
```

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:win` - Build Windows installer
- `npm run build:dir` - Build unpacked directory

### Building

The app uses `electron-builder` for packaging:

```bash
# Build Windows installer (NSIS)
npm run build:win

# Output: dist/Health-Timer-Setup-1.0.0.exe
```

## 🎨 Customization

### Adding New Tasks

Edit `src/shared/data/tasks.data.ts`:

```typescript
export const DEFAULT_TASKS: Task[] = [
	{
		id: "custom-task",
		title: "Your Custom Task",
		emoji: "🎯",
		description: "Task description here",
	},
];
```

### Changing Timer Intervals

Modify `src/shared/models/settings.model.ts`:

```typescript
export const AVAILABLE_INTERVALS = [
	{ label: "30 minutes", value: 30 },
	{ label: "45 minutes", value: 45 },
	{ label: "60 minutes", value: 60 },
	{ label: "90 minutes", value: 90 }, // Add new interval
];
```

## 🐛 Troubleshooting

### App doesn't start

- Check if another instance is running (check system tray)
- Try running as administrator
- Check Windows Event Viewer for errors

### Notifications not showing

- Ensure Focus Assist is not blocking notifications
- Check Windows notification settings
- Verify "Enable Notifications" is ON in app settings

### Timer not accurate

- The timer uses setInterval which may drift slightly
- Close and restart the app to reset
- Check if system sleep/hibernation is affecting the timer

### Auto-start not working

- Run the app as administrator once
- Check Windows Task Manager > Startup tab
- Manually add to startup: Win+R → `shell:startup`

## 📄 License

ISC License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Icons created using PowerShell GDI+
- Health task ideas inspired by ergonomic best practices
- Built with ❤️ for healthier work habits

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/health-timer/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/health-timer/discussions)

---

**Stay healthy, stay productive! 💪**
