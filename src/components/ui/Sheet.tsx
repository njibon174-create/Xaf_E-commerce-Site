"use client";

import { Fragment } from "react";
import { motion, AnimatePresence } from "motion/react";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function Sheet({ open, onClose, children, title }: SheetProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <motion.div
            className="absolute inset-0 bg-obsidian/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <motion.div
            className="relative z-10 w-full max-h-[85vh] bg-charcoal rounded-t-3xl shadow-xl flex flex-col"
            initial={{ y: "100%" }}
            animate={{ y: 0, transition: { type: "spring", stiffness: 300, damping: 24, mass: 0.8 } }}
            exit={{ y: "100%", transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] } }}
          >
            <div className="flex justify-center pt-3 pb-1" aria-hidden>
              <div className="w-10 h-1 bg-fog/40 rounded-full" />
            </div>
            {title && (
              <div className="px-4 pb-3 pt-1">
                <h2 className="font-serif text-xl font-medium text-pure">{title}</h2>
              </div>
            )}
            <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-8">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
