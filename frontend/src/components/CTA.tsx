import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-violet-50">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Ready to transform your agency?
        </h2>
        <p className="text-xl text-gray-500 mb-8">
          Join hundreds of marketing agencies already using 3J Full House.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full border border-gray-200 focus:border-violet-500 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-full bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-all hover:scale-105"
            >
              Get Started
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 bg-green-50 rounded-2xl"
          >
            <p className="text-green-800 font-semibold">Thanks! We'll be in touch soon.</p>
          </motion.div>
        )}

        <p className="mt-6 text-sm text-gray-400">
          Free 14-day trial • No credit card required • Cancel anytime
        </p>
      </motion.div>
    </section>
  );
}