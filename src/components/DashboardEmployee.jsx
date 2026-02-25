import { useSelector } from 'react-redux';

const DashboardEmployee = () => {
  const { user } = useSelector(state => state.authSlice);

  return (
    <div className="main-content">
      <div className="page-header">
        <div>
          <h2>👋 Welcome, {user?.name}</h2>
          <p>Your profile and account summary</p>
        </div>
      </div>

      <div className="profile-card">
        <div className="profile-card-banner"></div>
        <div className="profile-card-body">
          <div className="profile-avatar-wrap">
            <img
              src={user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&size=128`}
              alt={user?.name}
              className="profile-avatar"
            />
          </div>
          <h3 className="profile-name">{user?.name}</h3>
          <span className="profile-role">{user?.type}</span>

          <div className="profile-meta-grid">
            <div className="profile-meta-item">
              <div className="profile-meta-label">Username</div>
              <div className="profile-meta-value">{user?.username || '—'}</div>
            </div>
            <div className="profile-meta-item">
              <div className="profile-meta-label">Email</div>
              <div className="profile-meta-value">{user?.email}</div>
            </div>
            <div className="profile-meta-item">
              <div className="profile-meta-label">Mobile</div>
              <div className="profile-meta-value">{user?.mobile || '—'}</div>
            </div>
            <div className="profile-meta-item">
              <div className="profile-meta-label">Status</div>
              <div className="profile-meta-value">
                <span className={`badge-custom ${user?.status === 'Active' ? 'badge-success' : 'badge-neutral'}`}>
                  {user?.status || '—'}
                </span>
              </div>
            </div>
            <div className="profile-meta-item" style={{ gridColumn: '1 / -1' }}>
              <div className="profile-meta-label">Address</div>
              <div className="profile-meta-value">{user?.address || '—'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEmployee;
