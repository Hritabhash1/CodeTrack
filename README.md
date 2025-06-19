### Student Progress Management System
A MERN stack web application that allows institutions to manage students' Codeforces performance data, track their contest history and problem-solving progress, and automate reminders for inactivity.

### Features
## Student Table View
List of all students with the following information:

Name, Email, Phone Number, Codeforces Handle

Current Rating, Max Rating

Last Synced Time

Reminders Sent Count

Toggle to enable/disable email reminders

Add, Edit, Delete student entries

Search functionality by name

Export entire dataset as CSV

View individual student profile

### Student Profile View
When a student is clicked from the table:

Contest History

Filters: last 30, 90, or 365 days

Line graph showing rating changes over time

Table showing:

Contest Name, Rank, Rating Change

Problems unsolved by the student in that contest

Problem Solving Stats

Filters: last 7, 30, or 90 days

Most difficult problem solved

Total problems solved

Average rating of problems solved

Average problems solved per day

Bar chart of problems solved by rating bucket

Submission heatmap by date

### Codeforces Data Sync
Codeforces data is fetched daily at a configurable time (default: 2 AM) using a cron job

No live API calls during interaction hours

When a student’s handle is updated, their Codeforces data is synced immediately

### Inactivity Detection
If a student has no accepted submission in the past 7 days, an email reminder is sent

A count of reminder emails sent is stored per student

Email reminders can be turned on or off per student

### Other Functionalities
Dark and Light Mode with toggle

Mobile and tablet responsive UI

Well-organized and documented codebase

## Tech Stack
Frontend: React, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB

Other Libraries: Axios, Chart.js, node-cron, nodemailer, json2csv

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

### API Routes

## Student Routes
GET /api/students - Fetch all students

POST /api/students - Add a new student

PUT /api/students/:id - Edit student or toggle reminders

DELETE /api/students/:id - Delete student

GET /api/export - Download all student data as CSV

##Contest and Problem Routes
GET /api/contests/:studentId - Contest history for a student

GET /api/problems/:studentId - Problem-solving data for a student

## Cron Config Route
GET /api/cron-config - Get current cron configuration

POST /api/cron-config - Update cron time and frequency

Deliverables
GitHub Repository: https://github.com/Hritabhash1/CodeTrack

YouTube Demo Video: [Video Link](https://www.youtube.com/watch?v=clWYOYiWp7M&)
Drive Video Link : [Click the Link](https://drive.google.com/file/d/1ZTZRJiMbu8Z4JBtj6-yMDp8RPuiYWt4X/view?usp=sharing)

### Notes
The system avoids real-time API calls during daytime to reduce API load

Each student's Codeforces data is stored in the database to allow efficient access

Reminders are only sent to students who have email reminders enabled
