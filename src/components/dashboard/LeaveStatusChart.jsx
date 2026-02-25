import { useEffect, useState } from "react";
import { viewLeaves } from "../../http";

const LeaveStatusChart = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ Pending: 0, Approved: 0, Rejected: 0 });

  useEffect(() => {
    (async () => {
      try {
        const res = await viewLeaves({});
        const list = res?.data || [];
        const next = { Pending: 0, Approved: 0, Rejected: 0 };
        list.forEach((app) => {
          const s = app.adminResponse || "Pending";
          if (next[s] !== undefined) next[s]++;
        });
        setStats(next);
      } catch {
        setStats({ Pending: 0, Approved: 0, Rejected: 0 });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const total = stats.Pending + stats.Approved + stats.Rejected;
  const data = [
    { label: "Pending", value: stats.Pending, color: "#d97706", class: "badge-warning" },
    { label: "Approved", value: stats.Approved, color: "#059669", class: "badge-success" },
    { label: "Rejected", value: stats.Rejected, color: "#dc2626", class: "badge-danger" },
  ];

  return (
    <div className="dashboard-widget dashboard-chart-card">
      <div className="dashboard-widget-header">
        <h3><i className="fas fa-file-alt"></i> Leave applications</h3>
      </div>
      <div className="dashboard-widget-body">
        {loading ? (
          <div className="dashboard-widget-loading">
            <div className="shimmer" style={{ height: 24, marginBottom: 12 }} />
            <div className="shimmer" style={{ height: 24, marginBottom: 12 }} />
            <div className="shimmer" style={{ height: 24 }} />
          </div>
        ) : total === 0 ? (
          <p className="dashboard-widget-empty">No leave applications yet</p>
        ) : (
          <div className="leave-status-list">
            {data.map(({ label, value, color, class: cls }) => (
              <div key={label} className="leave-status-row">
                <span className={`badge-custom ${cls}`}>{label}</span>
                <div className="leave-status-bar-wrap">
                  <div
                    className="leave-status-bar"
                    style={{
                      width: `${total ? (value / total) * 100 : 0}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
                <span className="leave-status-value">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveStatusChart;
