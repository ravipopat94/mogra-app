// ─── Women's products ──────────────────────────────────────────────────────

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  gender: "women" | "men";
  description: string;
  details: string[];
  image: string;
  images?: string[];
  featured: boolean;
  sizes: string[];
}

export const products: Product[] = [
  {
    id: "w1",
    slug: "mogra-white-kurta",
    name: "Mogra White Kurta",
    price: 2499,
    category: "Kurtas",
    gender: "women",
    description:
      "A timeless white kurta crafted from premium cotton with delicate hand-embroidered mogra motifs at the neckline.",
    details: [
      "100% Premium Cotton",
      "Hand-embroidered neckline",
      "Regular fit",
      "Machine washable",
      'Length: 42"',
    ],
    image: "https://picsum.photos/seed/mogra-w1/600/750",
    featured: true,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "w2",
    slug: "ivory-linen-co-ord",
    name: "Ivory Linen Co-ord",
    price: 3999,
    category: "Co-ords",
    gender: "women",
    description:
      "A breathable ivory linen co-ord set perfect for warm evenings and special occasions.",
    details: [
      "100% Linen",
      "Relaxed fit",
      "Cropped top + wide-leg trousers",
      "Dry clean recommended",
    ],
    image: "https://picsum.photos/seed/mogra-w2/600/750",
    featured: true,
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "w3",
    slug: "blush-anarkali",
    name: "Blush Anarkali",
    price: 5499,
    category: "Anarkalis",
    gender: "women",
    description:
      "An ethereal blush anarkali with a flowing silhouette and intricate floral prints.",
    details: [
      "Georgette fabric",
      "Flowy anarkali silhouette",
      "Comes with dupatta",
      "Dry clean only",
    ],
    image: "https://picsum.photos/seed/mogra-w3/600/750",
    featured: true,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "w4",
    slug: "terracotta-block-print-dress",
    name: "Terracotta Block Print Dress",
    price: 2899,
    category: "Dresses",
    gender: "women",
    description:
      "A vibrant terracotta dress featuring hand block-printed motifs inspired by Rajasthani art.",
    details: [
      "100% Cotton",
      "Hand block-printed",
      "Midi length",
      "Regular fit",
      "Machine washable",
    ],
    image: "https://picsum.photos/seed/mogra-w4/600/750",
    featured: false,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "w5",
    slug: "sage-palazzo-set",
    name: "Sage Palazzo Set",
    price: 3499,
    category: "Co-ords",
    gender: "women",
    description:
      "A graceful sage green palazzo set, effortlessly chic for day-to-night dressing.",
    details: [
      "Rayon fabric",
      "Tunic top + palazzo pants",
      "Regular fit",
      "Hand wash cold",
    ],
    image: "https://picsum.photos/seed/mogra-w5/600/750",
    featured: false,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(gender?: "women"): Product[] {
  return products.filter(
    (p) => p.featured && (gender ? p.gender === gender : true)
  );
}

export function getProductsByGender(gender: "women" | "men"): Product[] {
  return products.filter((p) => p.gender === gender);
}

export const womenCategories = ["All", "Kurtas", "Co-ords", "Anarkalis", "Dresses"];

// ─── Men's shirts — fabric model ───────────────────────────────────────────

export interface Fabric {
  id: string;
  slug: string;
  name: string;
  description: string;
  composition: string;
  images: string[]; // first image used as catalog card thumbnail
  featured: boolean;
  styledImages?: string[]; // AI-generated lookbook photos — enables "See it styled" link
}

export const fabrics: Fabric[] = [
  {
    id: "f1",
    slug: "black-white-ikat",
    name: "Black & White Handwoven Ikat",
    description:
      "A striking handwoven ikat in monochrome — bold diamond motifs with the characteristic feathered edges of traditional resist-dyeing. Each piece carries the subtle irregularities of the handloom.",
    composition: "Handwoven Cotton Ikat",
    images: [
      "/fabrics/ikat-bw-1.png",
      "/fabrics/ikat-bw-2.png",
    ],
    featured: true,
  },
  {
    id: "f2",
    slug: "gray-chikankari",
    name: "Gray Hand-Woven Chikankari",
    description:
      "A refined gray fabric featuring the delicate floral embroidery of traditional Chikankari — a craft perfected in Lucknow over centuries. Lightweight and breathable, with a quiet elegance that works as well at a formal dinner as it does at a summer wedding.",
    composition: "Hand-Woven Cotton Chikankari",
    images: [
      "/fabrics/chikankari-gray-1.png",
      "/fabrics/chikankari-gray-2.png",
    ],
    featured: true,
  },
  {
    id: "f3",
    slug: "summer-blue-linen",
    name: "Summer Blue Linen",
    description:
      "A crisp, breathable linen in a calm summer blue — the kind of fabric that gets better with every wear. Effortless for warm days, sharp enough for evenings.",
    composition: "100% Linen",
    images: [
      "/fabrics/linen-blue-1.png",
      "/fabrics/linen-blue-2.png",
    ],
    featured: true,
  },
  {
    id: "f4",
    slug: "white-cotton-eyelet",
    name: "White Cotton Eyelet",
    description:
      "A clean, airy white cotton with delicate eyelet embroidery — small perforated patterns that let light and air through. Fresh and refined, it works beautifully for warm weather and festive occasions alike.",
    composition: "100% Cotton Eyelet",
    images: [
      "/fabrics/eyelet-white-1.png",
      "/fabrics/eyelet-white-2.png",
    ],
    styledImages: [
      "/styled/white-cotton-eyelet/1.png",
      "/styled/white-cotton-eyelet/2.jpg",
      "/styled/white-cotton-eyelet/3.png",
    ],
    featured: true,
  },
];

export function getFabricBySlug(slug: string): Fabric | undefined {
  return fabrics.find((f) => f.slug === slug);
}

export function getFeaturedFabrics(): Fabric[] {
  return fabrics.filter((f) => f.featured);
}

// ─── Shirt configuration options ───────────────────────────────────────────

export const COLLAR_STYLES = ["Standard Collar", "Chinese Collar", "Cuban Collar"] as const;
export const SLEEVE_LENGTHS = ["Long", "Short"] as const;
export const SHIRT_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "Custom"] as const;

export const STANDARD_PRICE = 50;
export const CUSTOM_PRICE = 70;

export const WHATSAPP_NUMBER = "919718568455";
export const ORDER_EMAIL = "team@shopmogra.com";
