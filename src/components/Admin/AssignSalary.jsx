import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assignSalary, getEmployees, getLeaders } from "../../http";

const AssignSalary = () => {
  const initialState = { salary: '', bonus: '', reasonForBonus: '' };
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const emps = await getEmployees();
      const leaders = await getLeaders();
      setEmployees([...emps.data, ...leaders.data]);
    })();
  }, []);

  const inputEvent = (e) => {
    const { name, value } = e.target;
    setFormData(old => ({ ...old, [name]: value }));
    if (errors[name]) setErrors(old => ({ ...old, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!selectedEmployee) errs.employee = 'Please select an employee.';
    if (!formData.salary) errs.salary = 'Salary is required.';
    if (!formData.bonus) errs.bonus = 'Bonus is required.';
    if (!formData.reasonForBonus) errs.reasonForBonus = 'Reason is required.';
    return errs;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      const payload = { ...formData, employeeID: selectedEmployee };
      const res = await assignSalary(payload);
      if (res.success) {
        toast.success('Salary assigned successfully!');
        setFormData(initialState);
        setSelectedEmployee('');
        setErrors({});
      } else {
        toast.error(res.message || 'Failed to assign salary.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="page-header">
        <div>
          <h2>Assign Salary</h2>
          <p>Set salary and bonus details for an employee or leader</p>
        </div>
      </div>

      <div className="form-card" style={{ maxWidth: 720 }}>
        <div className="form-card-title">Salary Details</div>
        <form onSubmit={onSubmit}>
          <div className="row">
            {/* Employee selector */}
            <div className="col-md-12 form-group">
              <label className="form-label-modern">Employee / Leader</label>
              <select
                className={`form-control${errors.employee ? ' is-invalid' : ''}`}
                value={selectedEmployee}
                onChange={(e) => { setSelectedEmployee(e.target.value); if (errors.employee) setErrors(o => ({ ...o, employee: '' })); }}
              >
                <option value="">— Select employee —</option>
                {employees.map(emp => (
                  <option key={emp._id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
              {errors.employee && <div className="field-error"><i className="fas fa-exclamation-circle"></i> {errors.employee}</div>}
            </div>

            {/* Salary */}
            <div className="col-md-6 form-group">
              <label className="form-label-modern">Salary (₹)</label>
              <input
                onChange={inputEvent}
                value={formData.salary}
                type="number"
                name="salary"
                placeholder="e.g. 50000"
                className={`form-control${errors.salary ? ' is-invalid' : ''}`}
                min="0"
              />
              {errors.salary && <div className="field-error"><i className="fas fa-exclamation-circle"></i> {errors.salary}</div>}
            </div>

            {/* Bonus */}
            <div className="col-md-6 form-group">
              <label className="form-label-modern">Bonus (₹)</label>
              <input
                onChange={inputEvent}
                value={formData.bonus}
                type="number"
                name="bonus"
                placeholder="e.g. 5000"
                className={`form-control${errors.bonus ? ' is-invalid' : ''}`}
                min="0"
              />
              {errors.bonus && <div className="field-error"><i className="fas fa-exclamation-circle"></i> {errors.bonus}</div>}
            </div>

            {/* Reason */}
            <div className="col-md-12 form-group">
              <label className="form-label-modern">Reason for Bonus</label>
              <input
                onChange={inputEvent}
                value={formData.reasonForBonus}
                type="text"
                name="reasonForBonus"
                placeholder="e.g. Q1 performance bonus"
                className={`form-control${errors.reasonForBonus ? ' is-invalid' : ''}`}
              />
              {errors.reasonForBonus && <div className="field-error"><i className="fas fa-exclamation-circle"></i> {errors.reasonForBonus}</div>}
            </div>

            {/* Submit */}
            <div className="col-md-12 form-group" style={{ marginTop: 8 }}>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
                style={{ padding: '10px 28px', fontWeight: 600 }}
              >
                {loading ? <><i className="fas fa-spinner fa-spin" style={{ marginRight: 6 }}></i>Assigning...</> : 'Assign Salary'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignSalary;
