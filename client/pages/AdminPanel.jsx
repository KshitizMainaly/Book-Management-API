import { useState, useEffect } from 'react';
import { fetchUsers, updateUserRole } from '../services/api';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const { data } = await fetchUsers();
        setUsers(data.data);
      } catch (err) {
        console.error(err);
        alert('Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      setUsers(users.map(user =>
        user._id === userId ? { ...user, role: newRole } : user
      ));
    } catch (err) {
      alert('Failed to update role');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center py-8">Loading users...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Role</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={user.role}
                    onChange={e => handleRoleChange(user._id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
