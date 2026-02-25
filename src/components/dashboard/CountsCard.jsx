const CountsCard = ({ title, icon, count, color = 'indigo' }) => {
  return (
    <div className="col-lg-3 col-md-6 col-sm-6 col-12">
      <div className="stat-card">
        <div className={`stat-icon ${color}`}>
          <i className={`fas ${icon}`}></i>
        </div>
        <div>
          <div className="stat-label">{title}</div>
          <div className="stat-value">{count ?? '—'}</div>
        </div>
      </div>
    </div>
  );
};

export default CountsCard;