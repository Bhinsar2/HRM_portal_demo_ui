import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { dLogout } from "../http";
import { setAuth } from "../store/auth-slice";

const Navigation = ({ toggleSidebar }) => {
    const { name} = useSelector((state) => state.authSlice.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const logout = async () => {
        await dLogout();
        dispatch(setAuth(null));
        return history.push('/login');
    };

    return (
        <>
            <div className="navbar-bg"></div>
            <nav className="navbar navbar-expand-lg main-navbar">
                {/* Left: hamburger + search */}
                <form className="form-inline mr-auto" style={{ gap: '8px' }}>
                    <ul className="navbar-nav mr-3" style={{ gap: '4px' }}>
                        <li>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleSidebar();
                                }}
                                className="nav-link nav-link-lg"
                                style={{ display: 'flex', alignItems: 'center', padding: '4px 10px', borderRadius: '8px' }}
                            >
                                <i className="fas fa-bars" style={{ fontSize: '16px' }}></i>
                            </a>
                        </li>
                    </ul>
                    {/* <div className="search-element" style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                        <div style={{ position: 'relative' }}>

                            <input
                                className="form-control"
                                type="search"
                                placeholder="Search..."
                                aria-label="Search"
                                style={{ paddingLeft: '36px ', width: '220px', borderRadius: '20px' }}
                            />
                        </div>
                    </div> */}
                </form>

                {/* Right: notifications + user */}
                <ul className="navbar-nav navbar-right" style={{ gap: '8px', alignItems: 'center' }}>
                    {/* Bell
                    <li className="dropdown dropdown-list-toggle">
                        <a
                            href="#"
                            data-toggle="dropdown"
                            className="nav-link notification-toggle nav-link-lg"
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                width: '38px', height: '38px', borderRadius: '50%',
                                background: 'var(--bg)', border: '1.5px solid var(--border)',
                                position: 'relative'
                            }}
                        >
                            <i className="far fa-bell" style={{ fontSize: '16px', color: 'var(--text-muted)' }}></i>
                            <span style={{
                                position: 'absolute', top: '7px', right: '8px',
                                width: '7px', height: '7px', borderRadius: '50%',
                                background: 'var(--primary)', border: '2px solid #fff'
                            }}></span>
                        </a>

                        <div className="dropdown-menu dropdown-list dropdown-menu-right">
                            <div className="dropdown-header" style={{ padding: '14px 16px', fontWeight: 700, fontSize: '13px', color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>
                                Notifications
                                <div className="float-right">
                                    <NavLink to="/" style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 500 }}>Mark all read</NavLink>
                                </div>
                            </div>
                            <div className="dropdown-list-content dropdown-list-icons" style={{ maxHeight: '280px', overflowY: 'auto' }}>
                                <NavLink to="/" className="dropdown-item dropdown-item-unread">
                                    <div className="dropdown-item-icon bg-primary text-white"><i className="fas fa-code"></i></div>
                                    <div className="dropdown-item-desc">Template update is available now!<div className="time text-primary">2 Min Ago</div></div>
                                </NavLink>
                                <NavLink to="/" className="dropdown-item">
                                    <div className="dropdown-item-icon bg-success text-white"><i className="fas fa-check"></i></div>
                                    <div className="dropdown-item-desc">Task <b>Fix bug header</b> moved to <b>Done</b><div className="time">12 Hours Ago</div></div>
                                </NavLink>
                            </div>
                            <div className="dropdown-footer text-center" style={{ padding: '10px', borderTop: '1px solid var(--border)' }}>
                                <NavLink to="/" style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 500 }}>View All <i className="fas fa-chevron-right" style={{ fontSize: '10px' }}></i></NavLink>
                            </div>
                        </div>
                    </li> */}

                    {/* User dropdown */}
                    <li className="dropdown" style={{ marginLeft: '4px',gap: '8px !important', }}>

                        <img
                            alt="avatar"
                            src={"/assets/icons/user.png"}
                            className="rounded-circle"
                            style={{ width: '30px', height: '30px', objectFit: 'cover' }}
                        />
                        {/* <span className="d-none d-lg-inline-block" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>
                            {name}
                        </span> */}
                        {/* <i className="fas fa-chevron-down d-none d-lg-inline-block" style={{ fontSize: '10px', color: 'var(--text-muted)' }}></i> */}


                        {/* <div className="dropdown-menu dropdown-menu-right" style={{ minWidth: '200px' }}>
                            <div style={{ padding: '12px 16px 10px', borderBottom: '1px solid var(--border)' }}>
                                <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text)' }}>{name}</div>
                                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>Logged in just now</div>
                            </div>
                            <NavLink to="/profile" className="dropdown-item has-icon" style={{ padding: '10px 16px', fontSize: '13.5px' }}>
                                <i className="far fa-user" style={{ marginRight: '8px', color: 'var(--text-muted)', width: '16px' }}></i> Profile
                            </NavLink>
                            <NavLink to="/settings" className="dropdown-item has-icon" style={{ padding: '10px 16px', fontSize: '13.5px' }}>
                                <i className="fas fa-cog" style={{ marginRight: '8px', color: 'var(--text-muted)', width: '16px' }}></i> Settings
                            </NavLink>
                            <div className="dropdown-divider"></div>
                            <NavLink
                                to="/"
                                onClick={logout}
                                className="dropdown-item has-icon"
                                style={{ padding: '10px 16px', fontSize: '13.5px', color: 'var(--danger)' }}
                            >
                                <i className="fas fa-sign-out-alt" style={{ marginRight: '8px', width: '16px' }}></i> Logout
                            </NavLink>
                        </div> */}
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Navigation;