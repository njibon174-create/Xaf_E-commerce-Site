export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  category: string;
  description: string;
  images: string[];
  colors: string[];
  sizes?: string[];
  inStock: boolean;
  badge?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export const categories: Category[] = [
  { id: "bags", name: "Bags", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80" },
  { id: "wallets", name: "Wallets", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80" },
  { id: "belts", name: "Belts", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80" },
  { id: "jewelry", name: "Jewelry", image: "https://images.unsplash.com/photo-1515562141589-67f0d569b6c2?w=800&q=80" },
  { id: "footwear", name: "Footwear", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80" },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Tuscany Leather Tote",
    price: 890,
    currency: "USD",
    category: "bags",
    description: "Full-grain Italian leather with hand-stitched detailing. Unlined interior ages gracefully.",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
    ],
    colors: ["#1a1a1a", "#8B4513", "#c5a253"],
    sizes: ["M"],
    inStock: true,
    badge: "New",
  },
  {
    id: "2",
    name: "Siena Bifold Wallet",
    price: 320,
    currency: "USD",
    category: "wallets",
    description: "Slim bifold in vegetably tanned leather. Eight card slots and a concealed note compartment.",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80",
    ],
    colors: ["#1a1a1a", "#5c4033", "#c5a253"],
    sizes: ["S"],
    inStock: true,
  },
  {
    id: "3",
    name: "Florence Reversible Belt",
    price: 210,
    currency: "USD",
    category: "belts",
    description: "Reversible design in matte and polished leather. Brushed-gold buckle with no branding.",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      "https://images.unsplash.com/photo-1614252369475-531eba835eb2?w=800&q=80",
    ],
    colors: ["#1a1a1a", "#5c4033"],
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: "4",
    name: "Verona Chain Bracelet",
    price: 540,
    currency: "USD",
    category: "jewelry",
    description: "18k gold-plated sterling silver with an antiqued finish. Lobster claw clasp.",
    images: [
      "https://images.unsplash.com/photo-1515562141589-67f0d569b6c2?w=800&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
    ],
    colors: ["#c5a253", "#e8e6e3"],
    inStock: true,
  },
  {
    id: "5",
    name: "Como Driving Loafers",
    price: 650,
    currency: "USD",
    category: "footwear",
    description: "Hand-lasted in Florence. Burnished leather sole and leather-lined interior.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f1?w=800&q=80",
    ],
    colors: ["#1a1a1a", "#8B4513"],
    sizes: ["40", "41", "42", "43", "44"],
    inStock: true,
  },
  {
    id: "6",
    name: "Milan Crossbody Bag",
    price: 720,
    currency: "USD",
    category: "bags",
    description: "Compact silhouette in pebbled calfskin. Adjustable strap and magnetic closure.",
    images: [
      "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=800&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
    ],
    colors: ["#1a1a1a", "#c5a253"],
    inStock: true,
  },
];

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
];

export const filterColors = [
  { value: "#1a1a1a", label: "Black" },
  { value: "#8B4513", label: "Brown" },
  { value: "#c5a253", label: "Gold" },
  { value: "#5c4033", label: "Espresso" },
  { value: "#e8e6e3", label: "Ivory" },
];
