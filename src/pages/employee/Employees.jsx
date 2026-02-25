import { useEffect, useState } from "react";
import { getEmployees } from "../../http";
import { NavLink } from "react-router-dom";

const statusBadge = (status) => {
  if (!status) return <span className="badge-custom badge-neutral">—</span>;
  const map = {
    Active: 'badge-success',
    Inactive: 'badge-danger',
    Pending: 'badge-warning',
  };
  return <span className={`badge-custom ${map[status] || 'badge-neutral'}`}>{status}</span>;
};

const Employees = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await getEmployees();
        if (res.success) {
          setUsers(res.data);
        } else {
          setError(res.message || 'Failed to load employees.');
        }
      } catch {
        setError('Network error — could not fetch employees.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="main-content">
      <div className="page-header">
        <div>
          <h2>Employees</h2>
          <p>All registered employees in your organization</p>
        </div>
      </div>

      <div className="data-card">
        <div className="data-card-header">
          <h3><i className="fas fa-users" style={{ marginRight: 8, color: 'var(--primary)' }}></i> All Employees</h3>
          <span className="badge-custom badge-info">{users.length} total</span>
        </div>

        {error && (
          <div className="data-card-alert data-card-alert--error">
            <i className="fas fa-exclamation-circle"></i> {error}
          </div>
        )}

        {loading ? (
          <div style={{ padding: "32px 22px" }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="shimmer" style={{ height: 48, marginBottom: 10, borderRadius: 8 }} />
            ))}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Employee</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="6">
                      <div className="empty-state">
                        <i className="fas fa-users-slash"></i>
                        <p>No employees found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((u, idx) => (
                    <tr key={u.id || idx}>
                      <td style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{idx + 1}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          {/* <img
                            src={u.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&size=64`}
                            alt={u.name}
                            className="avatar-sm"
                          /> */}
                          <div>
                            <div style={{ fontWeight: 600, color: 'var(--text)' }}>{u.name}</div>
                            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{u.username}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ color: 'var(--text-muted)' }}>{u.email}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{u.mobile || '—'}</td>
                      <td>{statusBadge(u.status)}</td>
                      <td>
                        <NavLink
                          to={`/employee/${u.id}`}
                          style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}
                        >
                          View <i className="fas fa-arrow-right" style={{ fontSize: 11 }}></i>
                        </NavLink>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employees;