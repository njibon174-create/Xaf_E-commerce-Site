"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Home, Search, Heart, User, ShoppingBag } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Shop", icon: Search },
  { href: "/wishlist", label: "Wishlist", icon: Heart },
  { href: "/account", label: "Account", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 h-16 bg-charcoal border-t border-slate pb-safe">
      <div className="mx-auto max-w-md h-full flex items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 w-14 h-full rounded-xl transition-colors relative"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-x-3 top-2 bottom-2 rounded-xl bg-gold-soft"
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                />
              )}
              <Icon
                size={20}
                strokeWidth={1.5}
                className={`transition-colors ${isActive ? "text-gold" : "text-fog"}`}
              />
              <span className={`text-[10px] font-medium tracking-wide ${isActive ? "text-gold" : "text-fog"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
