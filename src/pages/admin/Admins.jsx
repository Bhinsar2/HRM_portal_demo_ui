import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import RowAdmin from "../../components/rows/row-admin";
import { getAdmins } from "../../http";

const AdminsPage = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getAdmins();
        if (res.success) setUsers(res.data || []);
        else setError(res.message || "Failed to load admins.");
      } catch {
        setError("Network error — could not fetch admins.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="main-content">
      <div className="page-header">
        <div>
          <h2>Admins</h2>
          <p>Manage administrator accounts</p>
        </div>
      </div>

      <div className="data-card">
        <div className="data-card-header">
          <h3>
            <i className="fas fa-users-cog" style={{ marginRight: 8, color: "var(--primary)" }}></i>
            All Admins
          </h3>
          {!loading && <span className="badge-custom badge-info">{users.length} total</span>}
        </div>

        {error && (
          <div className="data-card-alert data-card-alert--error">
            <i className="fas fa-exclamation-circle"></i> {error}
          </div>
        )}

        {loading ? (
          <div style={{ padding: "32px 22px" }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="shimmer" style={{ height: 52, marginBottom: 10 }} />
            ))}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
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
                        <i className="fas fa-users-cog"></i>
                        <p>No admins found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((data, index) => (
                    <RowAdmin key={data.id || index} index={index + 1} data={data} />
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

export default AdminsPage;
