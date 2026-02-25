import { useEffect, useState } from 'react';
import { getEmployees, getLeaders, viewLeaves } from '../../http';
import { useHistory } from "react-router-dom";

const statusBadge = (status) => {
  const map = { Approved: 'badge-success', Rejected: 'badge-danger', Pending: 'badge-warning' };
  return <span className={`badge-custom ${map[status] || 'badge-neutral'}`}>{status || '—'}</span>;
};

const LeaveView = () => {
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [appliedDate, setAppliedDate] = useState('');
  const [applications, setApplications] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [employeeMap, setEmployeeMap] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    const init = async () => {
      try {
        const [res, emps, leaders] = await Promise.all([viewLeaves({}), getEmployees(), getLeaders()]);
        const empObj = {};
        emps.data.forEach(e => empObj[e.id] = [e.name, e.email]);
        leaders.data.forEach(l => empObj[l.id] = [l.name, l.email]);
        setEmployeeMap(empObj);
        setEmployees([...emps.data, ...leaders.data]);
        setApplications(res.data || []);
      } catch {
        setError('Failed to load leave applications.');
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const search = async () => {
    setLoading(true);
    setError('');
    const obj = {};
    if (selectedEmployee) obj.applicantID = selectedEmployee;
    if (type) obj.type = type;
    if (status) obj.adminResponse = status;
    if (appliedDate) obj.appliedDate = appliedDate;
    try {
      const res = await viewLeaves(obj);
      setApplications(res.data || []);
    } catch {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="page-header">
        <div>
          <h2>Leave Applications</h2>
          <p>Browse and filter all employee leave requests</p>
        </div>
      </div>

      <div className="data-card">
        {/* Filter bar */}
        <div className="filter-bar">
          <div className="form-group">
            <label className="form-label-modern">Employee</label>
            <select className="form-control" value={selectedEmployee} onChange={e => setSelectedEmployee(e.target.value)}>
              <option value="">All Employees</option>
              {employees.map(e => <option key={e._id} value={e.id}>{e.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label-modern">Leave Type</label>
            <select className="form-control" value={type} onChange={e => setType(e.target.value)}>
              <option value="">All Types</option>
              <option>Sick Leave</option>
              <option>Casual Leave</option>
              <option>Emergency Leave</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label-modern">Status</label>
            <select className="form-control" value={status} onChange={e => setStatus(e.target.value)}>
              <option value="">All Statuses</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label-modern">Applied Date</label>
            <input type="date" className="form-control" value={appliedDate} onChange={e => setAppliedDate(e.target.value)} />
          </div>
          <button onClick={search} className="btn btn-primary" style={{ padding: '9px 20px', fontWeight: 600, alignSelf: 'flex-end' }}>
            <i className="fas fa-search" style={{ marginRight: 6 }}></i>Search
          </button>
        </div>

        {error && (
          <div style={{ padding: '14px 22px', background: '#ffe4e6', color: '#be123c', fontSize: '13.5px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <i className="fas fa-exclamation-circle"></i> {error}
          </div>
        )}

        <div className="data-card-header" style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
          <h3><i className="fas fa-file-alt" style={{ marginRight: 8, color: 'var(--primary)' }}></i> Applications</h3>
          {applications && <span className="badge-custom badge-info">{applications.length} records</span>}
        </div>

        {loading ? (
          <div style={{ padding: '32px 22px' }}>
            {[...Array(5)].map((_, i) => <div key={i} className="shimmer" style={{ height: 44, marginBottom: 8 }} />)}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Employee</th>
                  <th>Type</th>
                  <th>Title</th>
                  <th>Applied Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {applications?.length === 0 ? (
                  <tr><td colSpan="6">
                    <div className="empty-state">
                      <i className="fas fa-file-times"></i>
                      <p>No leave applications found</p>
                    </div>
                  </td></tr>
                ) : (
                  applications?.map((app, idx) => (
                    <tr key={app._id || idx} className="clickable" onClick={() => history.push(`leaves/${app._id}`)}>
                      <td style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{idx + 1}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{employeeMap?.[app.applicantID]?.[0] || '—'}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{employeeMap?.[app.applicantID]?.[1] || ''}</div>
                      </td>
                      <td><span className="badge-custom badge-neutral">{app.type}</span></td>
                      <td>{app.title}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{app.appliedDate}</td>
                      <td>{statusBadge(app.adminResponse)}</td>
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

export default LeaveView;
