// src/App.jsx
import './App.css';
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  // ✅ โหลด token/user จาก localStorage ถ้ายังไม่หมดอายุ
  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      const parsed = JSON.parse(saved);
      const now = Date.now();
      if (parsed.exp * 1000 > now) {
        setUser(parsed);
      } else {
        localStorage.removeItem('user'); // หมดอายุ
      }
    }
  }, []);

  const handleLogin = (data) => {
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : showRegister ? (
        <RegisterPage onBackToLogin={() => setShowRegister(false)} />
      ) : (
        <LoginPage onLogin={handleLogin} onShowRegister={() => setShowRegister(true)} />
      )}
    </div>
  );
}

export default App;
