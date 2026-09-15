export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  mrp: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: "MuscleBlaze" | "Pintola" | "Alpino";
  category: "Protein" | "Creatine" | "Oats" | "Muesli" | "Peanut Butter" | "Vitamins & Wellness";
  price: number;
  mrp: number;
  discount: number;
  rating: number;
  reviewCount: number;
  stock: number;
  lowStockThreshold: number;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  images: string[];
  description: string;
  nutrition: {
    protein: string;
    calories: string;
    carbs: string;
    fat: string;
    servingSize: string;
  };
  ingredients: string;
  howToUse: string;
  flavours: string[];
  sizes: string[];
  variants: ProductVariant[];
  status: "Active" | "Draft" | "Archived";
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  brand: string;
  image: string;
  flavour?: string;
  size?: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  totalAmount: number;
  paymentMethod: "UPI" | "Card" | "NetBanking" | "COD";
  paymentStatus: "Paid" | "Pending" | "Failed";
  orderStatus: "Order Confirmed" | "Packed" | "Shipped" | "Out for Delivery" | "Delivered" | "Cancelled";
  trackingNumber: string;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  discountFixed?: number;
  minOrderValue: number;
  maxDiscount: number;
  validUntil: string;
  usageCount: number;
  usageLimit: number;
  isActive: boolean;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  bgGradient: string;
  imageUrl: string;
  isActive: boolean;
}

