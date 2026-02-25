import { useMemo } from "react";

const HeadcountChart = ({ counts = {} }) => {
  const { employee = 0, leader = 0, admin = 0, team = 0 } = counts;
  const data = useMemo(
    () => [
      { label: "Employees", value: employee, color: "var(--primary)" },
      { label: "Leaders", value: leader, color: "var(--success)" },
      { label: "Admins", value: admin, color: "var(--warning)" },
      { label: "Teams", value: team, color: "var(--info)" },
    ],
    [employee, leader, admin, team]
  );
  const max = useMemo(
    () => Math.max(1, ...data.map((d) => d.value)),
    [data]
  );

  return (
    <div className="dashboard-widget dashboard-chart-card">
      <div className="dashboard-widget-header">
        <h3><i className="fas fa-chart-bar"></i> Headcount overview</h3>
      </div>
      <div className="dashboard-widget-body">
        <div className="bar-chart">
          {data.map(({ label, value, color }) => (
            <div key={label} className="bar-chart-row">
              <span className="bar-chart-label">{label}</span>
              <div className="bar-chart-track">
                <div
                  className="bar-chart-fill"
                  style={{
                    width: `${(value / max) * 100}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
              <span className="bar-chart-value">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeadcountChart;
