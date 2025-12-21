import { motion } from "framer-motion";
import React from "react";

const ScrollAnimation = ({children,delay,aos='fade-up'}) => {
  return (
    <div >
      <motion.div
        data-aos={aos}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollAnimation;
