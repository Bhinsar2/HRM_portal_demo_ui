import { useMemo } from "react";

// Build upcoming birthdays from a list of people. If dob is available use it; else use mock dates from names for demo.
const getUpcomingBirthdays = (people = [], limit = 5) => {
  const now = new Date();
  const thisYear = now.getFullYear();
  const result = [];

  people.forEach((p) => {
    let month, day;
    if (p.dob) {
      const d = new Date(p.dob);
      month = d.getMonth();
      day = d.getDate();
    } else if (p.birthday) {
      const d = new Date(p.birthday);
      month = d.getMonth();
      day = d.getDate();
    } else {
      // Mock: derive a consistent day from name hash so same person always same day
      const hash = (p.name || "").split("").reduce((a, c) => a + c.charCodeAt(0), 0);
      month = hash % 12;
      day = (hash % 28) + 1;
    }
    const bday = new Date(thisYear, month, day);
    if (bday < now) bday.setFullYear(thisYear + 1);
    result.push({
      name: p.name || "Unknown",
      date: bday,
      day: bday.getDate(),
      month: bday.toLocaleString("en-US", { month: "short" }),
            key: p.id || p._id || p.name + month + day,
    });
  });

  result.sort((a, b) => a.date - b.date);
  return result.slice(0, limit);
};

const BirthdayReminder = ({ people = [], title = "Upcoming birthdays", limit = 5 }) => {
  const upcoming = useMemo(() => getUpcomingBirthdays(people, limit), [people, limit]);

  return (
    <div className="dashboard-widget birthday-widget">
      <div className="dashboard-widget-header">
        <h3><i className="fas fa-birthday-cake"></i> {title}</h3>
      </div>
      <div className="dashboard-widget-body">
        {upcoming.length === 0 ? (
          <p className="dashboard-widget-empty">No upcoming birthdays</p>
        ) : (
          <ul className="birthday-list">
            {upcoming.map(({ name, day, month, key }) => (
              <li key={key} className="birthday-item">
                <span className="birthday-date">{day} {month}</span>
                <span className="birthday-name">{name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BirthdayReminder;
