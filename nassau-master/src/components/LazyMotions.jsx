import { LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';

function LazyMotions({ children }) {
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>{children}</AnimatePresence>
    </LazyMotion>
  );
}

export default LazyMotions;
