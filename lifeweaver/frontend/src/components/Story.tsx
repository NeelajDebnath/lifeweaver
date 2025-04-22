import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { PenTool, Star } from 'lucide-react';

interface StoryProps {
  story: string;
  isLoading: boolean;
  onRegenerate?: () => void;
}

const Story: React.FC<StoryProps> = ({ story, isLoading, onRegenerate }) => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [chapters, setChapters] = useState<string[]>([]);
  const controls = useAnimation();
  const [isReadVisible, setIsReadVisible] = useState(false);

  useEffect(() => {
    if (story) {
      // Split the story into reasonable chapters
      const paragraphs = story.split('\n\n').filter(para => para.trim() !== '');
      const storyChapters = [];
      
      // Group paragraphs into chapters (approximately 2-3 paragraphs per chapter)
      for (let i = 0; i < paragraphs.length; i += 2) {
        const chapterContent = paragraphs.slice(i, i + 2).join('\n\n');
        storyChapters.push(chapterContent);
      }
      
      setChapters(storyChapters);
      setCurrentChapter(0);

      // Animate the chapter container to be visible
      controls.start({ opacity: 1, y: 0 });
      
      // Show the read buttons after a delay
      setTimeout(() => setIsReadVisible(true), 1000);
    }
  }, [story, controls]);

  const handleNextChapter = () => {
    if (currentChapter < chapters.length - 1) {
      controls.start({ opacity: 0, x: -50 }).then(() => {
        setCurrentChapter(prev => prev + 1);
        controls.start({ opacity: 1, x: 0 });
      });
    }
  };

  const handlePrevChapter = () => {
    if (currentChapter > 0) {
      controls.start({ opacity: 0, x: 50 }).then(() => {
        setCurrentChapter(prev => prev - 1);
        controls.start({ opacity: 1, x: 0 });
      });
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto py-8">
        <div className="flex flex-col items-center justify-center space-y-6 text-center p-6">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <PenTool className="w-12 h-12 text-primary-500" />
          </motion.div>
          <motion.div
            className="relative"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Weaving your story...
            </h3>
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <motion.div
                className="w-36 h-36 rounded-full bg-primary-100 dark:bg-primary-900/30 blur-xl"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
            </div>
          </motion.div>
          
          <div className="max-w-md text-center">
            <motion.p 
              className="text-gray-600 dark:text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              AI is crafting a beautiful narrative based on your life events. This might take a moment as we blend creativity with your personal journey.
            </motion.p>
          </div>
          
          {/* Floating stars animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ 
                  x: Math.random() * 100 - 50 + "%", 
                  y: Math.random() * 100 + "%", 
                  opacity: 0,
                  scale: 0
                }}
                animate={{ 
                  y: [null, "-100%"],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0.5]
                }}
                transition={{ 
                  duration: 5 + Math.random() * 7,
                  delay: i * 0.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut"
                }}
              >
                <Star className="text-secondary-400 w-4 h-4" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!story) {
    return null;
  }

  // Calculate progress percentage
  const progressPercentage = ((currentChapter + 1) / chapters.length) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <div className="relative w-full rounded-lg bg-white dark:bg-gray-800/60 backdrop-blur-lg shadow-lg p-6 md:p-8">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary-400 to-secondary-500"
            style={{ width: `${progressPercentage}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        
        <div className="absolute -top-4 -right-4">
          <motion.div 
            className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/20 blur-xl opacity-60"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* Chapter title */}
        <motion.div 
          className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Chapter {currentChapter + 1} of {chapters.length}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {Math.round(progressPercentage)}% through your story
          </p>
        </motion.div>
        
        {/* Story content */}
        <motion.div 
          className="prose dark:prose-invert prose-lg max-w-none"
          initial={{ opacity: 0, x: 20 }}
          animate={controls}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {chapters[currentChapter].split('\n\n').map((paragraph, idx) => (
            <motion.p 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 + 0.2, duration: 0.6 }}
              className="mb-4 leading-relaxed"
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>
        
        {/* Navigation buttons */}
        <motion.div 
          className="mt-8 flex justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isReadVisible ? 1 : 0, y: isReadVisible ? 0 : 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.button
            onClick={handlePrevChapter}
            disabled={currentChapter === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all 
                      ${currentChapter === 0 
                        ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                        : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'}`}
            whileHover={currentChapter !== 0 ? { scale: 1.05 } : {}}
            whileTap={currentChapter !== 0 ? { scale: 0.95 } : {}}
          >
            <span className="w-4 h-4">←</span>
            Previous
          </motion.button>
          
          <div className="flex space-x-1">
            {chapters.map((_, idx) => (
              <motion.button 
                key={idx}
                className={`w-2 h-2 rounded-full ${idx === currentChapter 
                  ? 'bg-primary-500' 
                  : 'bg-gray-300 dark:bg-gray-700'}`}
                onClick={() => {
                  controls.start({ opacity: 0, scale: 0.95 }).then(() => {
                    setCurrentChapter(idx);
                    controls.start({ opacity: 1, scale: 1 });
                  });
                }}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>
          
          <motion.button
            onClick={handleNextChapter}
            disabled={currentChapter === chapters.length - 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all 
                      ${currentChapter === chapters.length - 1 
                        ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                        : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'}`}
            whileHover={currentChapter !== chapters.length - 1 ? { scale: 1.05 } : {}}
            whileTap={currentChapter !== chapters.length - 1 ? { scale: 0.95 } : {}}
          >
            Next
            <span className="w-4 h-4">→</span>
          </motion.button>
        </motion.div>
        
        {/* Regenerate button */}
        {onRegenerate && (
          <motion.div 
            className="mt-8 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <motion.button
              onClick={onRegenerate}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border border-primary-500 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
              whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(95, 108, 249, 0.15)" }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="w-4 h-4">⟳</span>
              Regenerate Story
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Story; 