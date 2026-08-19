import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/common/Spinner';
import { adminUsers } from '../../services/hotelApi';
import { formatDate } from '../../utils/format';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    adminUsers()
      .then((data) => setUsers(data.users || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      <h1 className="font-serif text-4xl text-forest">Clients</h1>
      {error && <p className="mt-4 text-rose-700">{error}</p>}
      <div className="mt-6 overflow-x-auto rounded-2xl bg-white ring-1 ring-mist">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-sand text-pine">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t border-mist">
                <td className="px-4 py-3 font-medium">{u.name}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3">{u.phone || '—'}</td>
                <td className="px-4 py-3">{formatDate(u.createdAt)}</td>
                <td className="px-4 py-3 text-right">
                  <Link to={`/admin/users/${u._id}`} className="text-gold-dark underline">
                    History
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
