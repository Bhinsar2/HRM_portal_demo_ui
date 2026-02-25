import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMembers_Leader } from "../../http";
import LeavesRemainingCard from "./LeavesRemainingCard";
import BirthdayReminder from "./BirthdayReminder";
import Announcements from "./Announcements";

const Leader = () => {
  const { user } = useSelector((state) => state.authSlice);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await getMembers_Leader();
        if (mounted && res?.data) setTeamMembers(res.data);
      } catch {
        if (mounted) setTeamMembers([]);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <div className="profile-card">
            <div className="profile-card-banner"></div>
            <div className="profile-card-body">
              <div className="profile-avatar-wrap">
                <img
                  src={user?.image || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.name || "User")}
                  alt={user?.name}
                  className="profile-avatar"
                />
              </div>
              <h3 className="profile-name">{user?.name}</h3>
              <span className="profile-role">{user?.type}</span>
              <div className="profile-meta-grid">
                <div className="profile-meta-item">
                  <div className="profile-meta-label">Username</div>
                  <div className="profile-meta-value">{user?.username || "—"}</div>
                </div>
                <div className="profile-meta-item">
                  <div className="profile-meta-label">Email</div>
                  <div className="profile-meta-value">{user?.email}</div>
                </div>
                <div className="profile-meta-item">
                  <div className="profile-meta-label">Mobile</div>
                  <div className="profile-meta-value">{user?.mobile || "—"}</div>
                </div>
                <div className="profile-meta-item">
                  <div className="profile-meta-label">Status</div>
                  <div className="profile-meta-value">
                    <span className={`badge-custom ${user?.status === "Active" ? "badge-success" : "badge-neutral"}`}>
                      {user?.status || "—"}
                    </span>
                  </div>
                </div>
                <div className="profile-meta-item" style={{ gridColumn: "1 / -1" }}>
                  <div className="profile-meta-label">Address</div>
                  <div className="profile-meta-value">{user?.address || "—"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8 col-md-12">
          <div className="dashboard-widgets-row">
            <LeavesRemainingCard />
            <BirthdayReminder people={teamMembers} title="Team birthdays" limit={5} />
          </div>
          <Announcements title="Announcements & posts" limit={3} />
        </div>
      </div>
    </>
  );
};

export default Leader;
