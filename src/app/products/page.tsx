"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { products, type Product } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import Button from "@/components/ui/Button";
import FilterDrawer from "@/components/checkout/FilterDrawer";
import { SlidersHorizontal } from "lucide-react";
import { useCart } from "@/lib/store";

export default function ProductsPage() {
  const [filtered, setFiltered] = useState<Product[]>(products);
  const { setIsFilterOpen } = useCart();

  const handleAddToCart = (product: any, color: string, size?: string) => {
    useCart().addItem({
      ...product,
      quantity: 1,
      selectedColor: color,
      selectedSize: size,
    });
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="px-4 pt-8 pb-4 flex items-center justify-between">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-serif text-3xl font-medium text-pure"
        >
          All products
        </motion.h1>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate text-fog hover:text-cloud hover:border-fog/60 transition-colors"
        >
          <SlidersHorizontal size={16} />
          <span className="text-xs font-medium tracking-wide">Filter</span>
        </button>
      </div>

      <div className="px-4 pb-16">
        <p className="text-xs text-fog mb-4">{filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}</p>
        <div className="flex flex-col gap-4">
          {filtered.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>

      <FilterDrawer products={products} onFiltered={setFiltered} />
    </div>
  );
}
