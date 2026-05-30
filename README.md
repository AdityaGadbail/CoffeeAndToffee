# Coffee & Toffee

A web application for coffee enthusiasts, built with a modern JavaScript stack. Coffee & Toffee combines a robust Node/Express backend with a sleek React frontend, providing a smooth and scalable experience for users and developers alike.

---

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Setup & Installation](#setup--installation)
- [Running the Project Locally](#running-the-project-locally)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- ⚡ Modern, fast React frontend (Vite-powered)
- 🚀 RESTful API backend using Express.js and MongoDB (via Mongoose)
- 🔒 User authentication (JWT)
- ☁️ Cloud file uploads with Cloudinary
- 💸 Payment integration with Razorpay
- 📬 Support ticket system endpoints
- 🍃 Fully container-ready folder structure
- 🎨 Tailwind CSS for rapid UI development
- ⚙️ Robust middleware and modular approach

---

## Project Structure

```
CoffeeAndToffee/
│
├── Backend/
│   ├── config/          # Configuration files (DB, environment, etc.)
│   ├── controllers/     # API route controllers
│   ├── middleware/      # Express middleware (auth, error handling)
│   ├── models/          # Mongoose models (User, Tickets, etc.)
│   ├── routes/          # Express route definitions
│   ├── utils/           # Utility functions (helpers, etc.)
│   ├── server.js        # API entry point
│   ├── package.json     # Backend dependencies & scripts
│   └── .gitignore
│
└── Frontend/
    └── client/
        ├── public/          # Static assets (images, favicon, etc.)
        ├── src/             # Main React source code
        ├── index.html       # HTML entry point
        ├── package.json     # Frontend dependencies & scripts
        ├── vite.config.js   # Vite configuration
        ├── tailwind.config.js (if present)
        ├── .gitignore
        └── README.md
```

---

## Technology Stack

**Backend**
- Node.js, Express.js
- MongoDB (with Mongoose)
- JSON Web Token for authentication
- Cloudinary, Multer for uploads
- Razorpay for payments
- dotenv for environment configuration

**Frontend**
- React 19, Vite, JSX
- Tailwind CSS
- React Router
- Axios for API calls
- ESLint for code quality

---

## Setup & Installation

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB database (local or remote)
- Cloudinary account (for uploads)
- Razorpay account (for payments)

### 1. Clone the Repository

```sh
git clone https://github.com/AdityaGadbail/CoffeeAndToffee.git
cd CoffeeAndToffee
```

### 2. Backend Setup

```sh
cd Backend
cp .env.example .env    # Create your environment file
npm install
```

Fill your `.env` file with MongoDB URI, Cloudinary, and Razorpay keys.

### 3. Frontend Setup

```sh
cd ../Frontend/client
npm install
```

---

## Running the Project Locally

### Start the Backend

```sh
cd Backend
npm start      # or nodemon server.js
```

The backend will run on the port specified in your `.env` (default: 5000).

### Start the Frontend

```sh
cd Frontend/client
npm run dev
```

The frontend will be available at `http://localhost:5173` (default Vite port).

---

## Contributing

Contributions are welcome! Please fork the repo and open pull requests. For major changes, open an issue first to discuss what you would like to change.

---


## Contact & Support

For issues, please open a GitHub Issue. For direct queries, reach out to the maintainer via GitHub profile.
