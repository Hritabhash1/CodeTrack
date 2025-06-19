# Student Progress Management System

A full-stack MERN web application to manage, track, and analyze students' Codeforces performance. Designed for institutions to monitor student progress, send inactivity reminders, and view detailed analytics for contests and problem-solving history.

YouTube Demo Video: [Video Link](https://www.youtube.com/watch?v=clWYOYiWp7M&)
---

## 🔹 Features

### 📊 Student Table View

![Student Table](https://github.com/user-attachments/assets/a2093395-626b-4f7b-89e8-35d61fea75e7)

A central dashboard listing all enrolled students, including:

- Name, Email, Phone Number, Codeforces Handle  
- Current Rating and Max Rating  
- Last Synced Time  
- Reminders Sent Count  
- Toggle for enabling/disabling email reminders  
- Add, Edit, and Delete students  
- Search by name  
- Export the entire dataset as a CSV  
- View individual student profiles  

---

### 📁 Student Profile View

Each student profile includes two detailed sections:

#### 1. Contest History

![Contest History Tracker Line Chart](https://github.com/user-attachments/assets/e3aa3260-4997-47c8-af43-fe0cb794e863)

![Past Contest Info](https://github.com/user-attachments/assets/9d7078dc-ae86-4e75-b7bd-2ad78846e2e7)

- Filters: Last 30, 90, or 365 days  
- Line chart showing rating changes  
- Contest list showing:
  - Contest Name
  - Rank
  - Rating Change
  - Number of unsolved problems  

#### 2. Problem Solving Stats

![Bar chart showing problems Rating Buckets](https://github.com/user-attachments/assets/a13b01e1-39c1-447e-a855-e3616fbbc885)

![Submission Heatmap](https://github.com/user-attachments/assets/bef46732-720d-411c-a1ce-a70c60798319)
- Filters: Last 7, 30, or 90 days  
- Most difficult problem solved  
- Total problems solved  
- Average problem rating  
- Average problems per day  
- Bar chart showing problems solved per rating bucket  
- Submission heatmap (activity calendar)  

---

### 🔄 Codeforces Data Sync

![Customise Cron Job](https://github.com/user-attachments/assets/f04bd366-d31b-4b15-944f-48c12a348f02)

- Automatic data sync at 2 AM daily (customizable via cron)  
- No real-time API calls during user hours  
- Immediate sync on handle update  

---

### 📧 Inactivity Detection

- Students with no recent accepted submissions (past 7 days) receive automatic email reminders  
- Reminders are tracked per student  
- Email reminders can be disabled per student  

---

### 🌗 Additional Functionalities

- Dark/Light Mode Toggle  
- Responsive UI (mobile and tablet friendly)  
- Clean and well-documented codebase  

![Analytics Dashboard](https://github.com/user-attachments/assets/06966c00-14ec-4bce-8d28-9a4846c3e1e2)

---

## 🛠️ Tech Stack

| Layer     | Technologies                            |
|-----------|------------------------------------------|
| Frontend  | React, Tailwind CSS                      |
| Backend   | Node.js, Express.js                      |
| Database  | MongoDB                                  |
| Other     | Axios, Chart.js, node-cron, nodemailer, json2csv |

---

## Setup Instructions
Clone the repository

```
git clone https://github.com/yourusername/student-progress-system.git
cd student-progress-system
```
Set environment variables

Create a .env file inside the Backend directory:

```
PORT=5000
MONGO_URI=mongodb:
EMAIL_USER=
EMAIL_PASS=
```
Install dependencies and run the servers

Backend:

```
cd Backend
npm install
npm run dev
```
Frontend:

```
cd ../Frontend
npm install
npm run dev
```
Access the application
Visit http://localhost:5173 in your browser
---
### API Routes

## Student Routes
GET /api/students - Fetch all students

POST /api/students - Add a new student

PUT /api/students/:id - Edit student or toggle reminders

DELETE /api/students/:id - Delete student

GET /api/export - Download all student data as CSV

## Contest and Problem Routes
GET /api/contests/:studentId - Contest history for a student

GET /api/problems/:studentId - Problem-solving data for a student

## Cron Config Route

- GET /api/cron-config - Get current cron configuration
- POST /api/cron-config - Update cron time and frequency or TimeZone

---
### Deliverables
- GitHub Repository: https://github.com/Hritabhash1/CodeTrack
- YouTube Demo Video: [Video Link](https://www.youtube.com/watch?v=clWYOYiWp7M&)
- Drive Video Link : [Click the Link](https://drive.google.com/file/d/1ZTZRJiMbu8Z4JBtj6-yMDp8RPuiYWt4X/view?usp=sharing)

### Notes
The system avoids real-time API calls during daytime to reduce API load

Each student's Codeforces data is stored in the database to allow efficient access

Reminders are only sent to students who have email reminders enabled
