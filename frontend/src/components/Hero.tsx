import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Hero() {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, login } = useAuth();
  const navigate = useNavigate();

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 py-24 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Animated blobs */}
      <motion.div
        className="absolute top-20 -left-32 w-96 h-96 bg-violet-200 rounded-full blur-3xl opacity-30"
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 -right-32 w-80 h-80 bg-fuchsia-200 rounded-full blur-3xl opacity-30"
        animate={{ scale: [1.2, 1, 1.2], x: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <motion.div
        className="max-w-4xl mx-auto text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            Now available
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
        >
          All Your Tools.
          <br />
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">
            One Platform.
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto"
        >
          Manage leads, track proofing jobs, and analyze your business performance — 
          all from a single, powerful dashboard built for marketing agencies.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setShowLogin(true)}
            className="px-8 py-4 rounded-full bg-gray-900 text-white font-semibold text-lg hover:bg-gray-800 transition-all hover:scale-105"
          >
            Get Started
          </button>
          <button className="px-8 py-4 rounded-full bg-white border border-gray-200 text-gray-700 font-semibold text-lg hover:bg-gray-50 transition-all hover:scale-105">
            Learn More
          </button>
        </motion.div>

        <motion.p variants={itemVariants} className="mt-8 text-sm text-gray-400">
          Free 14-day trial • No credit card required
        </motion.p>
      </motion.div>

      {/* Login Modal */}
      {showLogin && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowLogin(false)}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Welcome back</h2>
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:outline-none transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}