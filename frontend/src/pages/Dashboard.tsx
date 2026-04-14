import { useEffect, useState } from 'react';
import { dashboard } from '../api/client';

interface Stats {
  total_leads: number;
  leads_by_status: Record<string, number>;
  total_proof_jobs: number;
  proof_by_status: Record<string, number>;
  user_role: string;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboard
      .getStats()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;

  const leadStatusLabels: Record<string, string> = {
    new: 'New',
    contacted: 'Contacted',
    qualified: 'Qualified',
    proposal: 'Proposal',
    won: 'Won',
    lost: 'Lost',
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Leads</h2>
          <p className="text-3xl font-bold">{stats?.total_leads || 0}</p>
          <div className="mt-4 space-y-2">
            {Object.entries(stats?.leads_by_status || {}).map(([status, count]) => (
              <div key={status} className="flex justify-between">
                <span>{leadStatusLabels[status] || status}</span>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Proof Jobs</h2>
          <p className="text-3xl font-bold">{stats?.total_proof_jobs || 0}</p>
          <div className="mt-4 space-y-2">
            {Object.entries(stats?.proof_by_status || {}).map(([status, count]) => (
              <div key={status} className="flex justify-between">
                <span className="capitalize">{status.replace('_', ' ')}</span>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}