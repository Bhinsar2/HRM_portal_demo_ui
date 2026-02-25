import { useState } from "react";

// Mock announcements – replace with API (e.g. getAnnouncements()) when backend is ready
const MOCK_POSTS = [
  {
    id: 1,
    title: "Office closed on Monday",
    body: "The office will remain closed on Monday, 2nd March for maintenance. Work from home if possible.",
    date: "2025-02-20",
    type: "policy",
    icon: "fa-bullhorn",
  },
  {
    id: 2,
    title: "New leave policy update",
    body: "Annual leave quota has been updated to 18 days per year. Check your leave balance in the dashboard.",
    date: "2025-02-18",
    type: "policy",
    icon: "fa-file-alt",
  },
  {
    id: 3,
    title: "Team meet-up this Friday",
    body: "Join us for the monthly team meet-up in the cafeteria at 4 PM. Snacks on us!",
    date: "2025-02-15",
    type: "event",
    icon: "fa-calendar-check",
  },
  {
    id: 4,
    title: "HR portal maintenance",
    body: "Scheduled maintenance on Sunday 11 PM – 2 AM. You may not be able to apply for leave during that window.",
    date: "2025-02-14",
    type: "system",
    icon: "fa-tools",
  },
];

const formatDate = (d) => {
  const date = new Date(d);
  const now = new Date();
  const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return `${diff} days ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const Announcements = ({ posts = MOCK_POSTS, title = "Announcements & posts", limit = 4 }) => {
  const [items] = useState(posts.slice(0, limit));

  return (
    <div className="dashboard-widget announcements-widget">
      <div className="dashboard-widget-header">
        <h3><i className="fas fa-bullhorn"></i> {title}</h3>
      </div>
      <div className="dashboard-widget-body">
        {items.length === 0 ? (
          <p className="dashboard-widget-empty">No announcements</p>
        ) : (
          <ul className="announcements-list">
            {items.map((post) => (
              <li key={post.id} className="announcement-item">
                <div className="announcement-icon">
                  <i className={`fas ${post.icon || "fa-bullhorn"}`}></i>
                </div>
                <div className="announcement-content">
                  <h4 className="announcement-title">{post.title}</h4>
                  <p className="announcement-body">{post.body}</p>
                  <span className="announcement-date">{formatDate(post.date)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Announcements;
