import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenLine, Heart, Feather, Smile, Plus, X } from 'lucide-react';

interface ToneOption {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

interface MilestoneFormProps {
  milestones: string[];
  setMilestones: React.Dispatch<React.SetStateAction<string[]>>;
  tone: string;
  setTone: React.Dispatch<React.SetStateAction<string>>;
  onGenerate: () => void;
  isLoading: boolean;
  error: string | null;
}

const MilestoneForm: React.FC<MilestoneFormProps> = ({
  milestones,
  setMilestones,
  tone,
  setTone,
  onGenerate,
  isLoading,
  error
}) => {
  const [newMilestone, setNewMilestone] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const toneOptions: ToneOption[] = [
    {
      id: 'professional',
      label: 'Professional',
      description: 'Formal and business-like',
      icon: <PenLine size={20} />
    },
    {
      id: 'emotional',
      label: 'Emotional',
      description: 'Heartfelt and personal',
      icon: <Heart size={20} />
    },
    {
      id: 'poetic',
      label: 'Poetic',
      description: 'Lyrical and expressive',
      icon: <Feather size={20} />
    },
    {
      id: 'humorous',
      label: 'Humorous',
      description: 'Light-hearted and funny',
      icon: <Smile size={20} />
    }
  ];

  const handleAddMilestone = () => {
    if (newMilestone.trim() !== '') {
      setMilestones([...milestones, newMilestone.trim()]);
      setNewMilestone('');
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddMilestone();
    }
  };

  const handleRemoveMilestone = (index: number) => {
    const updatedMilestones = [...milestones];
    updatedMilestones.splice(index, 1);
    setMilestones(updatedMilestones);
  };

  return (
    <motion.div 
      className="card h-full flex flex-col backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6 gradient-text">Your Life Milestones</h2>
      
      {/* Tone Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Choose the tone of your story
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {toneOptions.map((option) => (
            <motion.button
              key={option.id}
              type="button"
              onClick={() => setTone(option.id)}
              className={`
                relative overflow-hidden flex flex-col items-center justify-center p-4 rounded-lg border transition-all duration-200
                ${tone === option.id 
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700'
                }
              `}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {tone === option.id && (
                <motion.div 
                  className="absolute inset-0 bg-primary-500 opacity-10 rounded-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  layoutId="toneHighlight"
                />
              )}
              <div className={`
                p-2 rounded-full mb-2
                ${tone === option.id 
                  ? 'text-primary-500 bg-primary-100 dark:bg-primary-800 dark:bg-opacity-50' 
                  : 'text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800'
                }
              `}>
                {option.icon}
              </div>
              <span className="text-sm font-medium">{option.label}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">{option.description}</span>
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Milestone Input */}
      <div className="mb-6">
        <label htmlFor="milestone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Add your life milestones
        </label>
        <div className="flex">
          <input
            ref={inputRef}
            type="text"
            id="milestone"
            value={newMilestone}
            onChange={(e) => setNewMilestone(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="E.g., Born in 1990, Graduated college in 2012..."
            className="flex-grow rounded-l-lg border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-20 bg-white dark:bg-gray-900"
          />
          <motion.button
            type="button"
            onClick={handleAddMilestone}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-r-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={18} className="mr-1" />
            Add
          </motion.button>
        </div>
      </div>
      
      {/* Milestone List */}
      <div className="flex-grow mb-6 overflow-y-auto">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Your milestones ({milestones.length})
        </label>
        <div className="min-h-[100px] p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm">
          {milestones.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-24 text-gray-400 dark:text-gray-500 text-center italic mt-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Feather size={24} className="mb-2 mx-auto opacity-50" />
                <p>Add some milestones to begin crafting your story</p>
              </motion.div>
            </div>
          ) : (
            <ul className="space-y-2">
              <AnimatePresence>
                {milestones.map((milestone, index) => (
                  <motion.li 
                    key={`${milestone}-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700"
                    whileHover={{ x: 2, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)" }}
                  >
                    <span className="flex-grow text-sm">{milestone}</span>
                    <motion.button
                      type="button"
                      onClick={() => handleRemoveMilestone(index)}
                      className="text-gray-400 hover:text-red-500 p-1 rounded-full"
                      whileHover={{ scale: 1.2, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X size={16} />
                    </motion.button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </div>
      
      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div 
            className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900 dark:bg-opacity-20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Generate Button */}
      <motion.button
        type="button"
        onClick={onGenerate}
        disabled={isLoading || milestones.length === 0}
        className={`
          w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-md text-base font-medium text-white 
          ${isLoading || milestones.length === 0
            ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
          }
          transition-all duration-200
        `}
        whileHover={isLoading || milestones.length === 0 ? {} : { y: -2, boxShadow: "0 4px 10px rgba(74, 87, 232, 0.3)" }}
        whileTap={isLoading || milestones.length === 0 ? {} : { y: 0, boxShadow: "0 2px 5px rgba(74, 87, 232, 0.2)" }}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="typing-effect">Weaving Your Story...</span>
          </>
        ) : (
          'Generate Autobiography'
        )}
      </motion.button>
    </motion.div>
  );
};

export default MilestoneForm; 