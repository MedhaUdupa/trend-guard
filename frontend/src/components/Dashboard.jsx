import { useLiveData } from "../hooks/useWebSocket";

const TRENDS = [
  { keyword: "#AIGenerated", volume: "48.2K", risk: "high", score: 87 },
  { keyword: "#BreakingNews", volume: "32.1K", risk: "high", score: 79 },
  { keyword: "#ElectionFraud", volume: "21.7K", risk: "high", score: 74 },
  { keyword: "#CryptoMoon", volume: "19.4K", risk: "medium", score: 51 },
  { keyword: "#TechNews", volume: "14.8K", risk: "medium", score: 44 },
  { keyword: "#ClimateAction", volume: "9.3K", risk: "low", score: 18 },
];

const BOTS = [
  { handle: "@n3ws_b0t_911", flags: "new_account · superhuman_rate", score: 94 },
  { handle: "@info_spreader", flags: "high_text_sim · no_followers", score: 81 },
  { handle: "@crypto_signal99", flags: "extreme_follow_ratio", score: 67 },
  { handle: "@user_8842991", flags: "incomplete_profile", score: 52 },
];

const PLATFORMS = [
  { name: "Twitter/X", posts: "148K posts", pct: 62 },
  { name: "Reddit", posts: "51K posts", pct: 21 },
  { name: "Facebook", posts: "29K posts", pct: 12 },
  { name: "Mastodon", posts: "12K posts", pct: 5 },
];

export default function Dashboard() {
  const { data, connected } = useLiveData("/live");
  const alerts = data.slice(0, 4);

  return (
    <div className="tg-layout">
      <aside className="tg-sidebar">
        <div className="tg-logo">⬡ TrendGuard</div>
        <div className="tg-nav-group">Monitor</div>
        <div className="tg-nav-item active">Overview</div>
        <div className="tg-nav-item">Live Stream</div>
        <div className="tg-nav-item">Trend Map</div>
        <div className="tg-nav-group">Detect</div>
        <div className="tg-nav-item">Bot Accounts</div>
        <div className="tg-nav-item">Coordinated</div>
        <div className="tg-nav-item">Misinformation</div>
        <div className="tg-nav-group">System</div>
        <div className="tg-nav-item">CI/CD Pipeline</div>
        <div className="tg-nav-item">Data Validation</div>
        <div className="tg-nav-item">Model Drift</div>
      </aside>

      <main className="tg-main">
        <header className="tg-topbar">
          <div>
            <h1>TrendGuard Dashboard</h1>
            <p>Overview Dashboard · live data integrity monitoring</p>
          </div>
          <span className={`tg-pill ${connected ? "ok" : "warn"}`}>
            {connected ? "LIVE CONNECTED" : "RECONNECTING"}
          </span>
        </header>

        <section className="tg-metrics">
          <article className="tg-card metric">
            <h3>Trends Tracked</h3>
            <strong>2,847</strong>
            <small>+14.2% vs yesterday</small>
          </article>
          <article className="tg-card metric">
            <h3>Inorganic Flagged</h3>
            <strong>312</strong>
            <small>+22.1% spike detected</small>
          </article>
          <article className="tg-card metric">
            <h3>Bot Score Accuracy</h3>
            <strong>94.7%</strong>
            <small>Stable · no drift</small>
          </article>
          <article className="tg-card metric">
            <h3>Data Validated</h3>
            <strong>1.2M</strong>
            <small>3 GE checkpoints passed</small>
          </article>
        </section>

        <section className="tg-grid-two">
          <article className="tg-card">
            <h2>Active Trends</h2>
            <table className="tg-table">
              <thead>
                <tr>
                  <th>Keyword</th>
                  <th>Volume</th>
                  <th>Risk</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {TRENDS.map((row) => (
                  <tr key={row.keyword}>
                    <td>{row.keyword}</td>
                    <td>{row.volume}</td>
                    <td>
                      <span className={`risk ${row.risk}`}>{row.risk}</span>
                    </td>
                    <td>
                      <div className="bar">
                        <div style={{ width: `${row.score}%` }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>

          <article className="tg-card">
            <h2>Live Alerts</h2>
            <ul className="feed">
              {alerts.length === 0 && <li>No live alerts yet</li>}
              {alerts.map((alert) => (
                <li key={alert.id}>
                  <span>{alert.keyword}</span>
                  <strong>{Math.round((alert.score ?? 0) * 100)}%</strong>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="tg-grid-two">
          <article className="tg-card">
            <h2>Bot Score Meter</h2>
            <ul className="feed">
              {BOTS.map((bot) => (
                <li key={bot.handle}>
                  <div>
                    <div>{bot.handle}</div>
                    <small>{bot.flags}</small>
                  </div>
                  <strong>{bot.score}%</strong>
                </li>
              ))}
            </ul>
          </article>

          <article className="tg-card">
            <h2>Platform Breakdown</h2>
            <ul className="feed">
              {PLATFORMS.map((platform) => (
                <li key={platform.name}>
                  <div>
                    <div>{platform.name}</div>
                    <small>{platform.posts}</small>
                  </div>
                  <strong>{platform.pct}%</strong>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </main>
    </div>
  );
}
