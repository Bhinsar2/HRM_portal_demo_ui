import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getCounts, getEmployees, getLeaders } from "../../http";
import { setCount } from "../../store/main-slice";
import CountsCard from "./CountsCard";
import HeadcountChart from "./HeadcountChart";
import LeaveStatusChart from "./LeaveStatusChart";
import BirthdayReminder from "./BirthdayReminder";
import Announcements from "./Announcements";

const Admin = () => {
  const dispatch = useDispatch();
  const { counts } = useSelector((state) => state.mainSlice);
  const [birthdayPeople, setBirthdayPeople] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getCounts();
      if (res.success) dispatch(setCount(res.data));
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      try {
        const [empRes, leadRes] = await Promise.all([getEmployees(), getLeaders()]);
        const employees = empRes?.data || [];
        const leaders = leadRes?.data || [];
        setBirthdayPeople([...employees, ...leaders]);
      } catch {
        setBirthdayPeople([]);
      }
    })();
  }, []);

  return (
    <>
      <section className="dashboard-stats">
        <div className="row">
          <CountsCard title="Total Employees" icon="fa-users" count={counts?.employee ?? 0} color="indigo" />
          <CountsCard title="Total Leaders" icon="fa-user-tie" count={counts?.leader ?? 0} color="emerald" />
          <CountsCard title="Total Admins" icon="fa-users-cog" count={counts?.admin ?? 0} color="amber" />
          <CountsCard title="Total Teams" icon="fa-layer-group" count={counts?.team ?? 0} color="sky" />
        </div>
      </section>

      <div className="dashboard-widgets-row">
        <HeadcountChart counts={counts} />
        <LeaveStatusChart />
      </div>

      <div className="dashboard-widgets-row-3">
        <BirthdayReminder people={birthdayPeople} title="Upcoming birthdays" limit={5} />
        <Announcements title="Announcements & posts" limit={4} />
        <div className="dashboard-widget">
          <div className="dashboard-widget-header">
            <h3><i className="fas fa-link"></i> Quick actions</h3>
          </div>
          <div className="dashboard-widget-body">
            <ul className="birthday-list" style={{ border: 'none' }}>
              <li className="birthday-item">
                <NavLink to="/employees" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>View all employees</NavLink>
              </li>
              <li className="birthday-item">
                <NavLink to="/leaves" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Review leave applications</NavLink>
              </li>
              <li className="birthday-item">
                <NavLink to="/attendance" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>View attendance</NavLink>
              </li>
              <li className="birthday-item">
                <NavLink to="/adduser" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Add new user</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
