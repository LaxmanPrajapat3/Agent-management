import React, { useState, useEffect } from 'react';
import { getAgents, createAgent, deleteAgent } from '../services/agentService';

export default function Agents(){
  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '' });
  const [error, setError] = useState('');

  const fetchAgents = async () => {
    try {
      const res = await getAgents();
      setAgents(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=> {
    fetchAgents();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.mobile || !form.password) return setError('All fields required');
    try {
      await createAgent(form);
      setForm({ name: '', email: '', mobile: '', password: '' });
      fetchAgents();
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating agent');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete agent?')) return;
    await deleteAgent(id);
    fetchAgents();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2">
        <h2 className="text-lg font-semibold mb-2">Agents</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {agents.map(a => (
            <div key={a._id} className="bg-white p-3 rounded shadow">
              <div className="font-medium">{a.name}</div>
              <div className="text-sm">{a.email}</div>
              <div className="text-sm">{a.mobile}</div>
              <div className="mt-2">
                <button onClick={()=>handleDelete(a._id)} className="text-red-600 text-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Create Agent</h3>
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        <form onSubmit={submit} className="space-y-2">
          <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full border p-2 rounded" />
          <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full border p-2 rounded" />
          <input placeholder="+91XXXXXXXXXX" value={form.mobile} onChange={e=>setForm({...form,mobile:e.target.value})} className="w-full border p-2 rounded" />
          <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="w-full border p-2 rounded" />
          <button className="w-full bg-slate-800 text-white p-2 rounded">Create</button>
        </form>
      </div>
    </div>
  );
}
