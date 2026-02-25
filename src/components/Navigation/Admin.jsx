import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { dLogout } from "../../http";
import { setAuth } from "../../store/auth-slice";

const Admin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = async () => {
    await dLogout();
    dispatch(setAuth(null));
    return history.push('/login');
  };

  return (
    <ul className="sidebar-menu" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      <li><NavLink className="nav-link" to="/home"><i className="fas fa-th-large"></i> <span>Dashboard</span></NavLink></li>
      <li><NavLink className="nav-link" to="/employees"><i className="fas fa-users"></i> <span>Employees</span></NavLink></li>
      <li><NavLink className="nav-link" to="/leaders"><i className="fas fa-user-tie"></i> <span>Leaders</span></NavLink></li>
      <li><NavLink className="nav-link" to="/admins"><i className="fas fa-users-cog"></i> <span>Admins</span></NavLink></li>
      <li><NavLink className="nav-link" to="/teams"><i className="fas fa-layer-group"></i> <span>Teams</span></NavLink></li>
      <li><NavLink className="nav-link" to="/attendance"><i className="fas fa-calendar-check"></i> <span>Attendance</span></NavLink></li>
      <li><NavLink className="nav-link" to="/leaves"><i className="fas fa-file-alt"></i> <span>Leaves</span></NavLink></li>
      <li><NavLink className="nav-link" to="/assignSalary"><i className="fas fa-pen-nib"></i> <span>Assign Salary</span></NavLink></li>
      <li><NavLink className="nav-link" to="/salaries"><i className="fas fa-wallet"></i> <span>Salaries</span></NavLink></li>

      <li className="menu-header">Manage</li>
      <li><NavLink className="nav-link" to="/adduser"><i className="fas fa-user-plus"></i> <span>Add User</span></NavLink></li>
      <li><NavLink className="nav-link" to="/addteam"><i className="fas fa-plus-circle"></i> <span>Add Team</span></NavLink></li>

      <li className="menu-header">Account</li>
      <li>
        <NavLink className="nav-link nav-link-logout" to="/home" onClick={logout}>
          <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default Admin;