// Initial 50 Product Seed List
export const INITIAL_PRODUCTS: Product[] = [
  // --- MUSCLEBLAZE (17 PRODUCTS) ---
  {
    id: "mb-01",
    name: "Biozyme Performance Whey",
    slug: "biozyme-performance-whey",
    brand: "MuscleBlaze",
    category: "Protein",
    price: 2999,
    mrp: 3499,
    discount: 14,
    rating: 4.9,
    reviewCount: 2341,
    stock: 45,
    lowStockThreshold: 10,
    isBestSeller: true,
    isFeatured: true,
    images: ["/products/muscleblaze_01_MuscleBlaze_Biozyme_Perfo.jpg"],
    description: "Labdoor USA Certified Biozyme Performance Whey with Enhanced Absorption Formula (EAF®) customized for Indian digestive systems.",
    nutrition: { protein: "25g", calories: "120 kcal", carbs: "3g", fat: "1.5g", servingSize: "36g" },
    ingredients: "Whey Protein Concentrate, Cocoa Powder, Digestive Enzymes (EAF®), Emulsifier (INS 322), Sweetener (INS 955).",
    howToUse: "Add 1 scoop (36g) in 200ml cold water or milk. Shake well for 15-20 seconds in a shaker.",
    flavours: ["Rich Chocolate", "Café Mocha", "Magical Mango"],
    sizes: ["1 KG", "2 KG"],
    variants: [
      { id: "mb-01-1", name: "Rich Chocolate / 1 KG", price: 2999, mrp: 3499, stock: 25 },
      { id: "mb-01-2", name: "Rich Chocolate / 2 KG", price: 5499, mrp: 6499, stock: 20 },
    ],
    status: "Active",
    createdAt: "2026-01-10"
  },
  {
    id: "mb-02",
    name: "100% Raw Whey Protein Unflavoured",
    slug: "raw-whey-protein-unflavoured",
    brand: "MuscleBlaze",
    category: "Protein",
    price: 1899,
    mrp: 2299,
    discount: 17,
    rating: 4.7,
    reviewCount: 1540,
    stock: 30,
    lowStockThreshold: 8,
    isBestSeller: true,
    isFeatured: false,
    images: ["/products/muscleblaze_02_MuscleBlaze_Raw_Whey_Prot.jpg"],
    description: "Ultra-filtered 100% pure raw whey protein concentrate with no added sugar, artificial flavors, or preservatives. 5.2g BCAA per serving.",
    nutrition: { protein: "24g", calories: "116 kcal", carbs: "2g", fat: "1.2g", servingSize: "30g" },
    ingredients: "Whey Protein Concentrate (80%), Digestive Enzymes.",
    howToUse: "Mix 1 scoop in smoothies, oatmeal, or water as per your protein requirements.",
    flavours: ["Unflavoured"],
    sizes: ["1 KG", "2 KG"],
    variants: [{ id: "mb-02-1", name: "Unflavoured / 1 KG", price: 1899, mrp: 2299, stock: 30 }],
    status: "Active",
    createdAt: "2026-01-12"
  },
  {
    id: "mb-03",
    name: "Super Gainer XXL High Calorie",
    slug: "super-gainer-xxl",
    brand: "MuscleBlaze",
    category: "Protein",
    price: 2499,
    mrp: 2999,
    discount: 16,
    rating: 4.6,
    reviewCount: 980,
    stock: 22,
    lowStockThreshold: 5,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/muscleblaze_03_MuscleBlaze_Super_Gainer_.jpg"],
    description: "High-calorie mass gainer formulated with complex carbs and multi-stage proteins engineered for hardgainers.",
    nutrition: { protein: "22.5g", calories: "560 kcal", carbs: "112g", fat: "2.5g", servingSize: "150g" },
    ingredients: "Maltodextrin, Whey Protein Concentrate, Skimmed Milk Powder, Cocoa, Minerals & Vitamins.",
    howToUse: "Consume 1-2 servings daily with whole milk between meals or post-workout.",
    flavours: ["Chocolate", "Banana", "Vanilla"],
    sizes: ["1 KG", "3 KG"],
    variants: [{ id: "mb-03-1", name: "Chocolate / 1 KG", price: 2499, mrp: 2999, stock: 22 }],
    status: "Active",
    createdAt: "2026-01-14"
  },
  {
    id: "mb-04",
    name: "Creatine Monohydrate CreAMP",
    slug: "creatine-monohydrate-creamp",
    brand: "MuscleBlaze",
    category: "Creatine",
    price: 699,
    mrp: 899,
    discount: 22,
    rating: 4.9,
    reviewCount: 3820,
    stock: 60,
    lowStockThreshold: 15,
    isBestSeller: true,
    isFeatured: true,
    images: ["/products/muscleblaze_04_MuscleBlaze_Creatine_Mono.jpg"],
    description: "Trustified Certified 100% pure micronized CreAMP Creatine Monohydrate for explosive strength, muscle volumization, and endurance.",
    nutrition: { protein: "0g", calories: "0 kcal", carbs: "0g", fat: "0g", servingSize: "3g" },
    ingredients: "100% Pure Micronized Creatine Monohydrate (3000mg per serving).",
    howToUse: "Mix 1 scoop (3g) in 250ml water or fruit juice. Drink daily.",
    flavours: ["Unflavoured", "Fruit Punch", "Tangy Orange"],
    sizes: ["100g", "250g"],
    variants: [{ id: "mb-04-1", name: "Unflavoured / 250g", price: 699, mrp: 899, stock: 60 }],
    status: "Active",
    createdAt: "2026-01-15"
  },
  {
    id: "mb-05",
    name: "Pre Workout 200 Intense Energy",
    slug: "pre-workout-200",
    brand: "MuscleBlaze",
    category: "Vitamins & Wellness",
    price: 999,
    mrp: 1299,
    discount: 23,
    rating: 4.8,
    reviewCount: 1120,
    stock: 35,
    lowStockThreshold: 8,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/muscleblaze_05_MuscleBlaze_Pre_Workout_2.jpg"],
    description: "Advanced pre-workout formula with 200mg Caffeine, L-Citrulline, and Beta-Alanine for intense focus, pump, and endurance.",
    nutrition: { protein: "0g", calories: "5 kcal", carbs: "1g", fat: "0g", servingSize: "5g" },
    ingredients: "L-Citrulline DL-Malate, Beta Alanine, Anhydrous Caffeine, Taurine, Natural Flavor.",
    howToUse: "Take 1 scoop 20-30 minutes prior to intense training in 200ml cold water.",
    flavours: ["Fruit Splash", "Green Apple", "Blue Raspberry"],
    sizes: ["250g"],
    variants: [{ id: "mb-05-1", name: "Fruit Splash / 250g", price: 999, mrp: 1299, stock: 35 }],
    status: "Active",
    createdAt: "2026-01-16"
  },
  {
    id: "mb-06",
    name: "High Protein Peanut Butter Dark Chocolate",
    slug: "mb-high-protein-peanut-butter",
    brand: "MuscleBlaze",
    category: "Peanut Butter",
    price: 499,
    mrp: 649,
    discount: 23,
    rating: 4.8,
    reviewCount: 1750,
    stock: 40,
    lowStockThreshold: 10,
    isBestSeller: true,
    isFeatured: false,
    images: ["/products/muscleblaze_06_MuscleBlaze_High_Protein_.jpg"],
    description: "Roasted bold peanuts blended with premium whey protein isolate and rich dark chocolate. 37g protein per 100g.",
    nutrition: { protein: "12g", calories: "190 kcal", carbs: "7g", fat: "12g", servingSize: "32g" },
    ingredients: "Roasted Peanuts (80%), Whey Protein Isolate, Cocoa Powder, Dark Chocolate Compound.",
    howToUse: "Spread on whole wheat bread, mix in smoothies, or eat straight from jar.",
    flavours: ["Dark Chocolate", "Classic Crunchy"],
    sizes: ["1 KG"],
    variants: [{ id: "mb-06-1", name: "Dark Chocolate / 1 KG", price: 499, mrp: 649, stock: 40 }],
    status: "Active",
    createdAt: "2026-01-18"
  },
  {
    id: "mb-07",
    name: "High Protein Oats Dark Chocolate",
    slug: "mb-high-protein-oats",
    brand: "MuscleBlaze",
    category: "Oats",
    price: 399,
    mrp: 499,
    discount: 20,
    rating: 4.7,
    reviewCount: 1320,
    stock: 50,
    lowStockThreshold: 12,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/muscleblaze_07_MuscleBlaze_High_Protein_.jpg"],
    description: "Instant rolled oats enriched with whey protein, chia seeds, pumpkin seeds, and real cocoa for a power-packed breakfast.",
    nutrition: { protein: "17g", calories: "180 kcal", carbs: "22g", fat: "3.5g", servingSize: "50g" },
    ingredients: "Rolled Oats (70%), Whey Protein Concentrate, Cocoa, Seeds (Chia, Pumpkin).",
    howToUse: "Boil 50g oats in 200ml milk for 3 minutes or soak overnight.",
    flavours: ["Dark Chocolate", "Berry Blast"],
    sizes: ["1 KG"],
    variants: [{ id: "mb-07-1", name: "Dark Chocolate / 1 KG", price: 399, mrp: 499, stock: 50 }],
    status: "Active",
    createdAt: "2026-01-20"
  },
  {
    id: "mb-08",
    name: "Triple Strength Fish Oil Gold",
    slug: "fish-oil-gold",
    brand: "MuscleBlaze",
    category: "Vitamins & Wellness",
    price: 849,
    mrp: 1099,
    discount: 23,
    rating: 4.9,
    reviewCount: 890,
    stock: 28,
    lowStockThreshold: 5,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/muscleblaze_08_MuscleBlaze_Fish_Oil_Gold.jpg"],
    description: "Molecularly distilled, anti-reflux enteric-coated softgels providing 560mg EPA and 400mg DHA for heart, joint, and brain health.",
    nutrition: { protein: "0g", calories: "10 kcal", carbs: "0g", fat: "1g", servingSize: "1 Softgel" },
    ingredients: "Molecularly Distilled Deep Sea Fish Oil (1000mg), Gelatin Shell.",
    howToUse: "Take 1 softgel twice daily after meals with water.",
    flavours: ["Unflavoured"],
    sizes: ["60 Softgels"],
    variants: [{ id: "mb-08-1", name: "60 Softgels", price: 849, mrp: 1099, stock: 28 }],
    status: "Active",
    createdAt: "2026-01-22"
  },
  {
    id: "mb-09",
    name: "MB-Vite Daily Multivitamin",
    slug: "mb-vite-multivitamin",
    brand: "MuscleBlaze",
    category: "Vitamins & Wellness",
    price: 549,
    mrp: 699,
    discount: 21,
    rating: 4.8,
    reviewCount: 2100,
    stock: 55,
    lowStockThreshold: 10,
    isBestSeller: true,
    isFeatured: false,
    images: ["/products/muscleblaze_09_MuscleBlaze_Multivitamin_.jpg"],
    description: "Comprehensive multivitamin fortified with 25 essential vitamins, minerals, digestive enzymes, and Panax Ginseng Extract.",
    nutrition: { protein: "0g", calories: "2 kcal", carbs: "0.5g", fat: "0g", servingSize: "1 Tablet" },
    ingredients: "Vitamins A, C, D3, E, B-Complex, Zinc, Magnesium, Panax Ginseng Extract.",
    howToUse: "Take 1 tablet daily with breakfast or lunch.",
    flavours: ["Unflavoured"],
    sizes: ["60 Tablets", "120 Tablets"],
    variants: [{ id: "mb-09-1", name: "60 Tablets", price: 549, mrp: 699, stock: 55 }],
    status: "Active",
    createdAt: "2026-01-24"
  },
  {
    id: "mb-10",
    name: "Mass Gainer XXL Chocolate Fudge",
    slug: "mass-gainer-xxl-chocolate",
    brand: "MuscleBlaze",
    category: "Protein",
    price: 1999,
    mrp: 2399,
    discount: 17,
    rating: 4.6,
    reviewCount: 760,
    stock: 18,
    lowStockThreshold: 5,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/muscleblaze_10_MuscleBlaze_Mass_Gainer_X.jpg"],
    description: "Balanced complex carb-to-protein mass gainer engineered for optimal muscle hypertrophy and energy replenishment.",
    nutrition: { protein: "20g", calories: "450 kcal", carbs: "85g", fat: "2g", servingSize: "120g" },
    ingredients: "Complex Carbs Matrix, Whey Concentrate, Soy Isolate, Cocoa Powder.",
    howToUse: "Mix 1-2 scoops in milk or water post workout.",
    flavours: ["Chocolate Fudge"],
    sizes: ["1 KG"],
    variants: [{ id: "mb-10-1", name: "1 KG", price: 1999, mrp: 2399, stock: 18 }],
    status: "Active",
    createdAt: "2026-01-25"
  },
  {
    id: "mb-11",
    name: "Iso Zero 100% Pure Whey Isolate",
    slug: "iso-zero-whey-isolate",
    brand: "MuscleBlaze",
    category: "Protein",
    price: 3699,
    mrp: 4299,
    discount: 14,
    rating: 4.9,
    reviewCount: 1430,
    stock: 25,
    lowStockThreshold: 6,
    isBestSeller: false,
    isFeatured: true,
    images: ["/products/muscleblaze_11_MuscleBlaze_Iso_Zero_Whey.jpg"],
    description: "Zero carb, zero lactose, zero fat 100% pure whey protein isolate for ultra-lean muscle gains.",
    nutrition: { protein: "27g", calories: "110 kcal", carbs: "0g", fat: "0g", servingSize: "30g" },
    ingredients: "Cross-Flow Microfiltered Whey Protein Isolate, Natural Chocolate Flavor.",
    howToUse: "Mix 1 scoop in 200ml water immediately post workout.",
    flavours: ["Strawberry Frost", "Chocolate Smooth"],
    sizes: ["1 KG", "2 KG"],
    variants: [{ id: "mb-11-1", name: "Chocolate Smooth / 1 KG", price: 3699, mrp: 4299, stock: 25 }],
    status: "Active",
    createdAt: "2026-01-26"
  },
  {
    id: "mb-12",
    name: "High Protein Bar 20g Chocolate Crunch",
    slug: "protein-bar-20g",
    brand: "MuscleBlaze",
    category: "Vitamins & Wellness",
    price: 899,
    mrp: 1080,
    discount: 17,
    rating: 4.7,
    reviewCount: 540,
    stock: 35,
    lowStockThreshold: 8,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/muscleblaze_12_MuscleBlaze_Protein_Bar_2.jpg"],
    description: "Delicious box of 6 high-protein bars packed with 20g protein, 5g fiber, and zero added sugar.",
    nutrition: { protein: "20g", calories: "220 kcal", carbs: "18g", fat: "6g", servingSize: "65g Bar" },
    ingredients: "Protein Blend (Whey Isolate, Milk Isolate), Dark Chocolate, Almonds, Crispies.",
    howToUse: "Enjoy as a convenient healthy snack anytime on-the-go.",
    flavours: ["Chocolate Hazelnut", "Choco Fudge"],
    sizes: ["Box of 6"],
    variants: [{ id: "mb-12-1", name: "Box of 6 Bars", price: 899, mrp: 1080, stock: 35 }],
    status: "Active",
    createdAt: "2026-01-28"
  },
  {
    id: "mb-13",
    name: "Biozyme Iso-Zero Lactose Free Whey",
    slug: "biozyme-iso-zero",
    brand: "MuscleBlaze",
    category: "Protein",
    price: 3899,
    mrp: 4499,
    discount: 13,
    rating: 4.9,
    reviewCount: 920,
    stock: 15,
    lowStockThreshold: 4,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/muscleblaze_13_MuscleBlaze_Biozyme_Iso_Z.jpg"],
    description: "Combining Biozyme EAF® digestive technology with pure Whey Isolate for zero lactose sensitivity.",
    nutrition: { protein: "27g", calories: "112 kcal", carbs: "0.2g", fat: "0.1g", servingSize: "31.5g" },
    ingredients: "Whey Protein Isolate, Biozyme Digestive Enzymes, Cocoa Powder.",
    howToUse: "1 scoop in 200ml cold water.",
    flavours: ["Gourmet Chocolate"],
    sizes: ["1 KG"],
    variants: [{ id: "mb-13-1", name: "Gourmet Chocolate / 1 KG", price: 3899, mrp: 4499, stock: 15 }],
    status: "Active",
    createdAt: "2026-01-30"
  },
  {
    id: "mb-14",
    name: "BCAA Pro 8000 Intra Workout",
    slug: "bcaa-pro-8000",
    brand: "MuscleBlaze",
    category: "Vitamins & Wellness",
    price: 1199,
    mrp: 1499,
    discount: 20,
    rating: 4.8,
    reviewCount: 610,
    stock: 24,
    lowStockThreshold: 6,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/muscleblaze_14_MuscleBlaze_BCAA_Pro.jpg"],
    description: "2:1:1 ratio BCAAs fortified with 2.5g L-Glutamine and Electrolytes to prevent muscle breakdown.",
    nutrition: { protein: "7g", calories: "15 kcal", carbs: "1g", fat: "0g", servingSize: "15g" },
    ingredients: "L-Leucine, L-Isoleucine, L-Valine, L-Glutamine, Sodium Chloride, Potassium Chloride.",
    howToUse: "Sip 1 scoop in 500ml water throughout your workout session.",
    flavours: ["Watermelon", "Fruit Punch"],
    sizes: ["450g"],
    variants: [{ id: "mb-14-1", name: "Watermelon / 450g", price: 1199, mrp: 1499, stock: 24 }],
    status: "Active",
    createdAt: "2026-02-01"
  },
  {
    id: "mb-15",
    name: "Whey Premium Blend Protein",
    slug: "whey-premium-blend",
    brand: "MuscleBlaze",
    category: "Protein",
    price: 2299,
    mrp: 2699,
    discount: 15,
    rating: 4.6,
    reviewCount: 410,
    stock: 30,
    lowStockThreshold: 7,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/muscleblaze_15_MuscleBlaze_Whey_Premium.jpg"],
    description: "Premium whey concentrate and isolate matrix enhanced with DigeZyme for smooth digestion.",
    nutrition: { protein: "24g", calories: "125 kcal", carbs: "4g", fat: "2g", servingSize: "33g" },
    ingredients: "Whey Protein Concentrate, Whey Protein Isolate, Cocoa Powder, DigeZyme.",
    howToUse: "1 scoop in 200ml milk or water.",
    flavours: ["Rich Milk Chocolate"],
    sizes: ["1 KG"],
    variants: [{ id: "mb-15-1", name: "1 KG", price: 2299, mrp: 2699, stock: 30 }],
    status: "Active",
    createdAt: "2026-02-02"
  },
  {
    id: "mb-16",
    name: "Biozyme Daily Multivitamin Men",
    slug: "biozyme-daily-multivitamin",
    brand: "MuscleBlaze",
    category: "Vitamins & Wellness",
    price: 699,
    mrp: 899,
    discount: 22,
    rating: 4.8,
    reviewCount: 320,
    stock: 40,
    lowStockThreshold: 8,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/muscleblaze_16_MuscleBlaze_Biozyme_Daily.jpg"],
    description: "Engineered specifically for active men with 30 key nutrients, joint support, and stamina boosters.",
    nutrition: { protein: "0g", calories: "2 kcal", carbs: "0.2g", fat: "0g", servingSize: "1 Tablet" },
    ingredients: "Vitamins A-Z, Cissus Quadrangularis, Ashwagandha, Testo-Boosters.",
    howToUse: "1 tablet daily after breakfast.",
    flavours: ["Unflavoured"],
    sizes: ["60 Tablets"],
    variants: [{ id: "mb-16-1", name: "60 Tablets", price: 699, mrp: 899, stock: 40 }],
    status: "Active",
    createdAt: "2026-02-04"
  },
  {
    id: "mb-17",
    name: "Peanut Butter Crunchy Classic",
    slug: "peanut-butter-crunchy-classic",
    brand: "MuscleBlaze",
    category: "Peanut Butter",
    price: 349,
    mrp: 449,
    discount: 22,
    rating: 4.7,
    reviewCount: 510,
    stock: 45,
    lowStockThreshold: 10,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/muscleblaze_17_MuscleBlaze_Peanut_Butter.jpg"],
    description: "100% slow-roasted bold peanuts with real peanut chunks. High protein energy booster.",
    nutrition: { protein: "26g", calories: "195 kcal", carbs: "6g", fat: "14g", servingSize: "32g" },
    ingredients: "Slow-Roasted Peanuts (100%). No added salt or hydrogenated oils.",
    howToUse: "Spread on toast or add to protein shakes.",
    flavours: ["Crunchy"],
    sizes: ["1 KG"],
    variants: [{ id: "mb-17-1", name: "1 KG", price: 349, mrp: 449, stock: 45 }],
    status: "Active",
    createdAt: "2026-02-05"
  },

  // --- ALPINO (17 PRODUCTS) ---
  {
    id: "alp-01",
    name: "Natural Peanut Butter Crunch (30% Protein)",
    slug: "alpino-natural-peanut-butter-crunch",
    brand: "Alpino",
    category: "Peanut Butter",
    price: 349,
    mrp: 425,
    discount: 18,
    rating: 4.8,
    reviewCount: 2890,
    stock: 50,
    lowStockThreshold: 12,
    isBestSeller: true,
    isFeatured: true,
    images: ["/products/alpino_01_Alpino_Natural_Peanut_But.png"],
    description: "Made with 100% roasted peanuts from Junagadh. 30% Protein, No Added Sugar, No Added Salt, No Trans Fat.",
    nutrition: { protein: "30g", calories: "190 kcal", carbs: "6g", fat: "14g", servingSize: "32g" },
    ingredients: "100% Roasted Peanuts.",
    howToUse: "Spread on brown bread, fruit slices, or add to smoothie bowls.",
    flavours: ["Crunchy", "Smooth"],
    sizes: ["1 KG"],
    variants: [{ id: "alp-01-1", name: "Crunchy / 1 KG", price: 349, mrp: 425, stock: 50 }],
    status: "Active",
    createdAt: "2026-01-11"
  },
  {
    id: "alp-02",
    name: "High Protein Peanut Butter Dark Chocolate",
    slug: "alpino-high-protein-pb-dark-chocolate",
    brand: "Alpino",
    category: "Peanut Butter",
    price: 449,
    mrp: 549,
    discount: 18,
    rating: 4.9,
    reviewCount: 1980,
    stock: 35,
    lowStockThreshold: 8,
    isBestSeller: true,
    isFeatured: false,
    images: ["/products/alpino_02_Alpino_High_Protein_Peanu.jpg"],
    description: "Fortified with premium whey protein isolate and dark cocoa. 30% protein power per serving for muscle fitness.",
    nutrition: { protein: "10g", calories: "185 kcal", carbs: "8g", fat: "12g", servingSize: "32g" },
    ingredients: "Roasted Peanuts, Whey Protein Concentrate, Cocoa Powder, Brown Sugar.",
    howToUse: "Perfect topping for breakfast pancakes, oatmeal, and protein toasts.",
    flavours: ["Dark Chocolate"],
    sizes: ["1 KG"],
    variants: [{ id: "alp-02-1", name: "1 KG", price: 449, mrp: 549, stock: 35 }],
    status: "Active",
    createdAt: "2026-01-13"
  },
  {
    id: "alp-03",
    name: "Super Peanut Butter Smooth",
    slug: "alpino-super-peanut-butter-smooth",
    brand: "Alpino",
    category: "Peanut Butter",
    price: 329,
    mrp: 399,
    discount: 18,
    rating: 4.7,
    reviewCount: 870,
    stock: 40,
    lowStockThreshold: 10,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/alpino_03_Alpino_Super_Peanut_Butte.jpg"],
    description: "Ultra smooth creamy texture made from 100% roasted peanuts. Easy to mix, spread, and blend into fitness shakes.",
    nutrition: { protein: "30g", calories: "190 kcal", carbs: "6g", fat: "14g", servingSize: "32g" },
    ingredients: "100% Organic Roasted Peanuts.",
    howToUse: "Blends effortlessly into protein shakes and dip bowls.",
    flavours: ["Smooth"],
    sizes: ["1 KG"],
    variants: [{ id: "alp-03-1", name: "1 KG", price: 329, mrp: 399, stock: 40 }],
    status: "Active",
    createdAt: "2026-01-15"
  },
  {
    id: "alp-04",
    name: "Organic Unsweetened Peanut Butter",
    slug: "alpino-organic-unsweetened-pb",
    brand: "Alpino",
    category: "Peanut Butter",
    price: 399,
    mrp: 499,
    discount: 20,
    rating: 4.8,
    reviewCount: 650,
    stock: 25,
    lowStockThreshold: 5,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/alpino_04_Alpino_Organic_Peanut_But.jpg"],
    description: "Certified 100% organic roasted peanuts sourced directly from organic farms in Gujarat. Zero added sugar, zero preservatives.",
    nutrition: { protein: "30g", calories: "190 kcal", carbs: "5g", fat: "15g", servingSize: "32g" },
    ingredients: "Certified Organic Peanuts (100%).",
    howToUse: "Daily keto and fitness diet spread.",
    flavours: ["Crunchy"],
    sizes: ["1 KG"],
    variants: [{ id: "alp-04-1", name: "1 KG", price: 399, mrp: 499, stock: 25 }],
    status: "Active",
    createdAt: "2026-01-17"
  },
  {
    id: "alp-05",
    name: "Fitness Peanut Butter High Fiber Super Seeds",
    slug: "alpino-fitness-peanut-butter",
    brand: "Alpino",
    category: "Peanut Butter",
    price: 359,
    mrp: 449,
    discount: 20,
    rating: 4.6,
    reviewCount: 430,
    stock: 30,
    lowStockThreshold: 6,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/alpino_05_Alpino_Fitness_Peanut_But.jpg"],
    description: "Enriched with chia seeds, flaxseeds, and sunflower seeds for rich dietary fiber, Omega-3, and digestive wellness.",
    nutrition: { protein: "28g", calories: "185 kcal", carbs: "8g", fat: "13g", servingSize: "32g" },
    ingredients: "Peanuts, Flaxseeds, Chia Seeds, Sunflower Seeds.",
    howToUse: "Spread on whole grain toasts.",
    flavours: ["Seeds Crunch"],
    sizes: ["1 KG"],
    variants: [{ id: "alp-05-1", name: "1 KG", price: 359, mrp: 449, stock: 30 }],
    status: "Active",
    createdAt: "2026-01-19"
  },
  {
    id: "alp-06",
    name: "Super Oats High Protein Chocolate",
    slug: "alpino-super-oats-high-protein",
    brand: "Alpino",
    category: "Oats",
    price: 349,
    mrp: 425,
    discount: 18,
    rating: 4.8,
    reviewCount: 1210,
    stock: 45,
    lowStockThreshold: 10,
    isBestSeller: true,
    isFeatured: true,
    images: ["/products/alpino_06_Alpino_Super_Oats_High_Protein.jpg"],
    description: "Rolled oats packed with 22g protein per 100g, real dark cocoa, seeds, and fruits. Perfect healthy breakfast fuel.",
    nutrition: { protein: "11g", calories: "175 kcal", carbs: "24g", fat: "3g", servingSize: "50g" },
    ingredients: "Rolled Oats (75%), Whey Protein, Cocoa Powder, Pumpkin Seeds.",
    howToUse: "Cook in hot milk for 3 minutes or make cold overnight oats.",
    flavours: ["Dark Chocolate", "Jaggery Nuts"],
    sizes: ["400g", "1 KG"],
    variants: [{ id: "alp-06-1", name: "Dark Chocolate / 1 KG", price: 349, mrp: 425, stock: 45 }],
    status: "Active",
    createdAt: "2026-01-21"
  },
  {
    id: "alp-07",
    name: "De-Fatted Peanut Powder Low Fat",
    slug: "alpino-peanut-powder-low-fat",
    brand: "Alpino",
    category: "Peanut Butter",
    price: 399,
    mrp: 499,
    discount: 20,
    rating: 4.7,
    reviewCount: 520,
    stock: 20,
    lowStockThreshold: 5,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/alpino_07_Alpino_Peanut_Powder_Low_.jpg"],
    description: "85% less fat than traditional peanut butter! 50% plant protein content. Blends effortlessly into protein shakes and baking recipes.",
    nutrition: { protein: "6g", calories: "50 kcal", carbs: "3g", fat: "1.5g", servingSize: "12g" },
    ingredients: "Pressed Roasted Peanuts, Sugar, Sea Salt.",
    howToUse: "Mix 2 tbsp powder with 1 tbsp water to make low-calorie peanut butter paste.",
    flavours: ["Original"],
    sizes: ["250g"],
    variants: [{ id: "alp-07-1", name: "250g", price: 399, mrp: 499, stock: 20 }],
    status: "Active",
    createdAt: "2026-01-23"
  },
  {
    id: "alp-08",
    name: "Apple Cider Vinegar with Mother",
    slug: "alpino-apple-cider-vinegar",
    brand: "Alpino",
    category: "Vitamins & Wellness",
    price: 299,
    mrp: 399,
    discount: 25,
    rating: 4.6,
    reviewCount: 310,
    stock: 35,
    lowStockThreshold: 8,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/alpino_08_Alpino_Apple_Cider_Vinega.jpg"],
    description: "100% raw, unfiltered, unpasteurized Apple Cider Vinegar naturally fermented with living 'Mother' for weight management and digestion.",
    nutrition: { protein: "0g", calories: "3 kcal", carbs: "0.2g", fat: "0g", servingSize: "15ml" },
    ingredients: "Raw Apple Juice fermented to 5% acidity.",
    howToUse: "Dilute 1-2 tbsp (15ml) in a glass of warm water 20 mins before meals.",
    flavours: ["Natural Apple"],
    sizes: ["500ml"],
    variants: [{ id: "alp-08-1", name: "500ml", price: 299, mrp: 399, stock: 35 }],
    status: "Active",
    createdAt: "2026-01-25"
  },
  {
    id: "alp-09",
    name: "Chocolate Peanut Butter Smooth (19% Protein)",
    slug: "alpino-chocolate-pb-smooth",
    brand: "Alpino",
    category: "Peanut Butter",
    price: 369,
    mrp: 449,
    discount: 18,
    rating: 4.8,
    reviewCount: 940,
    stock: 28,
    lowStockThreshold: 6,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/alpino_09_Alpino_Chocolate_Peanut_B.jpg"],
    description: "Creamy peanut spread infused with premium Dutch cocoa powder. 100% vegan, high protein treat for toasts and pancakes.",
    nutrition: { protein: "25g", calories: "190 kcal", carbs: "9g", fat: "13g", servingSize: "32g" },
    ingredients: "Roasted Peanuts, Cocoa, Sugar, Emulsifier.",
    howToUse: "Spread on waffles, pancakes, or toast.",
    flavours: ["Smooth Cocoa"],
    sizes: ["1 KG"],
    variants: [{ id: "alp-09-1", name: "1 KG", price: 369, mrp: 449, stock: 28 }],
    status: "Active",
    createdAt: "2026-01-27"
  },
  {
    id: "alp-10",
    name: "Unsweetened Peanut Butter Smooth",
    slug: "alpino-unsweetened-pb-smooth",
    brand: "Alpino",
    category: "Peanut Butter",
    price: 339,
    mrp: 399,
    discount: 15,
    rating: 4.7,
    reviewCount: 780,
    stock: 40,
    lowStockThreshold: 8,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/alpino_10_Alpino_Unsweetened_Peanut.jpg"],
    description: "Single ingredient smooth peanut butter made purely from roasted peanuts. Zero sodium, zero sugar, zero trans fat.",
    nutrition: { protein: "30g", calories: "190 kcal", carbs: "6g", fat: "14g", servingSize: "32g" },
    ingredients: "Roasted Peanuts (100%).",
    howToUse: "Ideal for clean muscle building diets.",
    flavours: ["Unsweetened"],
    sizes: ["1 KG"],
    variants: [{ id: "alp-10-1", name: "1 KG", price: 339, mrp: 399, stock: 40 }],
    status: "Active",
    createdAt: "2026-01-29"
  },
  {
    id: "alp-11",
    name: "Dark Chocolate Peanut Butter Crunchy",
    slug: "alpino-dark-chocolate-crunchy",
    brand: "Alpino",
    category: "Peanut Butter",
    price: 379,
    mrp: 469,
    discount: 19,
    rating: 4.9,
    reviewCount: 1120,
    stock: 32,
    lowStockThreshold: 7,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/alpino_11_Alpino_Dark_Chocolate_Pea.jpg"],
    description: "Crunchy peanut chunks blended with rich 70% dark chocolate solids for a delicious guilt-free workout snack.",
    nutrition: { protein: "26g", calories: "192 kcal", carbs: "8g", fat: "13.5g", servingSize: "32g" },
    ingredients: "Roasted Peanuts, Dark Cocoa Solids, Cane Sugar.",
    howToUse: "Enjoy right off the spoon!",
    flavours: ["Dark Choco Crunch"],
    sizes: ["1 KG"],
    variants: [{ id: "alp-11-1", name: "1 KG", price: 379, mrp: 469, stock: 32 }],
    status: "Active",
    createdAt: "2026-01-31"
  },
  {
    id: "alp-12",
    name: "High Protein Oats Chocolate Delight",
    slug: "alpino-high-protein-oats-chocolate",
    brand: "Alpino",
    category: "Oats",
    price: 329,
    mrp: 399,
    discount: 18,
    rating: 4.7,
    reviewCount: 460,
    stock: 22,
    lowStockThreshold: 5,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/alpino_12_Alpino_High_Protein_Oats_.jpg"],
    description: "Whole grain rolled oats mixed with Belgian cocoa powder, chia seeds, and plant protein isolate. Ready in 3 minutes.",
    nutrition: { protein: "10g", calories: "170 kcal", carbs: "25g", fat: "3g", servingSize: "50g" },
    ingredients: "Rolled Oats, Plant Protein Isolate, Cocoa, Chia.",
    howToUse: "Boil in milk for 3 minutes.",
    flavours: ["Belgian Cocoa"],
    sizes: ["400g"],
    variants: [{ id: "alp-12-1", name: "400g", price: 329, mrp: 399, stock: 22 }],
    status: "Active",
    createdAt: "2026-02-01"
  },
  {
    id: "alp-13",
    name: "Natural Almond Butter 100% Pure",
    slug: "alpino-natural-almond-butter",
    brand: "Alpino",
    category: "Peanut Butter",
    price: 699,
    mrp: 899,
    discount: 22,
    rating: 4.9,
    reviewCount: 380,
    stock: 18,
    lowStockThreshold: 4,
    isBestSeller: false,
    isFeatured: true,
    images: ["/products/alpino_13_Alpino_Natural_Almond_But.png"],
    description: "100% slow-roasted California almonds. Rich in Vitamin E, Magnesium, and healthy monounsaturated fats.",
    nutrition: { protein: "7g", calories: "195 kcal", carbs: "5g", fat: "16g", servingSize: "32g" },
    ingredients: "100% California Roasted Almonds.",
    howToUse: "Spread on apple slices or whole grain breads.",
    flavours: ["Smooth Almond"],
    sizes: ["500g"],
    variants: [{ id: "alp-13-1", name: "500g", price: 699, mrp: 899, stock: 18 }],
    status: "Active",
    createdAt: "2026-02-03"
  },
  {
    id: "alp-14",
    name: "Super Muesli High Protein & Nuts",
    slug: "alpino-super-muesli",
    brand: "Alpino",
    category: "Muesli",
    price: 429,
    mrp: 525,
    discount: 18,
    rating: 4.8,
    reviewCount: 640,
    stock: 30,
    lowStockThreshold: 6,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/alpino_14_Alpino_Super_Muesli.jpg"],
    description: "Multi-grain breakfast muesli loaded with almonds, raisins, pumpkin seeds, and soy protein flakes.",
    nutrition: { protein: "12g", calories: "180 kcal", carbs: "26g", fat: "4g", servingSize: "50g" },
    ingredients: "Oats, Wheat Flakes, Soy Protein Flakes, Almonds, Raisins, Seeds.",
    howToUse: "Pour cold milk or yogurt over 50g muesli and enjoy crisp breakfast.",
    flavours: ["Fruit & Nut Crunch"],
    sizes: ["400g"],
    variants: [{ id: "alp-14-1", name: "400g", price: 429, mrp: 525, stock: 30 }],
    status: "Active",
    createdAt: "2026-02-04"
  },
  {
    id: "alp-15",
    name: "Classic Crunchy Peanut Butter",
    slug: "alpino-pb-crunchy-economy",
    brand: "Alpino",
    category: "Peanut Butter",
    price: 299,
    mrp: 369,
    discount: 19,
    rating: 4.6,
    reviewCount: 420,
    stock: 45,
    lowStockThreshold: 10,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/alpino_15_Alpino_Peanut_Butter_Crun.jpg"],
    description: "Delicious classic crunchy peanut butter recipe for daily family consumption and sandwich spreads.",
    nutrition: { protein: "26g", calories: "190 kcal", carbs: "7g", fat: "14g", servingSize: "32g" },
    ingredients: "Roasted Peanuts, Sugar, Salt.",
    howToUse: "Daily sandwich spread.",
    flavours: ["Classic Crunchy"],
    sizes: ["1 KG"],
    variants: [{ id: "alp-15-1", name: "1 KG", price: 299, mrp: 369, stock: 45 }],
    status: "Active",
    createdAt: "2026-02-05"
  },
  {
    id: "alp-16",
    name: "High Protein Peanut Butter Unsweetened",
    slug: "alpino-high-protein-pb-unsweetened",
    brand: "Alpino",
    category: "Peanut Butter",
    price: 429,
    mrp: 525,
    discount: 18,
    rating: 4.8,
    reviewCount: 710,
    stock: 25,
    lowStockThreshold: 5,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/alpino_16_Alpino_High_Protein_Peanu.jpg"],
    description: "Whey protein isolate enriched peanut butter with zero added sugar and zero sodium for clean pre/post workout fuel.",
    nutrition: { protein: "12g", calories: "185 kcal", carbs: "5g", fat: "13g", servingSize: "32g" },
    ingredients: "Roasted Peanuts, Whey Protein Isolate.",
    howToUse: "Pre/post workout fuel.",
    flavours: ["Unsweetened"],
    sizes: ["1 KG"],
    variants: [{ id: "alp-16-1", name: "1 KG", price: 429, mrp: 525, stock: 25 }],
    status: "Active",
    createdAt: "2026-02-06"
  },
  {
    id: "alp-17",
    name: "Organic Jaggery Peanut Butter",
    slug: "alpino-organic-jaggery-pb",
    brand: "Alpino",
    category: "Peanut Butter",
    price: 369,
    mrp: 449,
    discount: 18,
    rating: 4.9,
    reviewCount: 590,
    stock: 30,
    lowStockThreshold: 6,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/alpino_17_Alpino_Organic_Jaggery_Pe.png"],
    description: "Naturally sweetened with 100% organic Gur (Jaggery) for an authentic Indian flavor without refined white sugar.",
    nutrition: { protein: "25g", calories: "190 kcal", carbs: "9g", fat: "13g", servingSize: "32g" },
    ingredients: "Roasted Peanuts, Organic Jaggery Powder, Sea Salt.",
    howToUse: "Healthy guilt-free Indian dessert spread.",
    flavours: ["Organic Jaggery"],
    sizes: ["1 KG"],
    variants: [{ id: "alp-17-1", name: "1 KG", price: 369, mrp: 449, stock: 30 }],
    status: "Active",
    createdAt: "2026-02-07"
  },

  // --- PINTOLA (16 PRODUCTS) ---
  {
    id: "pin-01",
    name: "All Natural Peanut Butter Crunchy",
    slug: "pintola-all-natural-peanut-butter-crunchy",
    brand: "Pintola",
    category: "Peanut Butter",
    price: 349,
    mrp: 425,
    discount: 18,
    rating: 4.9,
    reviewCount: 4820,
    stock: 65,
    lowStockThreshold: 15,
    isBestSeller: true,
    isFeatured: true,
    images: ["/products/pintola_01_Pintola_All_Natural_Peanu.jpg"],
    description: "India's highest rated 100% natural single-ingredient peanut butter. Unsweetened, zero palm oil, zero salt.",
    nutrition: { protein: "30g", calories: "190 kcal", carbs: "6g", fat: "14g", servingSize: "32g" },
    ingredients: "100% Hand-picked Roasted Peanuts.",
    howToUse: "Spread on whole grain bread, apples, or consume directly.",
    flavours: ["Natural Crunchy", "Natural Smooth"],
    sizes: ["1 KG", "2.5 KG"],
    variants: [{ id: "pin-01-1", name: "Natural Crunchy / 1 KG", price: 349, mrp: 425, stock: 65 }],
    status: "Active",
    createdAt: "2026-01-09"
  },
  {
    id: "pin-02",
    name: "High Protein Peanut Butter Dark Chocolate",
    slug: "pintola-high-protein-pb-dark-chocolate",
    brand: "Pintola",
    category: "Peanut Butter",
    price: 499,
    mrp: 599,
    discount: 17,
    rating: 4.9,
    reviewCount: 3120,
    stock: 45,
    lowStockThreshold: 10,
    isBestSeller: true,
    isFeatured: true,
    images: ["/products/pintola_02_Pintola_High_Protein_Pean.jpg"],
    description: "Enriched with Whey Isolate and dark Belgian cocoa. Provides 33g protein per 100g for fitness enthusiasts.",
    nutrition: { protein: "11g", calories: "185 kcal", carbs: "7g", fat: "12g", servingSize: "32g" },
    ingredients: "Roasted Peanuts (80%), Whey Protein Isolate, Cocoa Powder, Raw Sugar.",
    howToUse: "Perfect for fitness enthusiasts wanting chocolate flavor without compromising protein.",
    flavours: ["Dark Chocolate"],
    sizes: ["1 KG"],
    variants: [{ id: "pin-02-1", name: "1 KG", price: 499, mrp: 599, stock: 45 }],
    status: "Active",
    createdAt: "2026-01-12"
  },
  {
    id: "pin-03",
    name: "Organic Peanut Butter Smooth Unsweetened",
    slug: "pintola-organic-pb-smooth",
    brand: "Pintola",
    category: "Peanut Butter",
    price: 399,
    mrp: 499,
    discount: 20,
    rating: 4.8,
    reviewCount: 1420,
    stock: 30,
    lowStockThreshold: 6,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/pintola_03_Pintola_Organic_Peanut_Bu.jpg"],
    description: "USDA Organic certified peanut butter crafted from organically farmed peanuts in Gujarat.",
    nutrition: { protein: "30g", calories: "190 kcal", carbs: "5g", fat: "15g", servingSize: "32g" },
    ingredients: "100% Certified Organic Roasted Peanuts.",
    howToUse: "Add to protein shakes or keto bowls.",
    flavours: ["Organic Smooth"],
    sizes: ["1 KG"],
    variants: [{ id: "pin-03-1", name: "1 KG", price: 399, mrp: 499, stock: 30 }],
    status: "Active",
    createdAt: "2026-01-14"
  },
  {
    id: "pin-04",
    name: "Performance Peanut Butter High Energy",
    slug: "pintola-performance-peanut-butter",
    brand: "Pintola",
    category: "Peanut Butter",
    price: 449,
    mrp: 549,
    discount: 18,
    rating: 4.7,
    reviewCount: 890,
    stock: 25,
    lowStockThreshold: 5,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/pintola_04_Pintola_Performance_Peanu.jpg"],
    description: "Formulated for high-endurance athletes with added coconut MCT oil and whey isolate for instant mental and physical energy.",
    nutrition: { protein: "28g", calories: "200 kcal", carbs: "6g", fat: "15g", servingSize: "32g" },
    ingredients: "Roasted Peanuts, Coconut MCT Oil, Whey Isolate.",
    howToUse: "Eat pre-workout for long endurance.",
    flavours: ["Performance Blend"],
    sizes: ["1 KG"],
    variants: [{ id: "pin-04-1", name: "1 KG", price: 449, mrp: 549, stock: 25 }],
    status: "Active",
    createdAt: "2026-01-16"
  },
  {
    id: "pin-05",
    name: "Classic Peanut Butter Crunchy Sweetened",
    slug: "pintola-classic-peanut-butter-crunchy",
    brand: "Pintola",
    category: "Peanut Butter",
    price: 299,
    mrp: 369,
    discount: 19,
    rating: 4.7,
    reviewCount: 1650,
    stock: 55,
    lowStockThreshold: 12,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/pintola_05_Pintola_Classic_Peanut_Bu.jpg"],
    description: "Delicious classic recipe crafted with roasted peanuts, brown sugar, and sea salt.",
    nutrition: { protein: "26g", calories: "192 kcal", carbs: "8g", fat: "13.5g", servingSize: "32g" },
    ingredients: "Roasted Peanuts, Brown Sugar, Hydrogenated Vegetable Oil, Salt.",
    howToUse: "Family sandwich favorite.",
    flavours: ["Classic Crunchy"],
    sizes: ["1 KG"],
    variants: [{ id: "pin-05-1", name: "1 KG", price: 299, mrp: 369, stock: 55 }],
    status: "Active",
    createdAt: "2026-01-18"
  },
  {
    id: "pin-06",
    name: "High Protein Oats Dark Chocolate (22g Protein)",
    slug: "pintola-high-protein-oats",
    brand: "Pintola",
    category: "Oats",
    price: 349,
    mrp: 425,
    discount: 18,
    rating: 4.9,
    reviewCount: 2150,
    stock: 40,
    lowStockThreshold: 10,
    isBestSeller: true,
    isFeatured: true,
    images: ["/products/pintola_06_Pintola_High_Protein_Oats.jpg"],
    description: "Jumbo rolled oats packed with 22g protein per 100g, dark cocoa, super seeds, and raisins. 0% refined white sugar.",
    nutrition: { protein: "12g", calories: "180 kcal", carbs: "23g", fat: "3.5g", servingSize: "50g" },
    ingredients: "Rolled Oats (72%), Whey Concentrate, Dark Cocoa Powder, Chia Seeds.",
    howToUse: "Boil in hot milk for 3 minutes for a creamy protein breakfast.",
    flavours: ["Dark Chocolate", "Berry Blast"],
    sizes: ["400g", "1 KG"],
    variants: [{ id: "pin-06-1", name: "Dark Chocolate / 1 KG", price: 349, mrp: 425, stock: 40 }],
    status: "Active",
    createdAt: "2026-01-20"
  },
  {
    id: "pin-07",
    name: "Wholegrain Brown Rice Cakes Unsalted",
    slug: "pintola-wholegrain-rice-cakes",
    brand: "Pintola",
    category: "Vitamins & Wellness",
    price: 149,
    mrp: 180,
    discount: 17,
    rating: 4.8,
    reviewCount: 940,
    stock: 60,
    lowStockThreshold: 15,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/pintola_07_Pintola_Wholegrain_Rice_C.jpg"],
    description: "Crispy 100% expanded wholegrain brown rice cakes. Zero fat, gluten-free, low calorie crunch snack.",
    nutrition: { protein: "1g", calories: "28 kcal", carbs: "6g", fat: "0g", servingSize: "1 Cake (8g)" },
    ingredients: "100% Expanded Wholegrain Brown Rice.",
    howToUse: "Top with Pintola Peanut Butter and banana slices.",
    flavours: ["Unsalted"],
    sizes: ["125g Pack"],
    variants: [{ id: "pin-07-1", name: "125g Pack", price: 149, mrp: 180, stock: 60 }],
    status: "Active",
    createdAt: "2026-01-22"
  },
  {
    id: "pin-08",
    name: "All Natural Almond Butter Creamy",
    slug: "pintola-all-natural-almond-butter",
    brand: "Pintola",
    category: "Peanut Butter",
    price: 749,
    mrp: 899,
    discount: 17,
    rating: 4.9,
    reviewCount: 530,
    stock: 20,
    lowStockThreshold: 5,
    isBestSeller: false,
    isFeatured: true,
    images: ["/products/pintola_08_Pintola_All_Natural_Almon.jpg"],
    description: "Ultra-smooth 100% California almond spread. High in magnesium, dietary fiber, and antioxidant Vitamin E.",
    nutrition: { protein: "7g", calories: "195 kcal", carbs: "5g", fat: "16g", servingSize: "32g" },
    ingredients: "100% Roasted California Almonds.",
    howToUse: "Spread on sourdough toast or fruit bowls.",
    flavours: ["Natural Almond"],
    sizes: ["500g"],
    variants: [{ id: "pin-08-1", name: "500g", price: 749, mrp: 899, stock: 20 }],
    status: "Active",
    createdAt: "2026-01-24"
  },
  {
    id: "pin-09",
    name: "Unsweetened Peanut Butter Smooth",
    slug: "pintola-unsweetened-pb-smooth",
    brand: "Pintola",
    category: "Pintola",
    price: 339,
    mrp: 399,
    discount: 15,
    rating: 4.8,
    reviewCount: 1120,
    stock: 35,
    lowStockThreshold: 8,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/pintola_09_Pintola_Unsweetened_Peanu.jpg"],
    description: "Creamy unsweetened smooth single-ingredient peanut butter. No palm oil, no sugar, no salt.",
    nutrition: { protein: "30g", calories: "190 kcal", carbs: "6g", fat: "14g", servingSize: "32g" },
    ingredients: "100% Roasted Peanuts.",
    howToUse: "Blends easily into morning smoothies.",
    flavours: ["Smooth"],
    sizes: ["1 KG"],
    variants: [{ id: "pin-09-1", name: "1 KG", price: 339, mrp: 399, stock: 35 }],
    status: "Active",
    createdAt: "2026-01-26"
  },
  {
    id: "pin-10",
    name: "Extra Crunchy Peanut Butter Unsweetened",
    slug: "pintola-extra-crunchy-pb",
    brand: "Pintola",
    category: "Peanut Butter",
    price: 359,
    mrp: 435,
    discount: 17,
    rating: 4.8,
    reviewCount: 760,
    stock: 40,
    lowStockThreshold: 10,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/pintola_10_Pintola_Extra_Crunchy_Pea.jpg"],
    description: "Extra chunkiness and bold peanut bits for authentic crunch lovers!",
    nutrition: { protein: "28g", calories: "190 kcal", carbs: "7g", fat: "14g", servingSize: "32g" },
    ingredients: "Roasted Peanuts (90%), Peanut Pieces, Sea Salt.",
    howToUse: "Spread on crunchy toast.",
    flavours: ["Extra Crunchy"],
    sizes: ["1 KG"],
    variants: [{ id: "pin-10-1", name: "1 KG", price: 359, mrp: 435, stock: 40 }],
    status: "Active",
    createdAt: "2026-01-28"
  },
  {
    id: "pin-11",
    name: "Dark Chocolate Peanut Butter Smooth",
    slug: "pintola-dark-chocolate-pb-smooth",
    brand: "Pintola",
    category: "Peanut Butter",
    price: 379,
    mrp: 459,
    discount: 17,
    rating: 4.9,
    reviewCount: 1350,
    stock: 30,
    lowStockThreshold: 6,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/pintola_11_Pintola_Dark_Chocolate_Pe.jpg"],
    description: "Rich 70% dark cocoa blended into smooth creamy peanuts. Great drizzle over oats and waffles.",
    nutrition: { protein: "25g", calories: "192 kcal", carbs: "9g", fat: "13g", servingSize: "32g" },
    ingredients: "Roasted Peanuts, Dark Cocoa Powder, Raw Sugar.",
    howToUse: "Drizzle over waffles and oats.",
    flavours: ["Dark Cocoa Smooth"],
    sizes: ["1 KG"],
    variants: [{ id: "pin-11-1", name: "1 KG", price: 379, mrp: 459, stock: 30 }],
    status: "Active",
    createdAt: "2026-01-30"
  },
  {
    id: "pin-12",
    name: "High Protein Peanut Butter 1kg Value Tub",
    slug: "pintola-high-protein-pb-tub",
    brand: "Pintola",
    category: "Peanut Butter",
    price: 479,
    mrp: 575,
    discount: 17,
    rating: 4.9,
    reviewCount: 920,
    stock: 28,
    lowStockThreshold: 7,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/pintola_12_Pintola_High_Protein_Pean.jpg"],
    description: "High protein tub fortified with imported Japanese whey isolate for heavy lifters and daily bodybuilders.",
    nutrition: { protein: "11g", calories: "185 kcal", carbs: "6g", fat: "13g", servingSize: "32g" },
    ingredients: "Roasted Peanuts, Whey Protein Isolate.",
    howToUse: "Ideal for bodybuilders and active athletes.",
    flavours: ["Unsweetened Whey Blend"],
    sizes: ["1 KG"],
    variants: [{ id: "pin-12-1", name: "1 KG", price: 479, mrp: 575, stock: 28 }],
    status: "Active",
    createdAt: "2026-02-01"
  },
  {
    id: "pin-13",
    name: "Tri-Blend Protein Oats Fruit & Nuts",
    slug: "pintola-tri-blend-protein-oats",
    brand: "Pintola",
    category: "Oats",
    price: 369,
    mrp: 449,
    discount: 18,
    rating: 4.8,
    reviewCount: 510,
    stock: 22,
    lowStockThreshold: 5,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/pintola_13_Pintola_Tri_Blend_Protein.jpg"],
    description: "Blend of rolled oats, quinoa flakes, and amaranth enriched with whey protein, almonds, and cranberries.",
    nutrition: { protein: "12g", calories: "175 kcal", carbs: "24g", fat: "3g", servingSize: "50g" },
    ingredients: "Rolled Oats, Quinoa, Amaranth, Whey Protein, Almonds, Cranberries.",
    howToUse: "Soak in almond milk or hot water.",
    flavours: ["Berry Nuts"],
    sizes: ["400g"],
    variants: [{ id: "pin-13-1", name: "400g", price: 369, mrp: 449, stock: 22 }],
    status: "Active",
    createdAt: "2026-02-02"
  },
  {
    id: "pin-14",
    name: "All Natural Cashew Butter Smooth",
    slug: "pintola-all-natural-cashew-butter",
    brand: "Pintola",
    category: "Peanut Butter",
    price: 799,
    mrp: 999,
    discount: 20,
    rating: 4.9,
    reviewCount: 310,
    stock: 15,
    lowStockThreshold: 4,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/pintola_14_Pintola_All_Natural_Cashe.jpg"],
    description: "Rich, ultra-creamy 100% roasted cashew butter. Naturally sweet, luxury spread for gourmet dishes.",
    nutrition: { protein: "6g", calories: "190 kcal", carbs: "8g", fat: "15g", servingSize: "32g" },
    ingredients: "100% Roasted Cashews.",
    howToUse: "Gourmet baking and luxury toast spread.",
    flavours: ["Natural Cashew"],
    sizes: ["500g"],
    variants: [{ id: "pin-14-1", name: "500g", price: 799, mrp: 999, stock: 15 }],
    status: "Active",
    createdAt: "2026-02-04"
  },
  {
    id: "pin-15",
    name: "Organic Jaggery Peanut Butter Crunchy",
    slug: "pintola-organic-jaggery-pb",
    brand: "Pintola",
    category: "Peanut Butter",
    price: 369,
    mrp: 449,
    discount: 18,
    rating: 4.8,
    reviewCount: 680,
    stock: 35,
    lowStockThreshold: 8,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/pintola_15_Pintola_Organic_Jaggery_P.jpg"],
    description: "Sweetened with organic jaggery powder and pink Himalayan salt for healthy dessert indulgence.",
    nutrition: { protein: "25g", calories: "190 kcal", carbs: "9g", fat: "13g", servingSize: "32g" },
    ingredients: "Roasted Peanuts, Organic Jaggery, Pink Salt.",
    howToUse: "Healthy Indian sweet indulgence.",
    flavours: ["Organic Jaggery"],
    sizes: ["1 KG"],
    variants: [{ id: "pin-15-1", name: "1 KG", price: 369, mrp: 449, stock: 35 }],
    status: "Active",
    createdAt: "2026-02-05"
  },
  {
    id: "pin-16",
    name: "Wood Pressed Cold Filtered Peanut Oil",
    slug: "pintola-wood-pressed-peanut-oil",
    brand: "Pintola",
    category: "Vitamins & Wellness",
    price: 399,
    mrp: 499,
    discount: 20,
    rating: 4.8,
    reviewCount: 420,
    stock: 25,
    lowStockThreshold: 5,
    isBestSeller: false,
    isFeatured: false,
    images: ["/products/pintola_16_Pintola_Wood_Pressed_Pean.jpg"],
    description: "100% pure cold pressed unrefined peanut oil extracted in wooden Chekku/Ghani. Ideal for healthy daily cooking.",
    nutrition: { protein: "0g", calories: "120 kcal", carbs: "0g", fat: "14g", servingSize: "1 tbsp (15ml)" },
    ingredients: "100% Pure Cold-Pressed Peanuts.",
    howToUse: "Ideal for healthy daily cooking and salad dressings.",
    flavours: ["Unrefined Oil"],
    sizes: ["1 Litre"],
    variants: [{ id: "pin-16-1", name: "1 Litre", price: 399, mrp: 499, stock: 25 }],
    status: "Active",
    createdAt: "2026-02-06"
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-101",
    orderNumber: "#NB10294",
    customerName: "Rahul Verma",
    email: "rahul.verma@example.com",
    phone: "+91 98765 43210",
    address: { street: "42 Connaught Place, Block B", city: "New Delhi", state: "Delhi", pincode: "110001" },
    items: [
      { productId: "mb-01", productName: "Biozyme Performance Whey", brand: "MuscleBlaze", image: "/products/muscleblaze_01_MuscleBlaze_Biozyme_Perfo.jpg", flavour: "Rich Chocolate", size: "1 KG", price: 2999, quantity: 1 },
      { productId: "mb-04", productName: "Creatine Monohydrate CreAMP", brand: "MuscleBlaze", image: "/products/muscleblaze_04_MuscleBlaze_Creatine_Mono.jpg", flavour: "Unflavoured", size: "250g", price: 699, quantity: 1 }
    ],
    subtotal: 3698,
    discount: 0,
    deliveryFee: 0,
    totalAmount: 3698,
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    trackingNumber: "DELHIEXPRESS-884920",
    createdAt: "2026-03-01T10:30:00Z"
  },
  {
    id: "ord-102",
    orderNumber: "#NB10293",
    customerName: "Asha Sharma",
    email: "asha.sharma@example.com",
    phone: "+91 91234 56789",
    address: { street: "108 Koregaon Park, Lane 7", city: "Pune", state: "Maharashtra", pincode: "411001" },
    items: [
      { productId: "pin-01", productName: "All Natural Peanut Butter Crunchy", brand: "Pintola", image: "/products/pintola_01_Pintola_All_Natural_Peanu.jpg", flavour: "Natural Crunchy", size: "1 KG", price: 349, quantity: 2 },
      { productId: "alp-06", productName: "Super Oats High Protein Chocolate", brand: "Alpino", image: "/products/alpino_06_Alpino_Super_Oats_High_Protein.jpg", flavour: "Dark Chocolate", size: "1 KG", price: 349, quantity: 1 }
    ],
    subtotal: 1047,
    discount: 100,
    deliveryFee: 0,
    totalAmount: 947,
    paymentMethod: "Card",
    paymentStatus: "Paid",
    orderStatus: "Packed",
    trackingNumber: "SHIPROCKET-443210",
    createdAt: "2026-03-02T14:15:00Z"
  },
  {
    id: "ord-103",
    orderNumber: "#NB10292",
    customerName: "Vikram Malhotra",
    email: "vikram.m@example.com",
    phone: "+91 99887 76655",
    address: { street: "55 Indiranagar 100ft Road", city: "Bengaluru", state: "Karnataka", pincode: "560038" },
    items: [
      { productId: "mb-11", productName: "Iso Zero 100% Pure Whey Isolate", brand: "MuscleBlaze", image: "/products/muscleblaze_11_MuscleBlaze_Iso_Zero_Whey.jpg", flavour: "Chocolate Smooth", size: "1 KG", price: 3699, quantity: 1 }
    ],
    subtotal: 3699,
    discount: 200,
    deliveryFee: 0,
    totalAmount: 3499,
    paymentMethod: "COD",
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    trackingNumber: "BLUE DART-991204",
    createdAt: "2026-02-28T09:00:00Z"
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  { id: "c-1", code: "NUTRI10", discountPercent: 10, minOrderValue: 999, maxDiscount: 500, validUntil: "2026-12-31", usageCount: 142, usageLimit: 1000, isActive: true },
  { id: "c-2", code: "BULK200", discountPercent: 0, discountFixed: 200, minOrderValue: 1999, maxDiscount: 200, validUntil: "2026-12-31", usageCount: 89, usageLimit: 500, isActive: true },
  { id: "c-3", code: "WELCOME100", discountPercent: 0, discountFixed: 100, minOrderValue: 499, maxDiscount: 100, validUntil: "2026-12-31", usageCount: 310, usageLimit: 2000, isActive: true }
];

export const INITIAL_BANNERS: Banner[] = [
  {
    id: "b-1",
    title: "FUEL YOUR GOALS. POWER YOUR DAY.",
    subtitle: "Genuine MuscleBlaze, Pintola & Alpino products at wholesale prices.",
    ctaText: "Shop Protein Now",
    ctaLink: "/shop?category=Protein",
    bgGradient: "from-slate-900 via-rose-950 to-slate-900",
    imageUrl: "/products/muscleblaze_01_MuscleBlaze_Biozyme_Perfo.jpg",
    isActive: true
  },
  {
    id: "b-2",
    title: "START YOUR DAY STRONG WITH PINTOLA & ALPINO",
    subtitle: "High-protein oats, organic peanut butter & guilt-free breakfast spreads.",
    ctaText: "Explore Breakfast Hub",
    ctaLink: "/shop?category=Oats",
    bgGradient: "from-amber-950 via-amber-900 to-slate-900",
    imageUrl: "/products/pintola_01_Pintola_All_Natural_Peanu.jpg",
    isActive: true
  }
];

// In-Memory Database Store Helper (Persisted in LocalStorage when on Client)
class DataStore {
  private products: Product[] = INITIAL_PRODUCTS;
  private orders: Order[] = INITIAL_ORDERS;
  private coupons: Coupon[] = INITIAL_COUPONS;
  private banners: Banner[] = INITIAL_BANNERS;
  private isLoaded = false;

  private loadClientData() {
    if (typeof window === "undefined" || this.isLoaded) return;
    try {
      const p = localStorage.getItem("nb_products");
      if (p) this.products = JSON.parse(p);
      const o = localStorage.getItem("nb_orders");
      if (o) this.orders = JSON.parse(o);
      const c = localStorage.getItem("nb_coupons");
      if (c) this.coupons = JSON.parse(c);
      const b = localStorage.getItem("nb_banners");
      if (b) this.banners = JSON.parse(b);
      this.isLoaded = true;
    } catch (e) {
      console.error("Failed to load local storage", e);
    }
  }

  private saveClientData() {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem("nb_products", JSON.stringify(this.products));
      localStorage.setItem("nb_orders", JSON.stringify(this.orders));
      localStorage.setItem("nb_coupons", JSON.stringify(this.coupons));
      localStorage.setItem("nb_banners", JSON.stringify(this.banners));
    } catch (e) {
      console.error("Failed to save local storage", e);
    }
  }

  // PRODUCTS
  getProducts(): Product[] {
    this.loadClientData();
    return this.products;
  }

  getProductById(id: string): Product | undefined {
    this.loadClientData();
    return this.products.find(p => p.id === id || p.slug === id);
  }

  saveProduct(product: Product) {
    this.loadClientData();
    const idx = this.products.findIndex(p => p.id === product.id);
    if (idx >= 0) {
      this.products[idx] = product;
    } else {
      this.products.unshift(product);
    }
    this.saveClientData();
  }

  deleteProduct(id: string) {
    this.loadClientData();
    this.products = this.products.filter(p => p.id !== id);
    this.saveClientData();
  }

  updateStock(id: string, delta: number) {
    this.loadClientData();
    const p = this.products.find(x => x.id === id);
    if (p) {
      p.stock = Math.max(0, p.stock + delta);
      this.saveClientData();
    }
  }

  // ORDERS
  getOrders(): Order[] {
    this.loadClientData();
    return this.orders;
  }

  createOrder(orderData: Omit<Order, "id" | "orderNumber" | "createdAt">): Order {
    this.loadClientData();
    const newId = "ord-" + (this.orders.length + 101);
    const orderNum = "#NB" + Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      ...orderData,
      id: newId,
      orderNumber: orderNum,
      createdAt: new Date().toISOString()
    };

    // Decrement stock for ordered items
    newOrder.items.forEach(item => {
      this.updateStock(item.productId, -item.quantity);
    });

    this.orders.unshift(newOrder);
    this.saveClientData();
    return newOrder;
  }

  updateOrderStatus(orderId: string, status: Order["orderStatus"]) {
    this.loadClientData();
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.orderStatus = status;
      this.saveClientData();
    }
  }

  // COUPONS
  getCoupons(): Coupon[] {
    this.loadClientData();
    return this.coupons;
  }

  validateCoupon(code: string, subtotal: number): { valid: boolean; coupon?: Coupon; message?: string } {
    this.loadClientData();
    const c = this.coupons.find(x => x.code.toUpperCase() === code.toUpperCase() && x.isActive);
    if (!c) return { valid: false, message: "Invalid promo coupon code." };
    if (subtotal < c.minOrderValue) return { valid: false, message: `Minimum order value of ₹${c.minOrderValue} required for ${c.code}.` };
    if (c.usageCount >= c.usageLimit) return { valid: false, message: "Coupon usage limit reached." };
    return { valid: true, coupon: c };
  }

  saveCoupon(coupon: Coupon) {
    this.loadClientData();
    const idx = this.coupons.findIndex(c => c.id === coupon.id);
    if (idx >= 0) this.coupons[idx] = coupon;
    else this.coupons.unshift(coupon);
    this.saveClientData();
  }

  // BANNERS
  getBanners(): Banner[] {
    this.loadClientData();
    return this.banners;
  }
}

export const db = new DataStore();
