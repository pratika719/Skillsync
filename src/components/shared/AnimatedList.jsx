import { AnimatePresence, motion } from "framer-motion";

// ✅ wrap any list with this to get animated entry/exit
function AnimatedList({ children, className = "" }) {
    return (
        <div className={className}>
            <AnimatePresence mode="popLayout">
                {children}
            </AnimatePresence>
        </div>
    );
}

export default AnimatedList;