import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import Lottie from 'lottie-react';
import { ThemeProvider } from './components/ThemeContext';
import Header from './components/Header';
import MilestoneForm from './components/MilestoneForm';
import StoryDisplay from './components/StoryDisplay';
import Footer from './components/Footer';
import Timeline from './components/Timeline';
import writingAnimation from './assets/writing-animation.json';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};

// Typing Animation Component
const TypingAnimation = () => {
  const [displayText, setDisplayText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const fullText = "Everyone Has a Story. Let's Tell Yours.";
  
  useEffect(() => {
    let i = 0;
    let typingInterval: NodeJS.Timeout;
    let pauseTimeout: NodeJS.Timeout;
    let eraseTimeout: NodeJS.Timeout = setTimeout(() => {}, 0);
    let isTyping = true;
    let isPaused = false;
    
    // Typing effect function
    const typeText = () => {
      if (isTyping && i < fullText.length) {
        setDisplayText(fullText.substring(0, i + 1));
        i++;
        // Variable speed based on punctuation for more natural typing
        const delay = fullText[i] === '.' || fullText[i] === ',' || fullText[i] === '?' 
          ? 300 // Pause longer at punctuation
          : Math.random() * 50 + 60; // Random delay between 60-110ms for natural effect
        typingInterval = setTimeout(typeText, delay);
      } else if (isTyping && i >= fullText.length) {
        // Pause at the end for a moment
        isPaused = true;
        isTyping = false;
        pauseTimeout = setTimeout(() => {
          isPaused = false;
          isTyping = false;
          eraseText();
        }, 4000); // Pause for 4 seconds when fully typed
      }
    };
    
    // Erasing effect function
    const eraseText = () => {
      if (!isTyping && i > 0) {
        i--;
        setDisplayText(fullText.substring(0, i));
        // Erase slightly faster than typing
        typingInterval = setTimeout(eraseText, 30);
      } else if (!isTyping && i === 0) {
        // Start typing again
        isTyping = true;
        typingInterval = setTimeout(typeText, 1500); // Wait 1.5 second before retyping
      }
    };
    
    // Begin typing
    typingInterval = setTimeout(typeText, 500);
    
    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    
    // Cleanup
    return () => {
      clearTimeout(typingInterval);
      clearTimeout(pauseTimeout);
      clearTimeout(eraseTimeout);
      clearInterval(cursorInterval);
    };
  }, []);
  
  return (
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text flex items-center justify-center min-h-[80px] relative">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {displayText}
        <motion.span 
          className={`inline-block w-1 h-12 bg-primary-500 ml-1 rounded-sm ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}
          animate={{ 
            opacity: cursorVisible ? 1 : 0,
            scaleY: cursorVisible ? 1 : 0.9,
          }}
          transition={{ duration: 0.2 }}
        ></motion.span>
      </motion.span>
    </h1>
  );
};

function App() {
  const [milestones, setMilestones] = useState<string[]>([]);
  const [tone, setTone] = useState<string>('professional');
  const [story, setStory] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showTimeline, setShowTimeline] = useState<boolean>(false);

  const generateStory = async () => {
    if (milestones.length === 0) {
      setError('Please add at least one milestone');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ milestones, tone }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      setStory(data.autobiography);
      setShowTimeline(true);
    } catch (err) {
      console.error('Error generating story:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect to the server. Please ensure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Header />
        
        <motion.main
          className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 lg:p-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.section 
            className="max-w-7xl w-full mx-auto my-8"
            variants={itemVariants}
          >
            {/* Hero Section */}
            <div className="text-center mb-16">
              <motion.div 
                className="flex justify-center mb-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 1.2,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <motion.div 
                  className="w-40 h-40"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 2, 0, -2, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Lottie 
                    animationData={writingAnimation} 
                    loop={true}
                    style={{ width: '100%', height: '100%' }}
                  />
                </motion.div>
              </motion.div>
              
              {/* Animated typing heading */}
              <TypingAnimation />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="max-w-3xl mx-auto relative"
              >
                <motion.p 
                  className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 relative z-10"
                  animate={{ 
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                >
                  Weave your life's story into a compelling narrative with the power of AI.
                </motion.p>
                <motion.div 
                  className="absolute inset-0 bg-primary-500/5 dark:bg-primary-500/10 rounded-full blur-3xl -z-10"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.7, 0.5],
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                />
              </motion.div>
            </div>
            
            {/* Main Content - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <MilestoneForm 
                milestones={milestones}
                setMilestones={setMilestones}
                tone={tone}
                setTone={setTone}
                onGenerate={generateStory}
                isLoading={isLoading}
                error={error}
              />
              
              <StoryDisplay 
                story={story} 
                isLoading={isLoading} 
                tone={tone}
              />
            </div>
            
            {/* Timeline Section */}
            <AnimatePresence>
              {showTimeline && story && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-16 overflow-hidden"
                >
                  <Timeline milestones={milestones} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        </motion.main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App; 