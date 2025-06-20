// src/pages/RegisterPage.jsx
import { useState } from 'react';
import axios from 'axios';

export default function RegisterPage({ onBackToLogin }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/api/register', form);
      setMessage('✅ Register success! Back to login');
    } catch (err) {
      const msg = err?.response?.data?.message || '❌ Register failed!';
      setMessage(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-6 w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

        <input
          type="text"
          placeholder="Username"
          className="border w-full p-2 mb-3"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 mb-3"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-4"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <select
          className="border w-full p-2 mb-3"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="bg-green-500 text-white w-full py-2 rounded"
        >
          Register
        </button>
        {message && <p className="mt-3 text-sm text-center">{message}</p>}

        <p
          onClick={onBackToLogin}
          className="mt-4 text-sm text-center text-blue-500 hover:underline cursor-pointer"
        >
          ← กลับหน้า Login
        </p>
      </form>
    </div>
  );
}
