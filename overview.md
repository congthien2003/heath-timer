Ok, mình lên **plan triển khai app desktop dạng health–timer** cho bạn theo hướng **gọn – dễ làm – mở rộng được**, đúng mindset dev 👨‍💻
Mình chia theo **Feature → Tech stack → Architecture → Phases**.

---

## 1. Mục tiêu & phạm vi (Scope)

**Mục tiêu chính**

- Nhắc nhở người dùng vận động / nghỉ ngơi khi ngồi lâu
- App chạy **background**, không gây phiền
- Tập trung vào **habit nhỏ – lặp lại**

**Key principles**

- Simple UI
- Notification native
- Không cần account
- Offline-first

---

## 2. Feature breakdown

### 🎯 Core Features (MVP)

1. **Timer ngồi làm việc**

   - Detect app start → bắt đầu đếm
   - Ngồi liên tục > 60 phút → trigger reminder

2. **Task nhắc nhở ngẫu nhiên / theo rule**

   - Uống nước
   - Đứng dậy
   - Nghỉ mắt 2 phút (20-20-20 rule)

3. **Desktop Notification**

   - Native notification (Windows / macOS)
   - Có sound (optional)

4. **Minimal UI**

   - Hiển thị:

     - Thời gian ngồi
     - Task hiện tại

   - Buttons:

     - Done
     - Snooze (5 / 10 phút)

---

### ⭐ Nice-to-have (Phase sau)

- Custom task
- Tùy chỉnh interval (30 / 45 / 60 phút)
- Thống kê trong ngày (done count)
- Auto-start cùng OS
- Dark / Light mode

---

## 3. Công nghệ đề xuất

### 🔧 Tech Stack (khuyến nghị cho bạn)

#### Option tốt nhất cho bạn: **Electron + React + TS**

Vì bạn từng nói muốn build **Electron GUI + thao tác system** 👍

| Layer             | Tech                       |
| ----------------- | -------------------------- |
| Desktop framework | Electron                   |
| UI                | React + Tailwind           |
| State             | Zustand                    |
| Notification      | Electron Notification API  |
| Storage           | localStorage / lowdb       |
| Timer             | Node.js background process |
| Build             | Electron Builder           |

---

### 📌 Alternative (nếu muốn native hơn)

- **Tauri + React** → nhẹ hơn Electron
- **.NET WPF / MAUI** → nếu muốn full C#

---

## 4. Architecture đề xuất

```
/app
 ├── main (Electron main process)
 │    ├── timer.service.ts
 │    ├── notification.service.ts
 │    └── storage.service.ts
 │
 ├── renderer (React UI)
 │    ├── components
 │    ├── screens
 │    ├── stores
 │    └── hooks
 │
 ├── shared
 │    ├── task.model.ts
 │    └── constants.ts
```

### Core concepts

- **Main process**

  - Chạy timer
  - Gửi notification

- **Renderer**

  - Hiển thị UI
  - Nhận event từ main

- **IPC**

  - `timer:tick`
  - `task:trigger`
  - `task:done`

---

## 5. Task model (simple)

```ts
type Task = {
	id: string;
	title: string;
	duration?: number; // seconds
	type: "break" | "eye" | "water";
};
```

Ví dụ:

```ts
{
  id: "drink_water",
  title: "Uống 1 ngụm nước 💧",
  type: "water"
}
```

---

## 6. Phases triển khai (rất quan trọng)

---

### 🚀 Phase 1 – MVP (1–2 ngày)

🎯 Goal: App chạy được – có nhắc

**Deliverables**

- Electron app boot
- Background timer 60 phút
- 3 task hardcode
- Notification popup
- Button Done / Snooze

👉 **Kết quả**: Dùng được ngay cho bản thân

---

### 🧱 Phase 2 – Stability & UX (2–3 ngày)

🎯 Goal: Dùng lâu không khó chịu

- Config interval
- Random task
- Snooze logic
- App chạy startup
- Minimize to tray

---

### 📊 Phase 3 – Insight & Tracking

🎯 Goal: Tạo động lực

- Log task completed
- Daily summary
- Progress bar

---

### 🌍 Phase 4 – Distribution

🎯 Goal: Public / Share

- Build installer (exe / dmg)
- App icon
- Versioning
- Auto-update (optional)

---

## 7. Notification logic (core)

```ts
if (sittingTime >= 60 * 60) {
	triggerTask(randomTask);
}
```

**Rule đề xuất**

- Không spam quá 1 lần / 15 phút
- Nếu user ignore → delay

---

## 8. MVP Timeline gợi ý

| Ngày  | Việc                   |
| ----- | ---------------------- |
| Day 1 | Setup Electron + React |
| Day 2 | Timer + Notification   |
| Day 3 | UI + Task flow         |
| Day 4 | Polish + build         |

---

## 9. Gợi ý mở rộng thông minh sau này

- AI chọn task dựa vào thời gian trong ngày
- Sync với calendar
- Gamification (streak 🔥)
