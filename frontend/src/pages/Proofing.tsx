import { useEffect, useState } from 'react';
import { proofing } from '../api/client';

interface ProofJob {
  id: number;
  title: string;
  client_name: string;
  status: string;
  created_by_name: string;
  due_date: string | null;
  created_at: string;
  versions: ProofVersion[];
}

interface ProofVersion {
  id: number;
  version_number: number;
  file_url: string;
  uploaded_by_name: string;
  created_at: string;
}

interface ProofComment {
  id: number;
  author_name: string;
  text: string;
  x_position: number | null;
  y_position: number | null;
  created_at: string;
}

const STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'in_review', label: 'In Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

export default function Proofing() {
  const [jobs, setJobs] = useState<ProofJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showVersions, setShowVersions] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    status: 'draft',
    due_date: '',
  });

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const data = await proofing.listJobs();
      setJobs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await proofing.createJob(formData);
      setShowForm(false);
      setFormData({ title: '', client: '', status: 'draft', due_date: '' });
      loadJobs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await proofing.updateJob(id, { status });
      loadJobs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleVersionSubmit = async (jobId: number) => {
    const fileUrl = prompt('Enter file URL:');
    if (!fileUrl) return;
    try {
      const job = jobs.find((j) => j.id === jobId);
      const versionNumber = (job?.versions.length || 0) + 1;
      await proofing.createVersion(jobId, {
        version_number: versionNumber,
        file_url: fileUrl,
      });
      loadJobs();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Proofing Jobs</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : 'New Job'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Client (ID)</label>
              <input
                type="number"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full p-2 border rounded"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <input
                type="date"
                value={formData.due_date}
                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Create Job
          </button>
        </form>
      )}

      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-gray-500">{job.client_name}</p>
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={job.status}
                  onChange={(e) => handleStatusChange(job.id, e.target.value)}
                  className="p-2 border rounded"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleVersionSubmit(job.id)}
                  className="text-blue-600 hover:underline"
                >
                  Add Version
                </button>
                <button
                  onClick={() => setShowVersions(showVersions === job.id ? null : job.id)}
                  className="text-gray-600 hover:underline"
                >
                  {showVersions === job.id ? 'Hide' : 'Show'} Versions
                </button>
              </div>
            </div>

            {showVersions === job.id && job.versions.length > 0 && (
              <div className="mt-4 border-t pt-4">
                <h4 className="font-medium mb-2">Versions</h4>
                {job.versions.map((version) => (
                  <div key={version.id} className="ml-4 p-3 bg-gray-50 rounded mb-2">
                    <div className="flex justify-between">
                      <span>v{version.version_number}</span>
                      <a
                        href={version.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600"
                      >
                        View File
                      </a>
                    </div>
                    <p className="text-sm text-gray-500">
                      Uploaded by {version.uploaded_by_name} on{' '}
                      {new Date(version.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {jobs.length === 0 && (
          <div className="text-center text-gray-500">No proof jobs yet</div>
        )}
      </div>
    </div>
  );
}