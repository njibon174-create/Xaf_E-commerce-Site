"use client";

import { useCart } from "@/lib/store";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus, X } from "lucide-react";

export default function CartSheet() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity } = useCart();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <motion.div
            className="absolute inset-0 bg-obsidian/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
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
              <h2 className="font-serif text-xl font-medium text-pure">Your cart</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate transition-colors"
                aria-label="Close cart"
              >
                <X size={18} className="text-fog" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <p className="text-fog text-sm mb-1">Your cart is resting.</p>
                  <p className="text-fog/60 text-xs">Browse the collection and add pieces you love.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        className="flex gap-3 bg-slate/30 rounded-xl p-2"
                      >
                        <div className="w-20 h-24 rounded-lg bg-slate overflow-hidden flex-shrink-0 relative">
                          <Image
                            src={item.images[0]}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="text-sm font-semibold text-cloud truncate">{item.name}</h4>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-fog hover:text-error transition-colors"
                                aria-label="Remove item"
                              >
                                <X size={14} />
                              </button>
                            </div>
                            <p className="text-xs text-fog mt-0.5">${item.price.toLocaleString()}</p>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-0 bg-obsidian rounded-lg border border-slate">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center text-fog hover:text-cloud transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-6 text-center text-xs text-pure font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-fog hover:text-cloud transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <span className="text-sm text-pure font-medium">
                              ${(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-4 pb-6 pt-3 border-t border-slate">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-fog">Subtotal</span>
                  <span className="text-base text-pure font-semibold">${subtotal.toLocaleString()}</span>
                </div>
                <p className="text-xs text-fog/70 mb-4">Shipping and taxes calculated at checkout.</p>
                <Button fullWidth variant="primary">
                  Checkout
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
