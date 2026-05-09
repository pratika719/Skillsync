import { AnimatePresence, motion } from "framer-motion";

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