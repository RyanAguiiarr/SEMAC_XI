import React from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  options?: {
    max?: number;
    scale?: number;
    speed?: number;
  };
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className,
  options = {},
}) => {
  const { max = 25, scale = 1.1, speed = 1000 } = options;

  return (
    <motion.div
      className={className}
      style={{ transformStyle: "preserve-3d" }}
      whileHover={{
        scale: scale,
        transition: { duration: speed / 1000 },
      }}
      whileTap={{ scale: 0.95 }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
    >
      <motion.div
        style={{
          perspective: 1000,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          rotateX: max / 2,
          rotateY: max,
          transition: {
            duration: speed / 1000,
            ease: "easeOut",
          },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default TiltCard;
