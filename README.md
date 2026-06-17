# Baatein 💬

A modern real-time messaging platform built with React, Spring Boot, MySQL, and WebSockets. Baatein enables users to connect, chat instantly, manage friendships, receive real-time notifications, and maintain seamless conversations through a scalable full-stack architecture.

---

## 📖 Overview

Baatein is a full-stack real-time chat application designed to provide a fast, reliable, and engaging communication experience. The platform combines modern frontend technologies with a robust backend architecture to deliver instant messaging, user presence management, friend interactions, and real-time updates.

The project was built to explore and implement real-world software engineering concepts including:

* Authentication and Authorization
* Real-Time Communication
* WebSocket Architecture
* RESTful API Design
* Database Modeling
* Scalable Backend Systems
* Secure Session Management
* Cloud Deployment

---

## ✨ Features

### 👤 User Authentication

* User Registration
* Secure Login & Logout
* JWT-based Authentication
* Refresh Token Mechanism
* Protected Routes
* Session Persistence

### 👥 Friend Management

* Send Friend Requests
* Accept Friend Requests
* Reject Friend Requests
* Remove Friends
* Block Users
* Unblock Users
* Real-Time Friend Updates

### 💬 Real-Time Messaging

* One-to-One Conversations
* Instant Message Delivery
* Persistent Chat History
* Real-Time Message Updates
* Conversation Management
* Message Timestamps

### 🔔 Real-Time Notifications

* Friend Request Notifications
* Friend Acceptance Notifications
* New Message Notifications
* Live Updates using WebSockets

### 🖼️ User Profiles

* Profile Information Management
* Profile Picture Upload
* Dynamic Profile Updates

### ⚡ Real-Time Communication

* STOMP over WebSocket
* Live Event Broadcasting
* User-Specific Messaging Queues
* Conversation Subscriptions

---

## 🏗️ System Architecture

### High-Level Flow

```
Frontend (React)
        │
        ▼
 REST APIs (Spring Boot)
        │
        ▼
      MySQL
        │
        ▼
 WebSocket / STOMP
        │
        ▼
 Real-Time Updates
```

### Request Flow

```
User Action
     │
     ▼
React Frontend
     │
     ▼
REST API Request
     │
     ▼
Spring Boot Backend
     │
     ▼
Database Operation
     │
     ▼
WebSocket Notification
     │
     ▼
Connected Clients
```

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Axios
* Tailwind CSS
* Material UI
* STOMP Client
* SockJS

### Backend

* Java
* Spring Boot
* Spring Security
* Spring Data JPA
* Hibernate
* WebSocket
* STOMP
* JWT Authentication

### Database

* MySQL

### Cloud & Deployment

* Google Cloud Platform (GCP)
* Firebase Hosting

### Development Tools

* Git
* GitHub
* Postman
* IntelliJ IDEA
* VS Code

---

## 📂 Project Structure

### Frontend

```
src/
├── components/
├── pages/
├── hooks/
├── services/
├── contexts/
├── routes/
├── utils/
└── assets/
```

### Backend

```
src/main/java
├── controller/
├── service/
├── repository/
├── entity/
├── dto/
├── mapper/
├── config/
├── security/
├── websocket/
└── exception/
```

---

## 🗄️ Database Design

### User

```java
User
├── userId
├── email
├── password
├── username
├── profileImage
├── createdAt
└── updatedAt
```

### Friendship

```java
Friendship
├── friendshipId
├── sender
├── receiver
├── status
├── conversation
└── createdAt
```

### Conversation

```java
Conversation
├── conversationId
├── conversationCode
├── type
├── participants
└── createdAt
```

### Message

```java
Message
├── messageId
├── conversation
├── sender
├── content
├── timestamp
└── status
```

---

## 🔐 Authentication Flow

Baatein uses JWT-based authentication with refresh token support.

### Login Flow

1. User submits credentials.
2. Backend validates credentials.
3. Access Token is generated.
4. Refresh Token is generated.
5. Access Token is returned to frontend.
6. Refresh Token is stored securely in cookies.

### Token Refresh Flow

1. Access Token expires.
2. Frontend automatically requests a new token.
3. Backend validates Refresh Token.
4. New Access Token is issued.
5. User remains logged in.

---

## 📡 WebSocket Architecture

Baatein uses WebSockets with STOMP protocol to achieve real-time communication.

### Features Powered by WebSockets

* Incoming Messages
* Friend Requests
* Notification Updates
* Friend Status Changes
* Conversation Updates

### Example Flow

```
User Sends Message
        │
        ▼
REST API
        │
        ▼
Message Saved
        │
        ▼
WebSocket Event
        │
        ▼
Recipient Receives Message
```

---

## 🔄 Friend Request Workflow

### Sending Request

```
User A
   │
   ▼
Send Request
   │
   ▼
Friendship Created (PENDING)
   │
   ▼
Notification Sent
```

### Accepting Request

```
User B Accepts
        │
        ▼
Status → FRIENDS
        │
        ▼
Conversation Created
        │
        ▼
Real-Time Update Sent
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/baatein.git
cd baatein
```

---

## Backend Setup

### Configure Database

Update:

```properties
application.properties
```

```properties
spring.datasource.url=YOUR_DB_URL
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD
```

### Run Backend

```bash
./mvnw spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

---

## Frontend Setup

Install dependencies:

```bash
npm install
```

Create:

```bash
.env
```

Example:

```env
VITE_BACKEND_BASE_URL=http://localhost:8080
VITE_WEBSOCKET_BASE_URL=http://localhost:8080
VITE_BASE_IMAGE_URL=http://localhost:8080/uploads/
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 🔑 Key Engineering Challenges Solved

### Real-Time Messaging

Implemented bidirectional communication using STOMP over WebSockets for instant updates.

### Authentication

Implemented secure JWT authentication with refresh token rotation and automatic token renewal.

### State Synchronization

Maintained consistent state between multiple connected users through event-driven updates.

### Friend Management

Designed friendship lifecycle management with request, acceptance, blocking, and deletion workflows.

### Conversation Handling

Automatically creates and manages conversations between connected users.

---

## 📈 Future Enhancements

* Group Chats
* Message Reactions
* Read Receipts
* Typing Indicators
* File Sharing
* Image Sharing
* Voice Notes
* Message Search
* End-to-End Encryption
* Push Notifications
* Voice Calling
* Video Calling
* Group Calling

---

## 🎯 Learning Outcomes

Through Baatein, I gained practical experience in:

* Full-Stack Development
* Spring Boot Architecture
* React Application Design
* WebSocket Communication
* Authentication & Security
* Database Modeling
* REST API Development
* Cloud Deployment
* Real-Time Systems Design
* Scalable Software Architecture

---

## 👨‍💻 Author

Mohammad Junaid

Computer Science & Engineering
Jamia Millia Islamia

Feel free to connect, contribute, or provide feedback.
