# 🔐 Fullstack Authentication System

A modern, secure, and scalable fullstack authentication system built with **React**, **Express**, **MySQL**, and **Docker**. This project features **JWT-based authentication**, **role-based access control** (`user` and `admin`), and a responsive UI with **Tailwind CSS**. It supports token expiration, persistent user sessions via `localStorage`, and automated database initialization through Docker.

---

## 🚀 Features

- **Secure Authentication**: JWT-based login/logout with token expiration and refresh.
- **Role-Based Access**: Differentiated access for `user` and `admin` roles.
- **Responsive Frontend**: Built with React and styled with Tailwind CSS for a seamless, modern UI.
- **Scalable Backend**: Powered by Express with a MySQL database for robust data management.
- **Containerized Development**: Docker Compose for consistent, reproducible environments.
- **Real-Time Feedback**: Token countdown timer and role-based UI elements (e.g., color-coded tags for `admin`/`user`).
- **Persistent Sessions**: User data stored in `localStorage` for seamless user experience.
- **Admin Privileges**: Exclusive endpoints for admins to view all users.

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Vite
- **Backend**: Node.js, Express
- **Database**: MySQL 8 (containerized via Docker)
- **Authentication**: JSON Web Tokens (JWT)
- **Infrastructure**: Docker, Docker Compose

---

## 📂 Project Structure

```
project-root/
├── backend/
│   ├── app.js              # Express server entry point
│   ├── routes/             # API route definitions
│   ├── controllers/        # Business logic for routes
│   ├── database/           # Database configuration and initialization
│   │   ├── db.js           # MySQL connection setup
│   │   └── init.sql        # Initial database schema and data
│   └── .env                # Environment variables
├── frontend/
│   ├── src/
│   │   ├── pages/          # React page components
│   │   │   ├── LoginPage.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   └── App.jsx         # Main React app component
│   └── vite.config.js      # Vite configuration
├── docker-compose.yml      # Docker Compose configuration
└── README.md               # Project documentation
```

---

## ⚙️ Environment Variables

Create a `.env` file in the `backend/` directory with the following configuration:

```env
PORT=3000
JWT_SECRET=your-very-secure-secret-key
DB_HOST=mysql_db
DB_USER=root
DB_PASSWORD=your-secure-password
DB_NAME=auth_db
```

> **Note**: Replace `your-very-secure-secret-key` and `your-secure-password` with strong, secure values in production.

---

## 🐳 Getting Started with Docker

### Prerequisites
- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) installed.
- [Node.js](https://nodejs.org/) (v18 or later) for local development.

### Setup Instructions

1. **Start MySQL Database**:
   Run the Docker Compose file to spin up a MySQL container. The `init.sql` file will automatically initialize the database schema.
   ```bash
   docker-compose up -d
   ```
   This creates a container named `mysql_db`, accessible on port `3307`.

2. **Run Backend (Express)**:
   Navigate to the backend directory, install dependencies, and start the server.
   ```bash
   cd backend
   npm install
   npm run start
   ```
   The backend will be available at `http://localhost:3000`.

3. **Run Frontend (React)**:
   Navigate to the frontend directory, install dependencies, and start the development server.
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173` (or the port specified by Vite).

---

## 🌐 API Endpoints

| Method | Endpoint         | Description                     | Authentication       |
|--------|------------------|---------------------------------|----------------------|
| POST   | `/api/register`  | Register a new user             | None                 |
| POST   | `/api/login`     | Authenticate and receive JWT    | None                 |
| GET    | `/api/users`     | List all users (admin only)     | JWT (admin role)     |

### Example JSON Payloads

#### Login
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

#### Register
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "role": "user"
}
```

---

## 🎨 Frontend Features

- **Login/Register Forms**: Intuitive and responsive forms with real-time validation.
- **Token Countdown**: Displays remaining token validity in real-time.
- **Admin Dashboard**: Exclusive view for admins to list all users.
- **Persistent Login**: Stores user data in `localStorage` for seamless sessions.
- **Responsive Design**: Tailwind CSS ensures a polished, mobile-friendly UI.
- **Role-Based UI**: Admins are highlighted with green tags, users with neutral tags.
- **Automatic Logout**: Handles token expiration with graceful user redirection.

---

## 📸 Screenshots

Example paths for UI screenshots (to be added):
- `screenshots/login.png`
- `screenshots/dashboard.png`

---

## 📝 Notes

- **Token Expiration**: For testing, tokens expire after **10 seconds**. Adjust the expiration time in production via the backend configuration.
- **Database Initialization**: The `init.sql` file runs automatically when the MySQL container is first created.
- **Deployment**: This project is not yet deployed. For production, consider securing the `.env` file, enabling HTTPS, and using a reverse proxy like Nginx.
- **Docker**: Ensure port `3307` (MySQL) and `3000` (backend) are free before starting Docker Compose.

---

## 🛡️ Security Considerations

- Use a strong `JWT_SECRET` and database password in production.
- Sanitize and validate all user inputs to prevent SQL injection and XSS attacks.
- Enable CORS restrictions in the backend for production environments.
- Regularly update dependencies to patch security vulnerabilities.

---

## 📚 Future Improvements

- Add refresh token support for extended user sessions.
- Implement password reset functionality via email.
- Deploy the application to a cloud provider (e.g., AWS, Vercel).
- Add unit and integration tests for backend and frontend.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request with your changes.

---

## 📧 Contact

For questions or feedback, reach out via [GitHub Issues](https://github.com/your-repo/issues).

---

**Built with 💻 and ☕ by [Your Name]**