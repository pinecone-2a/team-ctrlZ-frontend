"use client";
import EditProfile from "./profileEdit";
import EditPassword from "./passwordEdit";
import EditPayment from "./editPayment";
import SuccessMess from "./successMess";
import Sidebar from "../_components/sidebar";
import Header from "../_components/header";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "sonner";
const fadeScaleVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

export default function AccountSettings() {
  return (
    <div>
      <Header />
      <div className="flex mt-20">
        <Sidebar />
        <div className="flex flex-col items-center gap-6 p-10">
          <Toaster richColors position="top-center" />
          <AnimatePresence>
            <motion.div
              key="profile"
              variants={fadeScaleVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <EditProfile />
            </motion.div>

            <motion.div
              key="password"
              variants={fadeScaleVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <EditPassword />
            </motion.div>

            <motion.div
              key="payment"
              variants={fadeScaleVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <EditPayment />
            </motion.div>

            <motion.div
              key="success"
              variants={fadeScaleVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <SuccessMess />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
