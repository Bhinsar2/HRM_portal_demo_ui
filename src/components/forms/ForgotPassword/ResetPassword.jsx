import { useState } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { resetPassword } from "../../../http/index";
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

const ResetPassword = () => {
    const { email } = useSelector((state) => state.authSlice);
    const [formData, setFormData] = useState({ email: email, otp: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();

    const inputEvent = (e) => {
        const { name, value } = e.target;
        setFormData((old) => ({ ...old, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const { email, otp, password } = formData;
        if (!email || !otp || !password) return toast.error('All Fields Required');
        const res = await resetPassword({ email, otp, password });
        res.success ? toast.success(res.message) : toast.error(res.message);
        if (res.success) history.push('/login');
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                {/* Brand */}
                <div className="auth-logo-wrap">
                    <img
                        src="https://www.pockethrms.com/wp-content/uploads/2022/01/Happy-Workforce.jpg"
                        alt="HRM Logo"
                    />
                    <h1>Reset Password</h1>
                    <p>Enter the OTP sent to your email and choose a new password</p>
                </div>

                <form onSubmit={onSubmit}>
                    {/* Email (read-only) */}
                    <div className="form-group">
                        <label className="auth-form-label" htmlFor="email">Email address</label>
                        <input
                            id="email"
                            onChange={inputEvent}
                            value={formData.email}
                            type="email"
                            className="form-control"
                            name="email"
                            tabIndex="1"
                            required
                            readOnly
                            style={{ background: 'var(--bg)', color: 'var(--text-muted)', cursor: 'not-allowed' }}
                        />
                    </div>

                    {/* OTP */}
                    <div className="form-group">
                        <label className="auth-form-label" htmlFor="otp">OTP Code</label>
                        <input
                            id="otp"
                            onChange={inputEvent}
                            value={formData.otp}
                            type="number"
                            className="form-control"
                            name="otp"
                            placeholder="Enter OTP"
                            tabIndex="2"
                            required
                        />
                    </div>

                    {/* New Password with Eye Toggle */}
                    <div className="form-group">
                        <label className="auth-form-label" htmlFor="password">New Password</label>
                        <div className="auth-input-wrap">
                            <input
                                id="password"
                                onChange={inputEvent}
                                value={formData.password}
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                name="password"
                                placeholder="••••••••"
                                tabIndex="3"
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

                    <button type="submit" className="btn btn-primary auth-submit-btn" tabIndex="4">
                        Reset Password
                    </button>
                </form>

                <div className="auth-footer" style={{ justifyContent: 'center', borderTop: 'none', marginTop: '12px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                        Back to{' '}
                        <a href="/login" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
                            Sign in
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;