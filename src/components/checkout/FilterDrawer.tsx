"use client";

import { useCart } from "@/lib/store";
import Button from "@/components/ui/Button";
import { motion, AnimatePresence } from "motion/react";
import { X, SlidersHorizontal } from "lucide-react";
import { sortOptions, filterColors } from "@/lib/data";
import type { Product } from "@/lib/data";

interface FilterDrawerProps {
  products: Product[];
  onFiltered: (products: Product[]) => void;
}

export default function FilterDrawer({ products, onFiltered }: FilterDrawerProps) {
  const { isFilterOpen, setIsFilterOpen } = useCart();

  const toggleColor = (color: string) => {
    const filtered = products.filter((p) => p.colors.includes(color));
    onFiltered(filtered);
    setIsFilterOpen(false);
  };

  return (
    <AnimatePresence>
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <motion.div
            className="absolute inset-0 bg-obsidian/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsFilterOpen(false)}
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
            <div className="px-4 pb-3 pt-1 flex items-center justify-between">
              <h2 className="font-serif text-xl font-medium text-pure">Filters</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate transition-colors"
                aria-label="Close filters"
              >
                <X size={18} className="text-fog" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-6">
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-fog tracking-wider uppercase mb-3">Sort by</h3>
                <div className="flex flex-wrap gap-2">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        onFiltered([...products]);
                        setIsFilterOpen(false);
                      }}
                      className="px-4 py-2 rounded-full text-xs font-medium border border-slate text-fog hover:border-gold hover:text-gold transition-colors"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xs font-semibold text-fog tracking-wider uppercase mb-3">Color</h3>
                <div className="flex flex-wrap gap-3">
                  {filterColors.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => toggleColor(c.value)}
                      className="w-8 h-8 rounded-full border-2 border-transparent hover:border-gold transition-all shadow-sm"
                      style={{ backgroundColor: c.value }}
                      aria-label={c.label}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-fog tracking-wider uppercase mb-3">Availability</h3>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate accent-gold" />
                  <span className="text-sm text-cloud">In stock only</span>
                </label>
              </div>
            </div>

            <div className="px-4 pb-6 pt-3 border-t border-slate">
              <Button
                fullWidth
                variant="secondary"
                onClick={() => {
                  onFiltered(products);
                  setIsFilterOpen(false);
                }}
              >
                <SlidersHorizontal size={16} />
                Reset filters
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
