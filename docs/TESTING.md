# Testing Guide

## Manual Testing Checklist

### ✅ Basic Functionality

#### Timer Operations

- [ ] App starts with 60-minute default timer (or last saved setting)
- [ ] Timer counts down correctly (updates every second)
- [ ] Timer triggers at 0:00 and shows task notification
- [ ] Timer resets to interval after completing a task
- [ ] Pause button works (timer stops counting)
- [ ] Resume button works (timer continues from where it stopped)

#### Task System

- [ ] Task notification appears when timer reaches 0
- [ ] Task card displays correctly (emoji, title, description)
- [ ] "Complete" button acknowledges task and resets timer
- [ ] "Snooze 5min" button postpones for 5 minutes
- [ ] After snooze triggers, timer returns to original interval
- [ ] Random tasks appear (water, break, eye rest)

#### Settings

- [ ] Settings modal opens via ⚙️ button
- [ ] Can select 30-minute interval (saves and applies)
- [ ] Can select 45-minute interval (saves and applies)
- [ ] Can select 60-minute interval (saves and applies)
- [ ] "Auto-start with Windows" toggle works
- [ ] "Enable Sound" toggle works
- [ ] "Enable Notifications" toggle works
- [ ] Settings persist after app restart

### 🎨 UI/UX Testing

#### Visual Elements

- [ ] Gradient background displays correctly
- [ ] Timer display is clear and readable
- [ ] Task card has proper styling
- [ ] Buttons have hover effects
- [ ] Settings modal centers properly
- [ ] Animations are smooth (no flickering)

#### Responsiveness

- [ ] Window can be resized
- [ ] UI elements adjust to window size
- [ ] Modal works at different window sizes

### 🔔 System Tray

#### Tray Icon

- [ ] Tray icon appears in system tray
- [ ] Tray icon displays correctly (not blank)
- [ ] Hovering shows "Health Timer" tooltip

#### Tray Menu

- [ ] Right-click tray icon shows context menu
- [ ] "Show App" brings window to front
- [ ] "Pause Timer" pauses when running
- [ ] "Start Timer" resumes when paused
- [ ] Menu item text updates based on timer state
- [ ] "Quit" closes app completely

#### Minimize Behavior

- [ ] Minimizing window hides to tray (not taskbar)
- [ ] Clicking tray icon restores window
- [ ] Closing window minimizes to tray (doesn't quit)
- [ ] App doesn't show in taskbar when minimized

### 🔊 Notifications

#### Desktop Notifications

- [ ] Notification appears when task triggers
- [ ] Notification shows correct task title and description
- [ ] Notification plays sound (if enabled in settings)
- [ ] No notification appears if disabled in settings
- [ ] Windows notification center receives notifications

#### Sound

- [ ] Sound plays when enabled
- [ ] No sound plays when disabled
- [ ] Sound is not annoying/jarring

### ⚙️ Settings Persistence

#### Save/Load

- [ ] Closing app saves current settings
- [ ] Reopening app loads saved settings
- [ ] Timer interval persists
- [ ] Auto-start setting persists
- [ ] Sound setting persists
- [ ] Notification setting persists
- [ ] Settings file created in correct location
  - Path: `%APPDATA%/health-timer/config/settings.json`

### 🚀 Auto-Start

#### Windows Startup

- [ ] Enabling auto-start creates registry entry
- [ ] App launches automatically after Windows restart
- [ ] App starts minimized to tray (optional test)
- [ ] Disabling auto-start removes registry entry
- [ ] App doesn't launch after restart when disabled

### 🔄 Edge Cases

#### Long-Running

- [ ] Timer accurate after 1+ hours of running
- [ ] No memory leaks after extended use
- [ ] App remains responsive after multiple task cycles

#### Rapid Actions

- [ ] Can click Complete multiple times (no crash)
- [ ] Can toggle settings rapidly (no issues)
- [ ] Can pause/resume rapidly (no desync)

#### System Events

- [ ] Timer continues after system sleep/wake
- [ ] App recovers from system hibernate
- [ ] Works correctly with multiple monitors
- [ ] Handles system timezone changes

### 🛠️ Development Testing

#### Hot Reload (Dev Mode)

- [ ] `npm run dev` starts successfully
- [ ] Changes to React components hot reload
- [ ] Changes to main process restart correctly
- [ ] No console errors in dev mode

#### Build Process

- [ ] `npm run build` completes without errors
- [ ] `npm run build:win` creates installer
- [ ] Installer size is reasonable (< 150MB)
- [ ] Installed app runs correctly

### 🔍 Error Handling

#### Graceful Failures

- [ ] Missing settings file doesn't crash app
- [ ] Corrupted settings file falls back to defaults
- [ ] Missing icon files don't prevent app start
- [ ] Network issues don't affect core functionality

## Performance Benchmarks

### Resource Usage

- **Memory**: Should stay under 150MB
- **CPU**: < 1% when idle, < 5% when active
- **Disk**: Settings file < 1KB

### Responsiveness

- **Startup time**: < 3 seconds
- **Settings save**: < 100ms
- **UI updates**: 60 FPS (no lag)

## Automated Testing (Future)

### Unit Tests

```bash
# To be implemented
npm test
```

### E2E Tests

```bash
# To be implemented
npm run test:e2e
```

## Bug Reporting Template

When reporting issues, include:

```markdown
**Description**
A clear description of the issue

**Steps to Reproduce**

1. Step 1
2. Step 2
3. ...

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**

- OS: Windows 10/11
- App Version: 1.0.0
- Installed from: Installer / Source

**Screenshots**
If applicable

**Console Logs**
Any relevant logs from DevTools
```

## Testing Schedule

### Before Release

- [ ] Complete full manual testing checklist
- [ ] Test on clean Windows install
- [ ] Test installer on multiple machines
- [ ] Verify auto-update works (if implemented)

### After Each Update

- [ ] Regression test core features
- [ ] Test new features specifically
- [ ] Check settings migration (if changed)

---

**Testing completed:** [Date]  
**Tested by:** [Name]  
**Version:** [X.X.X]  
**Result:** [ ] Pass / [ ] Fail
