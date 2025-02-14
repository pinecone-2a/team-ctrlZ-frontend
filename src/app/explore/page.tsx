"use client";

import Explore from "./explorePage";
import Sidebar from "../_components/sidebar";
import Header from "../_components/header";
import { AnimatePresence, motion } from "framer-motion"; 
const fadeScaleVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

export default function ExpPage() {
  return (
    <div>
      <Header />
      <div className="flex gap-24 mt-12">
        <Sidebar />
        <AnimatePresence>
          <motion.div
            key="explore" 
            variants={fadeScaleVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Explore />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
