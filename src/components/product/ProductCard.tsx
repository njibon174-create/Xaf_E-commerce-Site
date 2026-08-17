"use client";

import { Product } from "@/lib/data";
import Image from "next/image";
import { motion } from "motion/react";
import { Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index: number;
  onAddToCart: (product: Product, color: string, size?: string) => void;
}

export default function ProductCard({ product, index, onAddToCart }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-charcoal rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group"
    >
      <div className="relative aspect-[3/4] bg-slate overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 480px"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-gold text-obsidian text-[10px] font-semibold tracking-wider uppercase rounded-full">
            {product.badge}
          </span>
        )}
        <button
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-obsidian/50 backdrop-blur-sm text-cloud hover:text-gold transition-colors"
          aria-label="Add to wishlist"
        >
          <Heart size={16} strokeWidth={1.5} />
        </button>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-cloud leading-snug">{product.name}</h3>
        <p className="text-sm text-pure font-medium">${product.price.toLocaleString()}</p>
        <div className="flex items-center gap-1.5 mt-1">
          {product.colors.map((color) => (
            <span
              key={color}
              className="w-4 h-4 rounded-full border-2 border-transparent"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <button
          onClick={() => onAddToCart(product, product.colors[0], product.sizes?.[0])}
          className="mt-2 w-full py-2.5 bg-slate hover:bg-gold hover:text-obsidian text-cloud text-xs font-semibold tracking-wide rounded-xl transition-all duration-200 active:scale-[0.97]"
        >
          Add to cart
        </button>
      </div>
    </motion.div>
  );
}
