import React from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <motion.footer 
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-700/50 py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 flex items-center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className="mr-2"
            >
              <Heart size={18} className="text-red-500" />
            </motion.div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} LifeWeaver. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <motion.a 
              href="#" 
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 flex items-center"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={16} className="mr-2" />
              <span className="text-sm">GitHub</span>
            </motion.a>
            <motion.a 
              href="#" 
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 flex items-center"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={16} className="mr-2" />
              <span className="text-sm">Contact</span>
            </motion.a>
            <motion.button
              className="text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 flex items-center rounded-md px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-medium">Support Us</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer; 