"use client";

import HomePage from "@/app/_components/HomePage";
import Header from "../_components/header";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "../_components/sidebar";
const fadeScaleVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

export default function HomePageDefault() {
  return (
    <div>
      <Header />
      <div className="flex mt-20 ">
        <Sidebar />
        <AnimatePresence>
          <motion.div
            key="home"
            variants={fadeScaleVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <HomePage />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
