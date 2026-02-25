import { useSelector } from "react-redux";
import Admin from "./Admin";
import Employee from "./Employee";
import Leader from "./Leader";

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
};

const Dashboard = () => {
  const { user } = useSelector((state) => state.authSlice);
  const isAdmin = user?.type === "Admin";
  const isLeader = user?.type === "Leader";

  return (
    <div className="main-content dashboard-page">
      <header className="page-header">
        <div>
          <h2>
            {isAdmin
              ? "Dashboard"
              : `${getGreeting()}, ${user?.name?.split(" ")[0] || user?.name || "User"}`}
          </h2>
          <p>
            {isAdmin
              ? "Overview of your organization"
              : "Your profile and activity summary"}
          </p>
        </div>
        {!isAdmin && (
          <span className="dashboard-date">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        )}
      </header>

      {isAdmin ? (
        <Admin />
      ) : isLeader ? (
        <Leader />
      ) : (
        <Employee />
      )}
    </div>
  );
};

export default Dashboard;
