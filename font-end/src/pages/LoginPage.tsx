// src/pages/LoginPage.jsx
import { useState } from 'react';
import axios from 'axios';
import { log } from 'console';

export default function LoginPage({ onLogin, onShowRegister}) {
    const [form, setForm] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(form)
            const res = await axios.post('http://localhost:3000/api/login', {
                email: form.email,
                password: form.password,
            });
            console.log('result:' , res)

            
            const { token, exp,email , role,name } = res.data;
            console.log("res.data:", res.data);

            
            onLogin({ token, exp, email ,role ,name });
        } catch (err) {
            alert('Login failed!');
        }
    };

    return (
        <div className="">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-80">
                <h2 className="text-xl mb-4 font-bold text-center">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    className="border w-full p-2 mb-3"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border w-full p-2 mb-3"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
               
                <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded">
                    Login
                </button>
            </form>


            <p
                onClick={onShowRegister}
                className="mt-4 text-sm text-center text-blue-500 hover:underline cursor-pointer"
            >
                ยังไม่มีบัญชี? สมัครสมาชิก
            </p>

        </div>


    );
}
