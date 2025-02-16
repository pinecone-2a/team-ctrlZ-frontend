"use client";

import VPmain from "./viewpage";
import Header from "../_components/header";
import { AnimatePresence, motion } from "framer-motion";
const fadeScaleVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

export default function ViewPageMain() {
  return (
    <div>
      <Header />
      <AnimatePresence>
        <motion.div
          key="viewpage" 
          variants={fadeScaleVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <VPmain />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
