import { useState } from "react";
import { toast } from "react-toastify";
import { addTeam } from "../../http";

const AddTeam = () => {
    const initialState = { name: '', description: '', image: '' };
    const [imagePreview, setImagePreview] = useState('/assets/icons/team.png');
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const inputEvent = (e) => {
        const { name, value } = e.target;
        setFormData(old => ({ ...old, [name]: value }));
        if (errors[name]) setErrors(o => ({ ...o, [name]: '' }));
    };

    const validate = () => {
        const errs = {};
        if (!formData.name) errs.name = 'Team name is required.';
        if (!formData.description) errs.description = 'Description is required.';
        return errs;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setLoading(true);
        try {
            console.log("Creating Team Data (JSON):", formData);
            const res = await addTeam(formData);
            if (res.success) {
                toast.success(res.message || 'Team created!');
                setFormData({ ...initialState });
                setImagePreview('/assets/icons/team.png');
                setErrors({});
            } else {
                toast.error(res.message || 'Failed to create team.');
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
                    <h2>Add Team</h2>
                    <p>Create a new team in your organization</p>
                </div>
            </div>

            <div className="form-card" style={{ maxWidth: 580 }}>
                <div className="form-card-title">Team Details</div>
                <form onSubmit={onSubmit}>
                    {/* Image preview */}
                    <div className="form-group text-center">
                        <div style={{ display: 'inline-block' }}>
                            <img
                                src={imagePreview}
                                alt="Team"
                                style={{ width: 100, height: 100, borderRadius: 12, objectFit: 'cover', border: '1px solid var(--border)', background: 'var(--bg-alt)' }}
                            />
                        </div>
                    </div>

                    {/* Team Name */}
                    <div className="form-group">
                        <label className="form-label-modern">Team Name</label>
                        <input
                            onChange={inputEvent}
                            value={formData.name}
                            type="text"
                            name="name"
                            placeholder="e.g. Engineering Team"
                            className={`form-control${errors.name ? ' is-invalid' : ''}`}
                        />
                        {errors.name && <div className="field-error"><i className="fas fa-exclamation-circle"></i> {errors.name}</div>}
                    </div>

                    {/* Description */}
                    <div className="form-group">
                        <label className="form-label-modern">Description</label>
                        <input
                            onChange={inputEvent}
                            value={formData.description}
                            type="text"
                            name="description"
                            placeholder="e.g. Handles product development"
                            className={`form-control${errors.description ? ' is-invalid' : ''}`}
                        />
                        {errors.description && <div className="field-error"><i className="fas fa-exclamation-circle"></i> {errors.description}</div>}
                    </div>

                    <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={loading}
                        style={{ padding: '10px 28px', fontWeight: 600 }}
                    >
                        {loading ? <><i className="fas fa-spinner fa-spin" style={{ marginRight: 6 }}></i>Creating...</> : 'Create Team'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTeam;