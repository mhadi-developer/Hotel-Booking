Grand Maison — Hotel Booking System

A full-stack hotel booking application built using modern web technologies. The system allows users to browse hotel rooms, make bookings, and manage reservations with secure authentication and real-time features.

Features
User Features
User registration and login
JWT-based authentication with HTTP-only cookies
Browse available rooms
Book rooms with check-in and check-out dates
View booking history
Cancel bookings (if implemented)
Room & Booking System
Room listing with availability logic
Booking creation with date validation
Prevention of overlapping bookings
Booking status management
Security & Performance
JWT authentication
Rate limiting to protect APIs
Input validation and error handling
Secure cookie handling
Real-time Features
WebSocket integration for live updates (if implemented)
Instant booking status updates
Tech Stack

Frontend:

React
TypeScript
Zustand (state management)

Backend:

Node.js
Express.js
TypeScript
JWT Authentication
WebSockets (Socket.IO or native WS)

Database:

PostgreSQL
SQL-based relational structure

Security & Tools:

Rate Limiter middleware
CORS
Cookie Parser
Project Structure

Grand-Maison/
│
├── client/ # React frontend
├── server/ # Express backend
│ ├── routes/
│ ├── controllers/
│ ├── services/
│ ├── db/
│
├── .env
└── README.md

Installation & Setup
Clone repository

git clone https://github.com/your-username/grand-maison.git

Backend setup

cd Backend
npm install

Create .env file:
PORT=7004
DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret_key

Run backend:
npm start

Frontend setup

cd Frontend
npm install
npm run dev

Database Structure

Main entities:

Users
Rooms
Bookings

Relationships:

One user can have many bookings
One room can have many bookings over time
Bookings are validated to avoid overlapping dates
Authentication Flow
User registers
User logs in
Server generates JWT token
Token stored in HTTP-only cookie
Middleware protects private routes
WebSocket Flow (if used)
Client connects to WebSocket server
Server emits booking updates
Clients receive real-time updates instantly
Future Improvements
Payment integration (Stripe)
Email notifications for bookings
Admin dashboard with analytics
Docker containerization
CI/CD pipeline setup
Improved scalability for WebSockets
Author

Hadi — Full-stack  Developer
