import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Calendar, MapPin, Star, Award } from 'lucide-react';

interface TimelineProps {
  milestones: string[];
}

const Timeline: React.FC<TimelineProps> = ({ milestones }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeItems, setActiveItems] = useState<number[]>([]);
  const lineControls = useAnimation();

  useEffect(() => {
    // Animate the center line first
    lineControls.start({
      height: "100%",
      opacity: 1,
      transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1.0] }
    });
    
    // Then sequentially reveal timeline items
    const animateItems = async () => {
      // Short delay before starting
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Reveal items one by one
      for (let i = 0; i < milestones.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 250));
        setActiveItems(prev => [...prev, i]);
      }
    };
    
    animateItems();
  }, [milestones.length, lineControls]);

  // Animation variants for timeline items
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 150,
        damping: 20,
        mass: 1
      }
    }
  };

  // Get a consistent icon for each milestone
  const getIconForIndex = (index: number) => {
    const icons = [
      <Calendar size={20} className="text-primary-500" />,
      <MapPin size={20} className="text-secondary-500" />,
      <Star size={20} className="text-yellow-500" />,
      <Award size={20} className="text-indigo-500" />
    ];
    return icons[index % icons.length];
  };

  // Create path data for the connector lines
  const getConnectorPath = (index: number, isEven: boolean): string => {
    const startX = isEven ? 20 : 80;
    const endX = isEven ? 80 : 20;
    return `M${startX},0 C${startX},30 ${endX},70 ${endX},100`;
  };

  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h3 
        className="text-2xl font-bold mb-8 text-center gradient-text"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          delay: 0.2
        }}
      >
        Your Life Timeline
      </motion.h3>
      
      <div className="relative py-10">
        {/* Timeline Center Line - Moved outside of the space-y-24 to ensure it spans the entire container */}
        <motion.div 
          className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-400 to-secondary-500 rounded-full"
          initial={{ height: 0, opacity: 0 }}
          animate={lineControls}
          style={{ top: 0, bottom: 0, zIndex: 1 }}
        >
          {/* Animated gradient effect */}
          <motion.div 
            className="absolute w-full h-[200%] bg-gradient-to-b from-transparent via-white dark:via-primary-400 to-transparent opacity-30"
            animate={{ 
              y: ["-100%", "100%"] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3.5,
              ease: "linear"
            }}
          />
        </motion.div>
        
        {/* Timeline Items */}
        <div className="space-y-24 relative">
          {milestones.map((milestone, index) => {
            const isEven = index % 2 === 0;
            const isActive = activeItems.includes(index);
            
            return (
              <motion.div 
                key={index}
                className={`flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                initial="hidden"
                animate={isActive ? "visible" : "hidden"}
                variants={itemVariants}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                custom={index}
              >
                {/* Content */}
                <div className={`w-5/12 ${isEven ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <motion.div 
                    className="card p-4 shadow-md hover:shadow-lg transition-all duration-300"
                    whileHover={{ 
                      y: -10, 
                      scale: 1.03,
                      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)"
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 15
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`p-2 rounded-full bg-primary-50 dark:bg-primary-900/30 ${!isEven && 'order-last'}`}>
                        {getIconForIndex(index)}
                      </div>
                      <motion.span 
                        className="text-sm font-semibold text-primary-600 dark:text-primary-400"
                        animate={{ 
                          scale: hoveredIndex === index ? [1, 1.05, 1] : 1 
                        }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: hoveredIndex === index ? Infinity : 0,
                          ease: "easeInOut"
                        }}
                      >
                        Milestone {index + 1}
                      </motion.span>
                    </div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{milestone}</p>
                    
                    {/* Small decoration at bottom of card */}
                    <motion.div 
                      className="w-1/3 h-1 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full mt-2 mx-auto"
                      initial={{ width: 0 }}
                      animate={{ width: "33%" }}
                      transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
                    />
                  </motion.div>
                </div>
                
                {/* Connector Line */}
                <div className="w-2/12 h-24 relative">
                  <svg className="w-full h-full absolute" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
                    <motion.path
                      d={getConnectorPath(index, isEven)}
                      stroke={`url(#gradient-${index})`}
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: 1, 
                        opacity: 1,
                        strokeDashoffset: hoveredIndex === index ? [0, -100] : 0 
                      }}
                      transition={{ 
                        duration: 1.2, 
                        delay: 0.3,
                        ease: "easeInOut",
                        strokeDashoffset: {
                          repeat: hoveredIndex === index ? Infinity : 0,
                          duration: 5,
                          ease: "linear"
                        }
                      }}
                    />
                    <defs>
                      <linearGradient id={`gradient-${index}`} gradientTransform="rotate(90)">
                        <stop offset="0%" stopColor="#5f6cf9" />
                        <stop offset="100%" stopColor="#55b0ea" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Center Circle - Increased z-index to ensure it appears on top of the timeline line */}
                  <motion.div 
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white dark:bg-gray-800 border-4 border-primary-500 z-20 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: 1,
                      boxShadow: hoveredIndex === index ? 
                        "0 0 0 8px rgba(95, 108, 249, 0.2)" : 
                        "0 0 0 0px rgba(95, 108, 249, 0)"
                    }}
                    transition={{ 
                      scale: {
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                        delay: 0.4
                      },
                      boxShadow: { duration: 0.4 }
                    }}
                  >
                    <motion.div 
                      className="w-1.5 h-1.5 bg-primary-500 rounded-full"
                      animate={{ 
                        scale: [1, 1.8, 1],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                </div>
                
                {/* Empty space for alternating layout */}
                <div className="w-5/12"></div>
              </motion.div>
            );
          })}
          
          {/* Add a final connector circle at the bottom if there are milestones */}
          {milestones.length > 0 && (
            <motion.div 
              className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-secondary-500 z-10"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Timeline; 