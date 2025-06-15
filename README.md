# CodeTrack

**CodeTrack** is a student progress management system built with the MERN stack. It helps keep track of students’ performance on Codeforces by showing contest history, problem-solving activity, and overall progress — all in one clean interface.

## ✨ What It Does

- Shows a list of all students along with their Codeforces handle, current/max rating, and basic info.
- Lets you add, edit, or delete students.
- Clicking a student gives you detailed insights into their contest history and problem-solving patterns.
- Visuals include:
  - Rating progress graphs
  - Problem-solving heatmaps
  - Bar charts based on problem difficulty
- You can filter data by date ranges like last 7/30/90/365 days.

## 🔁 Automatic Sync & Email Reminders

- A cron job fetches the latest Codeforces data every day at 2 AM (you can change this).
- If a student hasn't submitted in the last 7 days, the system sends them a gentle reminder email.
- You can turn off these reminders for individual students.

## 🛠️ Built With

- **MongoDB** + **Express.js** + **React.js** + **Node.js**
- **Tailwind CSS** for styling
- **Recharts** and calendar heatmaps for graphs
- **Nodemailer** for sending emails
- **node-cron** to schedule daily syncs
- Codeforces Public API for all user data

## 🎯 Key Features

- Light & Dark mode toggle
- Mobile and tablet friendly
- CSV download of all student data
- Last sync timestamp shown per student
- Real-time sync when CF handle is updated


## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/CodeTrack.git

# Backend setup
cd backend
npm install
npm run dev

# Frontend setup
cd ../frontend
npm install
npm start
