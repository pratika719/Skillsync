import { motion } from "framer-motion";

const cardVariants = {

    hidden: {
        opacity: 0,
        y: 24,
        scale: 0.97,
    },

    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.25,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },

    exit: {
        opacity: 0,
        y: -16,
        scale: 0.97,
        transition: {
            duration: 0.2,
            ease: "easeIn",
        },
    },
};

const hoverVariants = {
    rest: { scale: 1, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
    hover: {
        scale: 1.01,
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        transition: { duration: 0.2, ease: "easeOut" },
    },
    tap: {
        scale: 0.99,
        transition: { duration: 0.1 },
    },
};

function AnimatedCard({ children, className = "", layoutId }) {
    return (
        <motion.div
            layoutId={layoutId}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover="hover"
            whileTap="tap"
            {...hoverVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default AnimatedCard;