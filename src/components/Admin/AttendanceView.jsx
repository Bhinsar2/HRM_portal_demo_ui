import { useEffect, useState } from 'react';
import { getAttendance, getEmployees, getLeaders } from '../../http';

const YEARS = [2022, 2023, 2024, 2025, 2026];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTH_DAYS = { January: 31, February: 28, March: 31, April: 30, May: 31, June: 30, July: 31, August: 31, September: 30, October: 31, November: 30, December: 31 };

const statusBadge = (present) =>
  present
    ? <span className="badge-custom badge-success">Present</span>
    : <span className="badge-custom badge-neutral">Absent</span>;

const AttendanceView = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [attendance, setAttendance] = useState(null);
  const [employeeMap, setEmployeeMap] = useState({});
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const days = selectedMonth
    ? Array.from({ length: MONTH_DAYS[selectedMonth] }, (_, i) => i + 1)
    : [];

  useEffect(() => {
    const dt = new Date();
    const init = { year: dt.getFullYear(), month: dt.getMonth() + 1, date: dt.getDate() };

    const fetchAll = async () => {
      try {
        const [res, emps, leaders] = await Promise.all([
          getAttendance(init),
          getEmployees(),
          getLeaders(),
        ]);
        const empObj = {};
        emps.data.forEach(e => empObj[e.id] = [e.name, e.email]);
        leaders.data.forEach(l => empObj[l.id] = [l.name, l.email]);
        setEmployeeMap(empObj);
        setEmployees([...emps.data, ...leaders.data]);
        setAttendance(res.data || []);
      } catch {
        setError('Failed to load attendance data.');
        setAttendance([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const search = async () => {
    setLoading(true);
    setError('');
    const obj = {};
    if (selectedEmployee) obj.employeeID = selectedEmployee;
    if (selectedYear) obj.year = selectedYear;
    if (selectedMonth) obj.month = MONTHS.indexOf(selectedMonth) + 1;
    if (selectedDay) obj.date = selectedDay;
    try {
      const res = await getAttendance(obj);
      setAttendance(res.data || []);
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
          <h2>Attendance</h2>
          <p>View and filter attendance records</p>
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
            <label className="form-label-modern">Year</label>
            <select className="form-control" value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
              <option value="">All Years</option>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label-modern">Month</label>
            <select className="form-control" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
              <option value="">All Months</option>
              {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label-modern">Day</label>
            <select className="form-control" value={selectedDay} onChange={e => setSelectedDay(e.target.value)} disabled={!selectedMonth}>
              <option value="">All Days</option>
              {days.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
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

        {loading ? (
          <div style={{ padding: '32px 22px' }}>
            {[...Array(6)].map((_, i) => <div key={i} className="shimmer" style={{ height: 44, marginBottom: 8 }} />)}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Day</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance?.length === 0 ? (
                  <tr><td colSpan="6">
                    <div className="empty-state">
                      <i className="fas fa-calendar-times"></i>
                      <p>No attendance records found</p>
                    </div>
                  </td></tr>
                ) : (
                  attendance?.map((rec, idx) => (
                    <tr key={idx}>
                      <td style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{idx + 1}</td>
                      <td>{employeeMap?.[rec.employeeID]?.[0] || '—'}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{employeeMap?.[rec.employeeID]?.[1] || '—'}</td>
                      <td>{`${rec.date}/${rec.month}/${rec.year}`}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{rec.day}</td>
                      <td>{statusBadge(rec.present)}</td>
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

export default AttendanceView;
