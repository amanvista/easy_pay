import { motion } from 'framer-motion';
import { Check, Clock } from 'lucide-react';

/**
 * OrderTimeline - Visual progress tracker for order stages
 */
const OrderTimeline = ({ stages, currentStage }) => {
  // Check if order is cancelled or rejected
  const isCancelled = currentStage === 6; // CANCELLED
  const isRejected = currentStage === 7; // REJECTED
  const isFailed = currentStage === 13; // DELIVERY_FAILED
  const isTerminalState = isCancelled || isRejected || isFailed;

  const getStageStatus = (stageId, stageIndex) => {
    if (isTerminalState) {
      // If order is cancelled/rejected/failed, mark all stages as inactive except current
      if (stageId === currentStage) return 'failed';
      if (stageId < currentStage) return 'completed';
      return 'cancelled';
    }
    
    // Current stage is completed, next stage is active (in progress)
    if (stageId < currentStage) return 'completed';
    if (stageId === currentStage) return 'completed';
    
    // The stage immediately after current is "in progress"
    const currentStageIndex = stages.findIndex(s => s.id === currentStage);
    if (stageIndex === currentStageIndex + 1) return 'active';
    
    return 'pending';
  };

  const getStageColors = (status) => {
    switch (status) {
      case 'completed':
        return {
          bg: 'bg-green-500',
          border: 'border-green-500',
          text: 'text-green-600',
          icon: 'text-white'
        };
      case 'active':
        return {
          bg: 'bg-orange-500',
          border: 'border-orange-500',
          text: 'text-orange-600',
          icon: 'text-white'
        };
      case 'failed':
        return {
          bg: 'bg-red-500',
          border: 'border-red-500',
          text: 'text-red-600',
          icon: 'text-white'
        };
      case 'cancelled':
        return {
          bg: 'bg-gray-100',
          border: 'border-gray-200',
          text: 'text-gray-400',
          icon: 'text-gray-300'
        };
      default:
        return {
          bg: 'bg-gray-200',
          border: 'border-gray-300',
          text: 'text-gray-500',
          icon: 'text-gray-400'
        };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Progress</h2>
      
      <div className="space-y-6">
        {stages.map((stage, index) => {
          const status = getStageStatus(stage.id, index);
          const colors = getStageColors(status);
          const isLast = index === stages.length - 1;
          
          return (
            <motion.div
              key={stage.id}
              variants={itemVariants}
              className="relative flex items-start gap-4"
            >
              {/* Timeline Line */}
              {!isLast && (
                <div className={`absolute left-6 top-12 w-0.5 h-16 ${
                  status === 'cancelled' ? 'bg-gray-100' : 'bg-gray-200'
                }`} />
              )}
              
              {/* Stage Icon */}
              <motion.div
                className={`relative z-10 w-12 h-12 rounded-full border-2 ${colors.border} ${colors.bg} flex items-center justify-center`}
                animate={status === 'active' ? {
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    '0 0 0 0 rgba(249, 115, 22, 0.4)',
                    '0 0 0 10px rgba(249, 115, 22, 0)',
                    '0 0 0 0 rgba(249, 115, 22, 0)'
                  ]
                } : status === 'failed' ? {
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 0 0 0 rgba(239, 68, 68, 0.4)',
                    '0 0 0 10px rgba(239, 68, 68, 0)',
                    '0 0 0 0 rgba(239, 68, 68, 0)'
                  ]
                } : {}}
                transition={{
                  duration: 2,
                  repeat: (status === 'active' || status === 'failed') ? Infinity : 0,
                  ease: "easeInOut"
                }}
              >
                {status === 'completed' ? (
                  <Check className={`w-6 h-6 ${colors.icon}`} />
                ) : status === 'active' ? (
                  <Clock className={`w-6 h-6 ${colors.icon}`} />
                ) : status === 'failed' ? (
                  <span className={`text-2xl ${colors.icon}`}>❌</span>
                ) : (
                  <span className={`text-lg ${colors.icon}`}>
                    {stage.icon}
                  </span>
                )}
              </motion.div>
              
              {/* Stage Content */}
              <div className="flex-1 min-w-0 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h3 className={`font-semibold ${colors.text}`}>
                    {stage.name}
                  </h3>
                  {stage.time && (
                    <span className="text-sm text-gray-500 font-medium">
                      {stage.time}
                    </span>
                  )}
                </div>
                
                <p className={`text-sm mt-1 ${
                  status === 'cancelled' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {stage.description}
                </p>
                
                {status === 'active' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 flex items-center gap-2"
                  >
                    <div className="flex space-x-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-orange-500 rounded-full"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-orange-600 font-medium">
                      In Progress...
                    </span>
                  </motion.div>
                )}
                
                {status === 'failed' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <span className="text-xs text-red-700 font-medium">
                      {stage.id === 6 ? 'Order has been cancelled' : 
                       stage.id === 7 ? 'Order was rejected by restaurant' :
                       'Delivery attempt failed'}
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default OrderTimeline;