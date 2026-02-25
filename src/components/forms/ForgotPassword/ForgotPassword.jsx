import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setEmail } from "../../../store/auth-slice";
import { forgotPassword } from "../../../http";
import { toast } from "react-toastify";

const ForgotPassword = ({ onNext }) => {
    const dispatch = useDispatch();
    const storeEmail = useSelector((state) => state.authSlice.email);
    const [emailAddress, setEmailAddress] = useState(storeEmail);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!emailAddress) return;
        const res = await forgotPassword({ email: emailAddress });
        if (res.success) {
            toast.success(res.message);
            dispatch(setEmail(emailAddress));
            onNext();
        } else {
            toast.error(res.message);
        }
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
                    <h1>Forgot Password?</h1>
                    <p>Enter your email and we'll send you an OTP to reset your password</p>
                </div>

                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label className="auth-form-label" htmlFor="email">Email address</label>
                        <input
                            id="email"
                            onChange={(e) => setEmailAddress(e.target.value)}
                            value={emailAddress}
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="you@company.com"
                            tabIndex="1"
                            required
                            autoFocus
                        />
                    </div>

                    <button type="submit" className="btn btn-primary auth-submit-btn" tabIndex="2">
                        Send OTP
                    </button>
                </form>

                <div className="auth-footer" style={{ justifyContent: 'center', borderTop: 'none', marginTop: '12px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                        Remember your password?{' '}
                        <a href="/login" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
                            Sign in
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;