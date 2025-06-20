import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard({ user, onLogout }) {
  const [users, setUsers] = useState([]);
  const [remaining, setRemaining] = useState('');

  useEffect(() => {

    const interval = setInterval(() => {
      const sec = Math.floor(user.exp * 1000 - Date.now()) / 1000;
      if (sec <= 0) {
        setRemaining('หมดอายุแล้ว');
        clearInterval(interval);
        
      } else {
        setRemaining(`${Math.floor(sec)} second`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [user.exp]);

  useEffect(() => {
    if (user.role === 'admin') {
      axios
        .get('http://localhost:3000/api/users', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => setUsers(res.data))
        .catch(() => alert('ไม่สามารถโหลด users ได้'));
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8 relative">
        {/* Logout button */}
        <button
          onClick={onLogout}
          className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm"
        >
          Logout
        </button>



        {/* Welcome Section */}
        <h1 className="text-3xl font-bold mb-4"> Welcome {user.name}</h1>
        <div className="text-lg text-gray-600 space-y-1">
          <p><span className="font-semibold text-gray-800">Role:</span> {user.role}</p>
          <p className="text-red-600">
            ⏳ Session will Expired in : <span className="font-bold">{remaining}</span>
          </p>
        </div>
        {user.role !== 'admin' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {/* Card 1 */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="text-lg font-semibold mb-2">Token Info</h3>
              <p className="text-sm text-gray-600">Token หมดอายุใน:</p>
              <p className="text-red-500 font-medium">{remaining}</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="text-lg font-semibold mb-2">บัญชีผู้ใช้</h3>
              <p className="text-sm text-gray-600">Email:</p>
              <p className="font-medium">{user.email}</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="text-lg font-semibold mb-2">สถานะระบบ</h3>
              <p className="text-sm text-gray-600">การเชื่อมต่อ:</p>
              <p className="text-green-600 font-medium">พร้อมใช้งาน ✅</p>
            </div>
          </div>
        )}
        {/* Admin Table */}
        {user.role === 'admin' && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">👥 Users Info</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Email</th>
                    <th className="px-4 py-2 border">Role</th>
                    <th className="px-4 py-2 border">Password Hash</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-2 border">{u.id}</td>
                      <td className="px-4 py-2 border">{u.email}</td>
                      <td
                        className={`px-4 py-2 border text-center font-semibold ${u.role === 'admin'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-50 text-gray-700'
                          }`}
                      >
                        {u.role}
                      </td>
                      <td className="px-4 py-2 border font-mono text-xs break-all">
                        {u.password}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}



      </div>
    </div>
  );
}
