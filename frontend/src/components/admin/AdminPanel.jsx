import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { adminService } from '../../services/adminService';
import UserRow from './UserRow';

export default function AdminPanel() {
  const { user, token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!user || user.role !== 'ADMIN') {
    return <div className="text-sm text-gray-500">Admin access required</div>;
  }

  async function loadUsers() {
    setLoading(true);
    try {
      const data = await adminService.getAllUsers(token);
      setUsers(data);
    } catch (err) {
      console.error('Failed loading users:', err);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (token) loadUsers();
  }, [token]);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Admin Panel</h3>

      {loading && <div className="text-gray-500 text-sm mb-2">Loading users…</div>}

      {!loading && users.length === 0 && (
        <div className="text-gray-500 text-sm">No users found</div>
      )}

      <div className="space-y-2">
        {users.map((u) => (
          <UserRow
            key={u.id}
            user={u}
            refresh={loadUsers}
          />
        ))}
      </div>
    </div>
  );
}
