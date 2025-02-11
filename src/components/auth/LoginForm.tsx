import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../../store/auth';
import { motion } from 'framer-motion';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string().optional(),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  footballExperience: z.string().optional(),
  role: z.enum(['Student', 'Coach', 'Academy']),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

const inputVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export const LoginForm: React.FC = () => {
  const { login, register: registerUser, users } = useAuthStore();
  const [isRegistering, setIsRegistering] = React.useState(false);
  const validationSchema = isRegistering ? registerSchema : loginSchema;
  const [selectedRole, setSelectedRole] = React.useState<'Student' | 'Coach' | 'Academy'>('Student');

  const {
    register: useFormRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData | RegisterFormData>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (data: LoginFormData | RegisterFormData) => {
    try {
      if (isRegistering) {
        const { firstName, lastName, phone, email, password, footballExperience } = data as RegisterFormData;
        await registerUser(firstName, lastName, phone || '', email, password, footballExperience || '', selectedRole);
        console.log('LoginForm - User registered:', data);
      } else {
        const { email, password } = data as LoginFormData;
        await login(email, password);
        console.log('LoginForm - User logged in:', data);
      }
    } catch (error) {
      console.error('LoginForm - Login/Register failed:', error);
    }
  };

  useEffect(() => {
    console.log('LoginForm - Users in store:', users);
  }, [users]);

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 neo-blur p-8 rounded-xl w-full md:w-3/4 lg:w-4/5 xl:w-3/5 mx-auto"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
      }}
    >
      <motion.div className="flex justify-center" variants={inputVariants}>
        <button
          type="button"
          className={`px-4 py-2 rounded-md transition-colors ${
            isRegistering ? 'text-gray-400 hover:text-white' : 'bg-[#E41E12] text-white'
          }`}
          onClick={() => setIsRegistering(false)}
          disabled={!isRegistering}
        >
          Sign In
        </button>
        <button
          type="button"
          className={`px-4 py-2 rounded-md transition-colors ${
            !isRegistering ? 'text-gray-400 hover:text-white' : 'bg-[#E41E12] text-white'
          }`}
          onClick={() => setIsRegistering(true)}
          disabled={isRegistering}
        >
          Sign Up
        </button>
      </motion.div>

      {isRegistering ? (
        <>
          <motion.div variants={inputVariants}>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-200">
              First Name
            </label>
            <input
              {...useFormRegister('firstName')}
              type="text"
              id="firstName"
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white px-3 py-2 focus:border-[#E41E12] focus:ring focus:ring-[#E41E12] focus:ring-opacity-50"
              placeholder="First Name"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </motion.div>

          <motion.div variants={inputVariants}>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-200">
              Last Name
            </label>
            <input
              {...useFormRegister('lastName')}
              type="text"
              id="lastName"
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white px-3 py-2 focus:border-[#E41E12] focus:ring focus:ring-[#E41E12] focus:ring-opacity-50"
              placeholder="Last Name"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </motion.div>

          <motion.div variants={inputVariants}>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-200">
              Phone
            </label>
            <input
              {...useFormRegister('phone')}
              type="tel"
              id="phone"
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white px-3 py-2 focus:border-[#E41E12] focus:ring focus:ring-[#E41E12] focus:ring-opacity-50"
              placeholder="Phone"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
            )}
          </motion.div>

          <motion.div variants={inputVariants}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              {...useFormRegister('email')}
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white px-3 py-2 focus:border-[#E41E12] focus:ring focus:ring-[#E41E12] focus:ring-opacity-50"
              placeholder="Email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </motion.div>

          <motion.div variants={inputVariants}>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              {...useFormRegister('password')}
              type="password"
              id="password"
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white px-3 py-2 focus:border-[#E41E12] focus:ring focus:ring-[#E41E12] focus:ring-opacity-50"
              placeholder="Password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </motion.div>

          <motion.div variants={inputVariants}>
            <label htmlFor="footballExperience" className="block text-sm font-medium text-gray-200">
              Football Experience (optional)
            </label>
            <textarea
              {...useFormRegister('footballExperience')}
              id="footballExperience"
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white px-3 py-2 focus:border-[#E41E12] focus:ring focus:ring-[#E41E12] focus:ring-opacity-50"
              placeholder="Tell us about your football experience"
              rows={3}
            />
            {errors.footballExperience && (
              <p className="mt-1 text-sm text-red-500">{errors.footballExperience.message}</p>
            )}
          </motion.div>

          <motion.div variants={inputVariants}>
            <label htmlFor="role" className="block text-sm font-medium text-gray-200">
              Role
            </label>
            <select
              {...useFormRegister('role')}
              id="role"
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white px-3 py-2 focus:border-[#E41E12] focus:ring focus:ring-[#E41E12] focus:ring-opacity-50"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as 'Student' | 'Coach' | 'Academy')}
            >
              <option value="Student">Student</option>
              <option value="Coach">Coach</option>
              <option value="Academy">Academy</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
            )}
          </motion.div>
        </>
      ) : (
        <>
          <motion.div variants={inputVariants}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              {...useFormRegister('email')}
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white px-3 py-2 focus:border-[#E41E12] focus:ring focus:ring-[#E41E12] focus:ring-opacity-50"
              placeholder="Email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </motion.div>

          <motion.div variants={inputVariants}>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              {...useFormRegister('password')}
              type="password"
              id="password"
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white px-3 py-2 focus:border-[#E41E12] focus:ring focus:ring-[#E41E12] focus:ring-opacity-50"
              placeholder="Password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </motion.div>
        </>
      )}

      <div className="flex justify-end" variants={inputVariants}>
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-1/3 bg-[#E41E12] text-white py-2 px-4 rounded-md hover:bg-[#E41E12]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          {isSubmitting ? 'Submitting...' : isRegistering ? 'Sign Up' : 'Sign In'}
        </motion.button>
      </div>
    </motion.form>
  );
};
