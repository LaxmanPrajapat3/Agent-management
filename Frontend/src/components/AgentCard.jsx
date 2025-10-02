import React from 'react';

export default function AgentCard({ agent, count }) {
  return (
    <div className="border rounded p-3 bg-white">
      <div className="font-semibold">{agent.name}</div>
      <div className="text-sm">{agent.email}</div>
      <div className="text-sm">Mobile: {agent.mobile}</div>
      <div className="mt-2 text-xs text-slate-600">Assigned: {count ?? 0}</div>
    </div>
  );
}
