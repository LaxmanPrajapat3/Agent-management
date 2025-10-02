import React, { useEffect, useState } from 'react';
import { getAssignments } from '../services/uploadService';
import { getAgents } from '../services/agentService';
import AgentCard from '../components/AgentCard';

export default function Dashboard(){
  const [assignments, setAssignments] = useState([]);
  const [agents, setAgents] = useState([]);

  const fetch = async () => {
    const [as, ags] = await Promise.all([getAssignments(), getAgents()]);
    setAssignments(as);
    setAgents(ags);
  };

  useEffect(()=> { fetch(); }, []);

  // compute count per agent
  const counts = {};
  assignments.forEach(a => {
    counts[a.agent._id] = (counts[a.agent._id] || 0) + a.entries.length;
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {agents.map(agent => <AgentCard key={agent._id} agent={agent} count={counts[agent._id] || 0} />)}
      </div>

      <div>
        <h3 className="font-semibold mb-2">Recent Assignments</h3>
        <div className="space-y-3">
          {assignments.map(a => (
            <div key={a._id} className="bg-white p-3 rounded shadow">
              <div className="flex justify-between">
                <div><strong>{a.agent.name}</strong> ({a.agent.email})</div>
                <div className="text-sm">{a.entries.length} items</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
