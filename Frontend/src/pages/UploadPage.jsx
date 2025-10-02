import React, { useState } from 'react';
import { uploadFile, getAssignments } from '../services/uploadService';

export default function UploadPage(){
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [assignments, setAssignments] = useState([]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage('Choose a file');
    setMessage('Uploading...');
    try {
      const res = await uploadFile(file);
      setMessage(`Uploaded: ${res.totalEntries} entries distributed to ${res.agentsUsed} agents.`);
      // fetch latest assignments
      const as = await getAssignments();
      setAssignments(as);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Upload failed');
    }
  };

  const fetchAssignments = async () => {
    try {
      const as = await getAssignments();
      setAssignments(as);
    } catch(err){
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Upload CSV / XLSX</h2>
      <form onSubmit={handleUpload} className="bg-white p-4 rounded shadow mb-4">
        <input type="file" accept=".csv,.xlsx,.xls" onChange={e=>setFile(e.target.files[0])} />
        <div className="mt-3">
          <button type="submit" className="bg-slate-800 text-white px-4 py-2 rounded">Upload & Distribute</button>
          <button type="button" onClick={fetchAssignments} className="ml-3 border px-3 py-2 rounded">Refresh Assignments</button>
        </div>
        {message && <div className="mt-2 text-sm">{message}</div>}
      </form>

      <div>
        <h3 className="font-semibold mb-2">Assignments</h3>
        {assignments.length === 0 && <div>No assignments. Upload a file or refresh.</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {assignments.map(a => (
            <div key={a._id} className="bg-white p-3 rounded shadow">
              <div className="font-semibold">{a.agent.name} ({a.agent.email})</div>
              <div className="text-sm mb-2">Entries: {a.entries.length}</div>
              <div className="space-y-1 max-h-40 overflow-auto text-sm">
                {a.entries.map(e => (
                  <div key={e._id} className="border-b pb-1">
                    <div><strong>{e.firstName}</strong> - {e.phone}</div>
                    <div className="text-xs text-slate-600">{e.notes}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
