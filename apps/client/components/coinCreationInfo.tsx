"use client";
import { motion, AnimatePresence } from "motion/react";

interface CoinCreationInfoProps {
  show: boolean;
  statusLabel: string;
}

export function CoinCreationInfo({ show, statusLabel }: CoinCreationInfoProps) {
  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="flex flex-col items-center gap-4 px-8 py-6 bg-linear-to-r from-emerald-500/20 to-mint/20 border border-emerald-500/40 rounded-xl backdrop-blur-md shadow-2xl pointer-events-auto">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                <p className="text-lg font-semibold text-neutral-100">
                  Your coin is getting created
                </p>
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
              </div>
              <p className="text-sm text-neutral-300">{statusLabel}</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
