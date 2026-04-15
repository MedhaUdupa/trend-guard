export default function BotScore({ bots }) {
  return (
    <div className="card">
      <h3>Bot Score Meter</h3>
      <ul className="list">
        {bots.map((bot) => (
          <li key={bot.handle} className="list-item">
            <span>{bot.handle}</span>
            <strong>{Math.round(bot.score * 100)}%</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
