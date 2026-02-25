import { NavLink } from "react-router-dom";

const statusBadge = (status) => {
  const map = { Active: "badge-success", Inactive: "badge-danger", Pending: "badge-warning" };
  return (
    <span className={`badge-custom ${map[status] || "badge-neutral"}`}>{status || "—"}</span>
  );
};

const RowAdmin = ({ index, data }) => {
  return (
    <tr>
      <td style={{ color: "var(--text-muted)", fontWeight: 600 }}>{index}</td>
      <td>
        <div style={{ fontWeight: 600, color: "var(--text)" }}>{data.name}</div>
      </td>
      <td style={{ color: "var(--text-muted)" }}>{data.email}</td>
      <td style={{ color: "var(--text-muted)" }}>{data.mobile || "—"}</td>
      <td>{statusBadge(data.status)}</td>
      <td>
        <NavLink
          to={`/admin/${data.id}`}
          style={{
            color: "var(--primary)",
            fontWeight: 600,
            fontSize: 13,
            textDecoration: "none",
          }}
        >
          View <i className="fas fa-arrow-right" style={{ fontSize: 11 }}></i>
        </NavLink>
      </td>
    </tr>
  );
};

export default RowAdmin;
