"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";

export default function ScrollProgressBar() {
    const { scrollYProgress } = useScroll();

    const scrollProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const width = useTransform(scrollProgress, (value) => `${value * 100}%`);

    return (
        <motion.div
            className="fixed top-0 left-0 h-1 bg-brand-accent z-100 shadow-[0_2px_10px_rgba(45,165,163,0.5)]"
            style={{ width }}
        />
    );
}
