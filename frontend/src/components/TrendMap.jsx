import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function TrendMap({ data }) {
  return (
    <div className="card">
      <h3>Inorganic Activity Volume</h3>
      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="hour" stroke="#9a9db0" />
            <YAxis stroke="#9a9db0" />
            <Tooltip />
            <Area type="monotone" dataKey="organic" stroke="#22d3a5" fill="#22d3a522" />
            <Area type="monotone" dataKey="bot" stroke="#f5605b" fill="#f5605b22" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
