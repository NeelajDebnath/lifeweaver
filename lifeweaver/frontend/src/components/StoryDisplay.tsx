import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, useAnimation, AnimationControls } from 'framer-motion';
import { Copy, Download, Book, PenTool, Sparkles } from 'lucide-react';

interface StoryDisplayProps {
  story: string;
  isLoading: boolean;
  tone: string;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, isLoading, tone }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [showText, setShowText] = useState<boolean>(false);
  const [activeReaderPos, setActiveReaderPos] = useState<number>(0);
  const storyRef = useRef<HTMLDivElement>(null);
  
  // Create a single animation control that we'll reuse
  const mainControl = useAnimation();

  // Split paragraphs and strip empty ones
  const paragraphs = useMemo(() => {
    if (!story) return [];
    return story
      .split("\n")
      .map(p => p.trim())
      .filter(p => p.length > 0);
  }, [story]);

  // Animation variants for paragraphs
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const paragraphVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: "blur(3px)" 
    },
    show: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        duration: 0.7
      } 
    }
  };

  // Typography animations for the immersive reading experience
  const renderEnhancedText = (text: string, index: number) => {
    // Creating a special treatment for the first paragraph
    if (index === 0) {
      const firstChar = text.charAt(0);
      const restOfText = text.slice(1);
      
      return (
        <>
          <motion.span 
            className="text-4xl font-serif text-primary-600 dark:text-primary-400 float-left mr-1 mt-1"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
          >
            {firstChar}
          </motion.span>
          <span>{restOfText}</span>
        </>
      );
    }
    
    return text;
  };

  useEffect(() => {
    if (story) {
      setShowText(true);
      mainControl.start("show");
    } else {
      setShowText(false);
      mainControl.start("hidden");
    }
  }, [story, mainControl]);

  // Tracking scroll position for the reading indicator
  const handleScroll = () => {
    if (storyRef.current && paragraphs.length > 0) {
      const { scrollTop, scrollHeight, clientHeight } = storyRef.current;
      const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setActiveReaderPos(Math.min(Math.max(scrollPercentage, 0), 100));
    }
  };

  const handleCopyToClipboard = () => {
    if (story && storyRef.current) {
      navigator.clipboard.writeText(story);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (story) {
      const blob = new Blob([story], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `life-story-${tone}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };
  
  return (
    <motion.div 
      className="card h-full flex flex-col backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <motion.h2 
            className="text-2xl font-bold gradient-text flex"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <motion.div className="flex overflow-hidden">
              {"Your Story".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      duration: 0.3,
                      delay: index * 0.08,
                      ease: "easeOut"
                    }
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <motion.span
                className="inline-block w-[3px] h-[1.2em] bg-primary-500 ml-1"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  transition: {
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 0.2,
                    delay: "Your Story".length * 0.08
                  }
                }}
              />
            </motion.div>
          </motion.h2>
          {story && !isLoading && (
            <motion.div 
              className="ml-3 flex items-center text-primary-500 text-xs font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Sparkles size={16} className="mr-1" />
              <span>{tone.charAt(0).toUpperCase() + tone.slice(1)} tone</span>
            </motion.div>
          )}
        </div>
        
        {story && (
          <div className="flex space-x-2">
            <motion.button
              onClick={handleCopyToClipboard}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-700 shadow-sm text-xs font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              aria-label="Copy to clipboard"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {copied ? (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <span className="text-green-500">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} className="mr-1" />
                  Copy
                </>
              )}
            </motion.button>
            <motion.button
              onClick={handleDownload}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-700 shadow-sm text-xs font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              aria-label="Download as text file"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Download size={16} className="mr-1" />
              Download
            </motion.button>
          </div>
        )}
      </div>
      
      {/* Reading progress indicator */}
      {story && !isLoading && (
        <motion.div 
          className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full mb-3 overflow-hidden"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
            style={{ width: `${activeReaderPos}%` }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
          />
        </motion.div>
      )}
      
      <div className="flex-grow overflow-auto relative">
        <motion.div 
          ref={storyRef}
          className="glassmorphic p-6 h-full overflow-y-auto rounded-lg border border-gray-200/30 dark:border-gray-700/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          onScroll={handleScroll}
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="animate-pulse flex flex-col items-center text-gray-400 dark:text-gray-500">
                <motion.div
                  animate={{ 
                    y: [0, -12, 0],
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <PenTool size={36} className="mb-3" />
                </motion.div>
                <p className="text-lg">Crafting your life story...</p>
                <div className="mt-8 space-y-3 w-full max-w-md">
                  <motion.div 
                    className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full"
                    animate={{ width: ["0%", "100%", "60%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div 
                    className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full"
                    animate={{ width: ["0%", "70%", "40%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.2, ease: "easeInOut" }}
                  />
                  <motion.div 
                    className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full"
                    animate={{ width: ["0%", "50%", "85%"] }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: 0.4, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </div>
          ) : story ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={mainControl}
              className="prose prose-lg dark:prose-invert max-w-none space-y-4"
            >
              {paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="mb-4 leading-relaxed text-gray-600 dark:text-gray-300"
                  custom={index}
                  variants={paragraphVariants}
                >
                  {renderEnhancedText(paragraph, index)}
                </motion.p>
              ))}
              
              {/* End of story flourish */}
              {paragraphs.length > 0 && (
                <motion.div 
                  className="flex justify-center mt-8 pt-2 border-t border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: paragraphs.length * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                >
                  <div className="w-16 h-1 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full" />
                </motion.div>
              )}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                <Book size={48} className="mb-4 opacity-50" />
                <p className="text-lg mb-1 font-medium">Your story will appear here</p>
                <p className="text-sm text-center">Add some milestones and generate your autobiography</p>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StoryDisplay; 