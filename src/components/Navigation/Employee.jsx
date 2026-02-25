import { NavLink } from "react-router-dom";
import { dLogout } from "../../http";
import { setAuth } from "../../store/auth-slice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Employee = () => {
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
      <li><NavLink className="nav-link" to="/userTeams"><i className="fas fa-layer-group"></i> <span>Team</span></NavLink></li>
      <li><NavLink className="nav-link" to="/userAttendance"><i className="fas fa-calendar-check"></i> <span>Attendance</span></NavLink></li>
      <li><NavLink className="nav-link" to="/applyforleave"><i className="fas fa-pen-nib"></i> <span>Apply For Leave</span></NavLink></li>
      <li><NavLink className="nav-link" to="/userLeaveApplications"><i className="fas fa-file-alt"></i> <span>Leave Applications</span></NavLink></li>
      <li><NavLink className="nav-link" to="/userSalary"><i className="fas fa-wallet"></i> <span>Salary</span></NavLink></li>

      <li className="menu-header">Account</li>
      <li>
        <NavLink onClick={logout} className="nav-link nav-link-logout" to="/home">
          <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default Employee;