import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'How does the Trello integration work?',
    answer: 'When you create or update a lead in 3J Full House, it automatically syncs to your Trello board. The card moves to the correct list based on the lead status — no manual work needed.',
  },
  {
    question: 'Can I invite my team members?',
    answer: 'Yes! Invite as many team members as you need. Each user gets their own login with role-based access (admin, manager, sales, or designer).',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use enterprise-grade security with JWT authentication, encrypted connections, and your data is stored in secure PostgreSQL databases.',
  },
  {
    question: 'Can I export my data?',
    answer: 'Yes, you can export all your leads, proof jobs, and analytics data to CSV at any time from the dashboard.',
  },
  {
    question: 'What happens if I exceed my plan limits?',
    answer: 'We\'ll notify you before you hit any limits. Our pricing scales with your usage, so you only pay for what you need.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently asked questions
          </h2>
          <p className="text-xl text-gray-500">
            Everything you need to know about 3J Full House.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              className="border border-gray-100 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <span className="text-2xl text-gray-400 ml-4">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-gray-500">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}