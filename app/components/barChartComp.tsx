'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'DSA', score: 80 },
  { name: 'System Design', score: 65 },
  { name: 'Behavioral', score: 90 },
];

const BarChartComp = () => {
  return (
    <div className="h-64 bg-gray-900 rounded-xl p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Bar dataKey="score" fill="#00ffcc" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComp;
