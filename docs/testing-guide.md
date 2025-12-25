# Health Timer - Testing Guide

## 🧪 Testing MVP Features

### Quick Test Mode (For Development)

To test the app without waiting 60 minutes, temporarily change the threshold:

**In `src/main/index.ts`, line ~48:**

```typescript
// Quick test: trigger after 30 seconds instead of 60 minutes
timerService.setThreshold(0.5); // 0.5 minutes = 30 seconds
```

**Or for very quick testing:**

```typescript
timerService.setThreshold(0.1); // 6 seconds
```

### Test Checklist

#### ✅ Basic Timer

- [ ] App starts successfully
- [ ] Timer displays and counts up (00:00, 00:01, 00:02...)
- [ ] Timer format is correct (MM:SS)

#### ✅ Task Trigger

- [ ] After threshold time, notification appears
- [ ] Task card shows in UI with:
  - [ ] Icon
  - [ ] Title
  - [ ] Duration
- [ ] Random task is selected each time

#### ✅ Task Completion

- [ ] Click "Hoàn thành" button
- [ ] Task card disappears
- [ ] Timer resets to 00:00
- [ ] Timer continues running

#### ✅ Snooze Feature

- [ ] Click "5 phút" button
- [ ] Task disappears
- [ ] Notification appears: "Đã snooze, Sẽ nhắc lại sau 5 phút"
- [ ] After 5 minutes, task triggers again
- [ ] Same for 10 and 15 minute buttons

#### ✅ UI/UX

- [ ] Window size is correct (400x600)
- [ ] Colors and gradients display properly
- [ ] Buttons are clickable
- [ ] Hover effects work

### Test Commands

```bash
# Start dev mode
npm run dev

# If you need to restart
# Just close the window and run again
npm run dev
```

### Known Behaviors

1. **Auto-start**: Timer starts automatically when app opens
2. **Window close**: App quits (Phase 2 will minimize to tray)
3. **Task selection**: Random from 3 tasks
4. **Threshold reset**: After snooze, threshold temporarily changes

### Next Steps for Phase 2

- [ ] Settings UI for custom intervals
- [ ] System tray integration
- [ ] Auto-start with OS
- [ ] Better snooze logic (restore original threshold)
