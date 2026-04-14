import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Landing() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
    } catch {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] dark:bg-[#0a0a0f] bg-[#f8f9fa] transition-colors duration-500">
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-4 flex justify-between items-center backdrop-blur-xl bg-[#0a0a0f]/80 dark:bg-[#0a0a0f]/80 bg-[#f8f9fa]/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">3J</span>
          </div>
          <span className="text-white dark:text-white text-gray-900 font-semibold text-xl">3J Full House</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-10 h-10 rounded-full bg-white/10 dark:bg-white/10 bg-gray-200 flex items-center justify-center hover:scale-110 transition-transform"
          >
            {darkMode ? (
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm-.707 10.607a1 1 0 001.414 1.414l.707-.707a1 1 0 00-1.414-1.414l-.707.707zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          <button
            onClick={() => setShowLogin(true)}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium hover:opacity-90 transition-opacity"
          >
            Login
          </button>
        </div>
      </nav>

      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowLogin(false)}>
          <div className="bg-[#111118] dark:bg-[#111118] bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-white dark:text-white text-gray-900 mb-6">Welcome Back</h2>
            <form onSubmit={handleSubmit}>
              {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">{error}</div>}
              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white dark:text-white text-gray-900 focus:border-violet-500 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white dark:text-white text-gray-900 focus:border-violet-500 focus:outline-none transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      )}

      <section className="pt-32 pb-20 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-white/10 bg-gray-200 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-sm text-gray-300 dark:text-gray-300 text-gray-600">Now Available</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white dark:text-white text-gray-900 mb-6 leading-tight">
            All Your Tools.<br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              One Platform.
            </span>
          </h1>
          <p className="text-xl text-gray-400 dark:text-gray-400 text-gray-600 mb-10 max-w-2xl mx-auto">
            Manage leads, track proofing jobs, and analyze your business performance — all from a single, beautiful dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowLogin(true)}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold text-lg hover:scale-105 transition-transform"
            >
              Get Started
            </button>
            <button className="px-8 py-4 rounded-full bg-white/10 dark:bg-white/10 bg-gray-200 text-white dark:text-white text-gray-900 font-semibold text-lg hover:scale-105 transition-transform">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🎯', title: 'Lead Management', desc: 'Track and manage your sales pipeline with ease. Push directly to Trello.' },
              { icon: '📝', title: 'Proofing', desc: 'Upload designs, collect feedback, and get approvals — all in one place.' },
              { icon: '📊', title: 'Analytics', desc: 'Real-time insights into your business performance and team productivity.' },
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/5 dark:bg-white/5 bg-white border border-white/10 dark:border-white/10 hover:border-violet-500/50 transition-colors group">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white dark:text-white text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-400 dark:text-gray-400 text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-8 bg-white/5 dark:bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-white text-gray-900 mb-6">
            Ready to transform your workflow?
          </h2>
          <p className="text-lg text-gray-400 dark:text-gray-400 text-gray-600 mb-8">
            Join hundreds of agencies already using 3J Full House.
          </p>
          <button
            onClick={() => setShowLogin(true)}
            className="px-10 py-4 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold text-lg hover:scale-105 transition-transform"
          >
            Get Started Free
          </button>
        </div>
      </section>

      <footer className="py-8 px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <span className="text-white font-bold">3J</span>
            </div>
            <span className="text-gray-500">© 2026 3J Full House</span>
          </div>
          <div className="flex gap-6 text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}