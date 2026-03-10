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
      "Ikat is one of the most labour-intensive weaving traditions in the world. Before a single thread touches the loom, bundles of yarn are hand-tied and dip-dyed in precise sequences to form the pattern. When the threads are finally woven together, the design reveals itself — and the characteristic feathered edges aren't a flaw. They're the signature of the handloom: proof that every centimetre was made by a person, not a machine.",
    composition: "Handwoven Cotton Ikat",
    images: [
      "/fabrics/ikat-bw-1b.png",
      "/fabrics/ikat-bw-2b.png",
    ],
    styledImages: [
      "/styled/black-white-ikat/1b.png",
      "/styled/black-white-ikat/2b.png",
      "/styled/black-white-ikat/3b.png",
    ],
    featured: true,
  },
  {
    id: "f2",
    slug: "gray-chikankari",
    name: "Gray Hand-Woven Chikankari",
    description:
      "Chikankari is a 400-year-old hand-embroidery tradition from Lucknow, believed to have been brought to India by Nur Jahan, wife of Emperor Jahangir. Artisans embroider each piece entirely by hand using up to 32 distinct stitches — including the delicate shadow stitch that gives Chikankari its characteristic subtle texture. A single garment can take days to complete. Lightweight and breathable, with a quiet elegance that works as well at a formal dinner as it does at a summer wedding.",
    composition: "Hand-Woven Cotton Chikankari",
    images: [
      "/fabrics/chikankari-gray-1b.png",
      "/fabrics/chikankari-gray-2b.png",
    ],
    styledImages: [
      "/styled/gray-chikankari/1b.png",
      "/styled/gray-chikankari/2b.png",
      "/styled/gray-chikankari/3b.png",
    ],
    featured: true,
  },
  {
    id: "f3",
    slug: "summer-blue-linen",
    name: "Summer Blue Linen",
    description:
      "Linen is one of the few fabrics that genuinely improves with age — the more you wear and wash it, the softer it becomes. Made from flax fibres, it's naturally moisture-wicking and temperature-regulating, keeping you cool when it's warm and comfortable when it isn't. The slight texture and natural slub aren't imperfections; they're the character of the fibre. This particular shade is the kind of calm, easy blue that works just as well tucked into trousers as it does worn loose on a warm evening.",
    composition: "100% Linen",
    images: [
      "/fabrics/linen-blue-1b.png",
      "/fabrics/linen-blue-2c.png",
    ],
    styledImages: [
      "/styled/summer-blue-linen/1b.png",
      "/styled/summer-blue-linen/2b.jpg",
      "/styled/summer-blue-linen/3b.png",
    ],
    featured: true,
  },
  {
    id: "f4",
    slug: "white-cotton-eyelet",
    name: "White Cotton Eyelet",
    description:
      "Eyelet is cotton with intention. Holes are precisely cut into the woven fabric, then each opening is finished with embroidery stitching around the edge — preventing fraying and turning a functional detail into a decorative one. The result is a fabric that breathes exceptionally well while looking refined. Clean, airy, and effortlessly suited to warm weather and festive occasions alike.",
    composition: "100% Cotton Eyelet",
    images: [
      "/fabrics/eyelet-white-1b.png",
      "/fabrics/eyelet-white-2b.png",
    ],
    styledImages: [
      "/styled/white-cotton-eyelet/1b.png",
      "/styled/white-cotton-eyelet/2b.jpg",
      "/styled/white-cotton-eyelet/3b.png",
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
