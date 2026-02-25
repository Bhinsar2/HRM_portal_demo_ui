import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { getUser } from "../../http";

const Employee = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    image: "",
    address: "",
    status: "",
    username: "",
  });

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const res = await getUser(id);
      if (res.success) setUser(res.data);
    })();
  }, [id]);

  const statusClass =
    user.status === "Active"
      ? "badge-success"
      : user.status === "Inactive"
      ? "badge-danger"
      : "badge-neutral";

  return (
    <div className="main-content">
      <div className="page-header">
        <div>
          <h2>Employee details</h2>
          <p>View and manage this employee</p>
        </div>
        <NavLink to={`/edituser/${id}`} className="btn btn-primary" style={{ textDecoration: "none" }}>
          <i className="fas fa-pen" style={{ marginRight: 6 }}></i> Edit user
        </NavLink>
      </div>

      <div className="content-section">
        <div className="detail-card">
          <div className="detail-card-body">
            <img
              className="detail-card-avatar"
              src={
                user.image ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&size=128`
              }
              alt={user.name}
            />
            <div className="detail-card-meta">
              <table>
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>{user.name || "—"}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{user.email || "—"}</td>
                  </tr>
                  <tr>
                    <th>Username</th>
                    <td>{user.username || "—"}</td>
                  </tr>
                  <tr>
                    <th>Mobile</th>
                    <td>{user.mobile || "—"}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>{user.address || "—"}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>
                      <span className={`badge-custom ${statusClass}`}>
                        {user.status || "—"}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
