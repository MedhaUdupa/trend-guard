export default function AlertFeed({ alerts, connected }) {
  return (
    <div className="card">
      <h3>Live Alerts {connected ? "· connected" : "· reconnecting"}</h3>
      <ul className="list">
        {alerts.map((alert) => (
          <li key={alert.id} className="list-item">
            <span>{alert.keyword}</span>
            <strong>{Math.round(alert.score * 100)}%</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
