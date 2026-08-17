"use client";

import { motion } from "motion/react";
import { categories, products } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import { useCart } from "@/lib/store";

export default function Home() {
  const { addItem } = useCart();

  const handleAddToCart = (product: any, color: string, size?: string) => {
    addItem({
      ...product,
      quantity: 1,
      selectedColor: color,
      selectedSize: size,
    });
  };

  return (
    <div className="mx-auto max-w-md">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-charcoal">
          <img
            src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80"
            alt="Hero"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 text-center px-6"
        >
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold mb-4">
            New Season
          </p>
          <h1 className="font-serif text-4xl font-medium text-pure leading-tight mb-4">
            Quiet luxury,<br />considered design.
          </h1>
          <p className="text-sm text-fog mb-8 max-w-xs mx-auto">
            Italian leather goods built to age gracefully. No logos, no excess.
          </p>
          <a
            href="/products"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-gold text-obsidian text-sm font-semibold tracking-wide rounded-xl hover:bg-gold/90 transition-colors active:scale-[0.97]"
          >
            Explore collection
          </a>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="px-4 pt-16 pb-12">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="font-serif text-2xl font-medium text-pure mb-6"
        >
          Shop by category
        </motion.h2>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.id}
              href="/products"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="flex-shrink-0 w-28 h-28 rounded-2xl overflow-hidden relative"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent" />
              <span className="absolute bottom-2.5 left-2.5 text-xs font-semibold text-pure tracking-wide">
                {cat.name}
              </span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="px-4 pt-8 pb-16">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="font-serif text-2xl font-medium text-pure mb-6"
        >
          Trending now
        </motion.h2>
        <div className="flex flex-col gap-4">
          {products.slice(0, 3).map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
