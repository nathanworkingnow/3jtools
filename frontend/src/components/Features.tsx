import { motion } from 'framer-motion';

const features = [
  {
    icon: '🎯',
    title: 'Lead Management',
    description: 'Track and manage your sales pipeline with ease. Push leads directly to Trello with one click.',
  },
  {
    icon: '📝',
    title: 'Proofing',
    description: 'Upload designs, collect client feedback, and get approvals — all in one streamlined workflow.',
  },
  {
    icon: '📊',
    title: 'Analytics',
    description: 'Real-time insights into your business performance and team productivity metrics.',
  },
  {
    icon: '🔗',
    title: 'Trello Sync',
    description: 'Automatic two-way sync with Trello. Cards move automatically as lead status changes.',
  },
  {
    icon: '👥',
    title: 'Team Management',
    description: 'Assign leads to team members, track their progress, and manage permissions.',
  },
  {
    icon: '⚡',
    title: 'Fast & Secure',
    description: 'Built with modern tech for speed. Enterprise-grade security with JWT authentication.',
  },
];

export default function Features() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything you need to run your agency
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Powerful tools designed specifically for marketing agencies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-violet-200 hover:shadow-lg transition-all duration-300 group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}