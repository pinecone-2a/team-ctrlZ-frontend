"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Login from "../_components/login";

const fadeScaleVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

export default function LoginPage() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;

  return (
    <div>
      <AnimatePresence>
        <motion.div
          key="login"
          variants={fadeScaleVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Login />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
