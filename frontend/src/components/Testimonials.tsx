import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const testimonials = [
  {
    quote: "3J Full House has transformed how we manage our marketing leads. The Trello integration is seamless.",
    name: 'Sarah Mitchell',
    role: 'Agency Director',
    avatar: 'SM',
  },
  {
    quote: "Finally, a tool that understands how marketing agencies actually work. The proofing feature is a game-changer.",
    name: 'James Chen',
    role: 'Creative Lead',
    avatar: 'JC',
  },
  {
    quote: "Our team productivity increased by 40% in the first month. The analytics are incredibly valuable.",
    name: 'Lisa Rodriguez',
    role: 'Operations Manager',
    avatar: 'LR',
  },
  {
    quote: "Best investment we've made. Simple to use yet powerful enough for enterprise needs.",
    name: 'Michael Thompson',
    role: 'CEO',
    avatar: 'MT',
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 px-6 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Loved by marketing teams
          </h2>
          <p className="text-xl text-gray-500">
            See what agency owners are saying about 3J Full House.
          </p>
        </motion.div>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide" ref={containerRef}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="flex-shrink-0 w-80 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}