import React from 'react';
import { Phone, MapPin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactSection = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      console.log('ContactForm - Data submitted:', data);
      // Here you would typically handle the form submission, e.g., sending the data to an API
    } catch (error) {
      console.error('ContactForm - Submission failed:', error);
    }
  };

  const iconVariants = {
    initial: { y: 0 },
    hover: { y: -3, transition: { duration: 0.3, ease: "easeInOut", yoyo: 3 } },
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        {/* Contact Info */}
        <motion.div
          className="md:col-span-1 neo-blur rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <motion.div
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-2"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div variants={iconVariants} initial="initial" whileHover="hover">
                  <Phone className="text-primary w-6 h-6" />
                </motion.div>
              </motion.div>
              <motion.span className="text-gray-300" whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}>+385 XXX XXX XXXX</motion.span>
            </div>
            <div className="flex items-center">
              <motion.div
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-2"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div variants={iconVariants} initial="initial" whileHover="hover">
                  <MapPin className="text-primary w-6 h-6" />
                </motion.div>
              </motion.div>
              <motion.span className="text-gray-300" whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}>Split, Hrvatska</motion.span>
            </div>
            <div className="flex items-center">
              <motion.div
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-2"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div variants={iconVariants} initial="initial" whileHover="hover">
                  <Mail className="text-primary w-6 h-6" />
                </motion.div>
              </motion.div>
              <motion.span className="text-gray-300" whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}>info@rocketfootballacademy.com</motion.span>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <div className="md:col-span-2 neo-blur rounded-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm text-gray-400">Name</label>
              <input
                type="text"
                id="name"
                {...register('name')}
                className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:border-primary"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-gray-400">Email Address</label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:border-primary"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-gray-400">Message</label>
              <textarea
                id="message"
                rows={4}
                {...register('message')}
                className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:border-primary"
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
            </div>
            <button
              type="submit"
              className="w-1/3 bg-primary text-white rounded-md py-2 px-6 hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
