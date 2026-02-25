import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { viewLeaveApplications } from "../../http";

const ANNUAL_QUOTA = 18; // Configurable; could come from API later

const LeavesRemainingCard = () => {
  const { user } = useSelector((state) => state.authSlice);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (!user?.id) return;
    (async () => {
      try {
        const res = await viewLeaveApplications({ applicantID: user.id });
        setApplications(res?.data || []);
      } catch {
        setApplications([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.id]);

  const currentYear = String(new Date().getFullYear());
  const approvedThisYear = applications.filter((a) => {
    if (a.adminResponse !== "Approved") return false;
    const dateStr = a.startDate || a.appliedDate || "";
    return dateStr.includes(currentYear);
  }).length;
  const pendingCount = applications.filter((a) => a.adminResponse === "Pending" || !a.adminResponse).length;
  const remaining = Math.max(0, ANNUAL_QUOTA - approvedThisYear);

  return (
    <div className="dashboard-widget leaves-remaining-card">
      <div className="dashboard-widget-header">
        <h3><i className="fas fa-umbrella-beach"></i> Leave balance</h3>
      </div>
      <div className="dashboard-widget-body">
        {loading ? (
          <div className="dashboard-widget-loading">
            <div className="shimmer" style={{ height: 48, marginBottom: 12 }} />
            <div className="shimmer" style={{ height: 32 }} />
          </div>
        ) : (
          <>
            <div className="leaves-remaining-main">
              <span className="leaves-remaining-value">{remaining}</span>
              <span className="leaves-remaining-label">days remaining</span>
            </div>
            <div className="leaves-remaining-meta">
              <span>Annual quota: {ANNUAL_QUOTA} days</span>
              <span>Used this year: {approvedThisYear} days</span>
              {pendingCount > 0 && (
                <span className="leaves-pending">{pendingCount} application(s) pending</span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LeavesRemainingCard;
