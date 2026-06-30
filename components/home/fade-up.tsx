"use client";

import { motion, useReducedMotion } from "framer-motion";
import { createElement, type ReactNode } from "react";

/**
 * 8px-rise scroll reveal — the single signature interaction for the Argana
 * homepage (DESIGN.md "Precision Minimalism" — no cursor lerp, no hover
 * video, no parallax). Pass `index` on siblings to stagger them 60ms apart.
 *
 * Respects `prefers-reduced-motion`: returns the children with no animation.
 */
type Tag = "div" | "section" | "article" | "li" | "header" | "footer";

type FadeUpProps = {
  children: ReactNode;
  index?: number;
  className?: string;
  as?: Tag;
};

export function FadeUp({ children, index = 0, className, as = "div" }: FadeUpProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return createElement(as, { className }, children);
  }

  const variants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
  };
  const transition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay: index * 0.06 };

  switch (as) {
    case "section":
      return (
        <motion.section
          className={className}
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={transition}
        >
          {children}
        </motion.section>
      );
    case "article":
      return (
        <motion.article
          className={className}
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={transition}
        >
          {children}
        </motion.article>
      );
    case "li":
      return (
        <motion.li
          className={className}
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={transition}
        >
          {children}
        </motion.li>
      );
    case "header":
      return (
        <motion.header
          className={className}
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={transition}
        >
          {children}
        </motion.header>
      );
    case "footer":
      return (
        <motion.footer
          className={className}
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={transition}
        >
          {children}
        </motion.footer>
      );
    default:
      return (
        <motion.div
          className={className}
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={transition}
        >
          {children}
        </motion.div>
      );
  }
}
