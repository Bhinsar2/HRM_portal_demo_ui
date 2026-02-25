import { useState } from "react";

import { doLogin } from "../../http";
import { useDispatch } from "react-redux";
import { setAuth } from '../../store/auth-slice';
import { toast } from "react-toastify";

// Eye Open Icon
const EyeOpen = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

// Eye Closed Icon
const EyeClosed = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a10.005 10.005 0 012.187-3.679M6.53 6.53A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.006 10.006 0 01-4.272 5.328M6.53 6.53L3 3m3.53 3.53l10.94 10.94M17.47 17.47L21 21" />
  </svg>
);

const LoginForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const inputEvent = (e) => {
    const { name, value } = e.target;
    setFormData((old) => ({ ...old, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) return toast.error('All Fields Required');
    const res = await doLogin({ email, password });
    const { success } = res;
    if (success) dispatch(setAuth(res.user));
    else toast.error(res.message|| "Network error");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Logo / Brand */}
        <div className="auth-logo-wrap">
          <img
            src="https://www.pockethrms.com/wp-content/uploads/2022/01/Happy-Workforce.jpg"
            alt="HRM Logo"
          />
          <h1>Welcome back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} noValidate>
          <div className="form-group">
            <label className="auth-form-label" htmlFor="email">Email address</label>
            <input
              id="email"
              onChange={inputEvent}
              value={formData.email}
              type="email"
              className="form-control"
              name="email"
              placeholder="you@company.com"
              tabIndex="1"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <div className="field-row-header">
              <label className="auth-form-label" style={{ margin: 0 }} htmlFor="password">Password</label>
              {/* <NavLink to="/forgot" className="auth-link">Forgot password?</NavLink> */}
            </div>
            <div className="auth-input-wrap">
              <input
                id="password"
                onChange={inputEvent}
                value={formData.password}
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="password"
                placeholder="••••••••"
                tabIndex="2"
                required
              />
              <button
                type="button"
                className="eye-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeClosed /> : <EyeOpen />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary auth-submit-btn" tabIndex="3">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;