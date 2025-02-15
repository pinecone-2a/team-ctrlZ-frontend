import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import '@/styles/globals.css';

const fadeScaleVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

export default function Transition({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={router.pathname} variants={fadeScaleVariants} initial="initial" animate="animate" exit="exit">
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  );
}
