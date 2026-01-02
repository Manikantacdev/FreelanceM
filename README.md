# FreelanceM

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Socket.io-Real--time-010101?style=for-the-badge&logo=socket.io&logoColor=white" alt="Socket.io" />
</div>

<br />

<p align="center">
  <strong>Where bold freelancers find briefs worth caring about.</strong>
</p>

<p align="center">
  FreelanceM curates meaningful collaborations between boundary-pushing makers and visionary teams. We lead with intention, honour the craft, and build partnerships that turn ambition into momentum.
</p>

---

## ✨ Features

### For Freelancers
- 🔍 **Browse Projects** - Discover curated briefs that match your skills
- 📝 **Submit Proposals** - Present your approach with budget and timeline
- 💬 **Real-time Chat** - Communicate directly with clients via floating chat widget
- 📦 **Project Delivery** - Submit completed work with documentation links
- 📊 **Dashboard** - Track applications, active projects, and completed work

### For Clients
- 📋 **Post Projects** - Create detailed briefs with skill requirements and budgets
- 👥 **Review Applications** - Evaluate freelancer proposals and select the best fit
- 💬 **Real-time Chat** - Collaborate with assigned freelancers
- ✅ **Approve Submissions** - Review deliverables and release payments
- 📊 **Dashboard** - Manage all projects in one place

### For Admins
- 👤 **User Management** - View and manage all platform users
- 📁 **Project Oversight** - Monitor all projects across the platform
- 📋 **Application Review** - Access all submitted applications

---

## 🛠️ Tech Stack

### Frontend (Client)
| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| React Router DOM | Client-side Routing |
| Axios | HTTP Client |
| Socket.io Client | Real-time Communication |
| Vite | Build Tool & Dev Server |
| Pure CSS | Styling with Design Tokens |

### Backend (Server)
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| Socket.io | Real-time WebSocket Server |
| bcrypt | Password Hashing |
| Helmet | Security Headers |
| Morgan | HTTP Request Logging |

---

## 📁 Project Structure

```
freelancem/
├── client/                 # React Frontend
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── FloatingChat.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Register.jsx
│   │   ├── context/        # React Context providers
│   │   ├── pages/          # Route pages
│   │   │   ├── admin/      # Admin dashboard pages
│   │   │   ├── client/     # Client dashboard pages
│   │   │   └── freelancer/ # Freelancer dashboard pages
│   │   ├── styles/         # CSS stylesheets
│   │   ├── App.jsx         # Main app component
│   │   └── index.jsx       # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Node.js Backend
│   ├── model/
│   │   └── Schema.js       # Mongoose schemas
│   ├── index.js            # Express server entry
│   ├── SocketHandler.js    # Socket.io event handlers
│   └── package.json
│
└── README.md               # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local or Atlas connection)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/freelancem.git
   cd freelancem
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**

   Create a `.env` file in the `server/` directory:
   ```env
   PORT=6001
   MONGODB_URI=mongodbURL
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   Server runs on `http://localhost:6001`

2. **Start the frontend (in a new terminal)**
   ```bash
   cd client
   npm run dev
   ```
   Client runs on `http://localhost:5173`

---

## 🎨 Design System

FreelanceM features a cohesive dark-mode design with:

- **Color Palette**
  - Canvas: `#070b12` (deep dark)
  - Accent: `#f26b21` (vibrant orange)
  - Success: `#78c49c` (soft green)
  - Text Primary: `#f4ece2` (warm white)

- **Typography**
  - Headings: Syne (bold, expressive)
  - Body: Epilogue (clean, readable)

- **Components**
  - Glassmorphic panels with blur effects
  - Smooth animations and transitions
  - Floating chat widget for real-time messaging

---

## 📱 User Roles

| Role | Access |
|------|--------|
| **Freelancer** | Browse projects, submit proposals, chat with clients, deliver work |
| **Client** | Post projects, review applications, assign freelancers, approve deliveries |
| **Admin** | Full platform oversight, user management, project monitoring |

---

## 🔐 Authentication

- Email-based registration and login
- Password hashing with bcrypt
- Role-based access control
- Persistent sessions via localStorage

---

## 💬 Real-time Features

- **Floating Chat Widget** - Non-intrusive chat button with unread message badges
- **Instant Messaging** - Socket.io powered real-time communication
- **Presence Updates** - Live status when users join chat rooms

---

## 📝 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Manikanta**

---

<div align="center">
  <p>Crafted with intention. Built for momentum.</p>
  <strong>FreelanceM © 2026</strong>
</div>
