import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTeams } from "../../http";
import { setTeam } from "../../store/team-slice";
import { setTeamMembers } from "../../store/user-slice";

const statusBadge = (status) => {
  const map = { Active: 'badge-success', Inactive: 'badge-danger' };
  return <span className={`badge-custom ${map[status] || 'badge-neutral'}`}>{status || '—'}</span>;
};

const Teams = () => {
  const dispatch = useDispatch();
  dispatch(setTeam(null));
  dispatch(setTeamMembers(null));

  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await getTeams();
        if (res.success) setTeams(res.data);
        else setError(res.message || 'Failed to load teams.');
      } catch {
        setError('Network error — could not fetch teams.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="main-content">
      <div className="page-header">
        <div>
          <h2>Teams</h2>
          <p>All teams in your organization</p>
        </div>
        <NavLink to="/addteam" className="btn btn-primary" style={{ fontWeight: 600, textDecoration: 'none' }}>
          <i className="fas fa-plus" style={{ marginRight: 6 }}></i> New Team
        </NavLink>
      </div>

      <div className="data-card">
        <div className="data-card-header">
          <h3><i className="fas fa-layer-group" style={{ marginRight: 8, color: 'var(--primary)' }}></i> All Teams</h3>
          {!loading && <span className="badge-custom badge-info">{teams.length} total</span>}
        </div>

        {error && (
          <div className="data-card-alert data-card-alert--error">
            <i className="fas fa-exclamation-circle"></i> {error}
          </div>
        )}

        {loading ? (
          <div style={{ padding: '32px 22px' }}>
            {[...Array(4)].map((_, i) => <div key={i} className="shimmer" style={{ height: 52, marginBottom: 10 }} />)}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {teams.length === 0 ? (
                  <tr><td colSpan="4">
                    <div className="empty-state">
                      <i className="fas fa-layer-group"></i>
                      <p>No teams found</p>
                    </div>
                  </td></tr>
                ) : (
                  teams.map((team, idx) => (
                    <tr key={team.id || idx}>
                      <td style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{idx + 1}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          {/* <img
                            src={team.image || '/assets/icons/team.png'}
                            alt={team.name}
                            style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover', border: '1px solid var(--border)' }}
                          /> */}
                          <div>
                            <div style={{ fontWeight: 600 }}>{team.name}</div>
                            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{team.description}</div>
                          </div>
                        </div>
                      </td>
                      <td>{statusBadge(team.status)}</td>
                      <td>
                        <NavLink
                          to={`/team/${team.id}`}
                          style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}
                        >
                          View <i className="fas fa-arrow-right" style={{ fontSize: 11 }}></i>
                        </NavLink>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;