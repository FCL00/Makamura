export type Category =
  | "wings"
  | "buckets"
  | "sides"
  | "drinks"
  | "dips"
  | "all";

export type Menu = {
  id: string;
  name: string;
  category: Category;
  heat: number;
  price: number;
  popular: boolean;
  description: string;
  image: string;
  addOnCategories?: AddOnCategory[];
};

export const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "wings", label: "Wings" },
  { id: "buckets", label: "Buckets" },
  { id: "sides", label: "Sides" },
  { id: "drinks", label: "Drinks" },
];

// heat: 0 = not spiced (sides, drinks), 1 mild, 2 medium, 3 hot, 4 extra hot
export const menuItems: Menu[] = [
  {
    id: "honey-butter",
    name: "Honey Butter",
    category: "wings",
    heat: 1,
    price: 8.5,
    popular: true,
    description:
      "Whipped honey butter glaze, torched to order, flaky salt on top.",
    image: "/images/wings/honey-butter-chicken.webp",
    addOnCategories: ["sides", "dips", "drinks"],
  },
  {
    id: "spicy-sriracha",
    name: "Spicy Sriracha",
    category: "wings",
    heat: 3,
    price: 8.5,
    popular: true,
    description: "House sriracha reduction, garlic chips, lime.",
    image: "/images/wings/spicy-sriracha.webp",
    addOnCategories: ["sides", "dips", "drinks"],
  },
  {
    id: "garlic-parm",
    name: "Garlic Parmesan",
    category: "wings",
    heat: 1,
    price: 8.5,
    popular: false,
    description: "Roasted garlic butter, shaved parmesan, cracked pepper.",
    image: "/images/wings/garlic-parmesan.webp",
    addOnCategories: ["sides", "dips", "drinks"],
  },
  {
    id: "carolina-gold",
    name: "Carolina Gold",
    category: "wings",
    heat: 2,
    price: 8.5,
    popular: true,
    description: "Mustard-based BBQ, a little tang, a little sweet.",
    image: "/images/wings/carolina-gold.webp",
    addOnCategories: ["sides", "dips", "drinks"],
  },
  {
    id: "ghost-pepper",
    name: "Ghost Pepper",
    category: "wings",
    heat: 4,
    price: 9.0,
    popular: false,
    description: "For people who ask for extra napkins on purpose.",
    image: "/images/wings/ghost-pepper.webp",
    addOnCategories: ["sides", "dips", "drinks"],
  },
  {
    id: "calamansi-chili",
    name: "Calamansi Chili",
    category: "wings",
    heat: 2,
    price: 8.5,
    popular: true,
    description: "Bright citrus heat, a house favorite.",
    image: "/images/wings/calamansi-chili.webp",
    addOnCategories: ["sides", "dips", "drinks"],
  },
  {
    id: "party-bucket",
    name: "Party Bucket",
    category: "buckets",
    heat: 0,
    price: 34.0,
    popular: true,
    description: "20 pieces, up to 3 flavors, feeds 4-5.",
    image: "/images/buckets/party-bucket.webp",
    addOnCategories: ["sides", "dips", "quantity-drinks", "party-bucket"],
  },
  {
    id: "solo-bucket",
    name: "Solo Bucket",
    category: "buckets",
    heat: 0,
    price: 14.0,
    popular: false,
    description: "8 pieces, 1 flavor, fries on the side.",
    image: "/images/buckets/solo-bucket.webp",
    addOnCategories: ["sides", "dips", "quantity-drinks", "solo-bucket"],
  },
  {
    id: "crew-bucket",
    name: "Crew Bucket",
    category: "buckets",
    heat: 0,
    price: 48.0,
    popular: false,
    description: "30 pieces, up to 4 flavors, feeds 6-8.",
    image: "/images/buckets/crew-bucket.webp",
    addOnCategories: ["sides", "dips", "quantity-drinks", "crew-bucket"],
  },
  {
    id: "crinkle-fries",
    name: "Crinkle Fries",
    category: "sides",
    heat: 0,
    price: 4.0,
    popular: true,
    description: "Double-fried, tossed in house seasoning.",
    image: "/images/sides/crickle-fries.webp",
    addOnCategories: ["fries-size", "dips", "drinks"],
  },
  {
    id: "slaw",
    name: "Buttermilk Slaw",
    category: "sides",
    heat: 0,
    price: 3.5,
    popular: false,
    description: "Crunchy, tangy, cuts through the heat.",
    image: "/images/sides/buttermilk-slaw.webp",
    addOnCategories: ["drinks"],
  },
  {
    id: "mac-cheese",
    name: "Smoked Mac & Cheese",
    category: "sides",
    heat: 0,
    price: 5.5,
    popular: true,
    description: "Three cheeses, toasted breadcrumb top.",
    image: "/images/sides/smoked-mac-cheese.webp",
    addOnCategories: ["drinks"],
  },
  {
    id: "house-lager",
    name: "House Lager",
    category: "drinks",
    heat: 0,
    price: 5.0,
    popular: true,
    description: "Crisp, cold, on tap.",
    image: "./images/drinks/house-beer-lager.webp",
    addOnCategories: ["size"],
  },
  {
    id: "wheat-beer",
    name: "Wheat Beer",
    category: "drinks",
    heat: 0,
    price: 5.5,
    popular: false,
    description: "Citrusy, unfiltered, pairs well with the hot flavors.",
    image: "./images/drinks/wheat-beer.webp",
    addOnCategories: ["size"],
  },
  {
    id: "soft-drinks",
    name: "Soft Drinks",
    category: "drinks",
    heat: 0,
    price: 2.5,
    popular: false,
    description: "Free refills, ask your server for the lineup.",
    image: "./images/drinks/coca-cola.webp",
    addOnCategories: ["size"],
  },
];

export const heatLevels = {
  0: { label: "No heat", dots: 0 },
  1: { label: "Mild", dots: 1 },
  2: { label: "Medium", dots: 2 },
  3: { label: "Hot", dots: 3 },
  4: { label: "Extra hot", dots: 4 },
} as const;

export type HeatLevels = typeof heatLevels;

export type AddOnCategory =
  | "sides"
  | "drinks"
  | "dips"
  | "size"
  | "flavors"
  | "quantity-drinks"
  | "fries-size"
  | "solo-bucket"
  | "party-bucket"
  | "crew-bucket";

export type AddOnSelectionType = "quantity" | "single" | "multiple";

export type AddOn = {
  id: string;
  name: string;
  category: AddOnCategory;
  price: number;
  image: string;
};

export type AddOnOption = {
  id: string;
  heading: string;
  subHeading: string;
  category: AddOnCategory;
  addOns: AddOn[];
  selectionType: AddOnSelectionType;
  minSelections?: number;
  maxSelections?: number;
  defaultAddOnIds?: string[];
};

export const foodOptions: AddOnOption[] = [
  {
    id: "solo-flavors-set-1",
    heading: "Flavors",
    subHeading: "Select Flavors",
    selectionType: "multiple",
    defaultAddOnIds: ["honey-butter"],
    category: "solo-bucket",
    minSelections: 1,
    maxSelections: 1,
    addOns: [
      {
        id: "honey-butter",
        name: "honey-butter",
        category: "flavors",
        price: 0,
        image: "/images/wings/honey-butter-chicken.webp",
      },
      {
        id: "calamansi-chili",
        name: "calamansi-chili",
        category: "flavors",
        price: 0,
        image: "/images/wings/calamansi-chili.webp",
      },
      {
        id: "garlic-parmesan",
        name: "garlic-parmesan",
        category: "flavors",
        price: 0,
        image: "/images/wings/garlic-parmesan.webp",
      },
      {
        id: "ghost-pepper",
        name: "ghost-pepper",
        category: "flavors",
        price: 0,
        image: "/images/wings/ghost-pepper.webp",
      },
      {
        id: "spicy-sriracha",
        name: "spicy-sriracha",
        category: "flavors",
        price: 0,
        image: "/images/wings/spicy-sriracha.webp",
      },
    ],
  },
  {
    id: "party-flavors-set-1",
    heading: "Flavors",
    subHeading: "Select Flavors",
    selectionType: "multiple",
    defaultAddOnIds: ["honey-butter"],
    category: "party-bucket",
    minSelections: 3,
    maxSelections: 3,
    addOns: [
      {
        id: "honey-butter",
        name: "honey-butter",
        category: "flavors",
        price: 0,
        image: "/images/wings/honey-butter-chicken.webp",
      },
      {
        id: "calamansi-chili",
        name: "calamansi-chili",
        category: "flavors",
        price: 0,
        image: "/images/wings/calamansi-chili.webp",
      },
      {
        id: "garlic-parmesan",
        name: "garlic-parmesan",
        category: "flavors",
        price: 0,
        image: "/images/wings/garlic-parmesan.webp",
      },
      {
        id: "ghost-pepper",
        name: "ghost-pepper",
        category: "flavors",
        price: 0,
        image: "/images/wings/ghost-pepper.webp",
      },
      {
        id: "spicy-sriracha",
        name: "spicy-sriracha",
        category: "flavors",
        price: 0,
        image: "/images/wings/spicy-sriracha.webp",
      },
    ],
  },
  {
    id: "crew-flavors-set-1",
    heading: "Flavors",
    subHeading: "Select Flavors",
    selectionType: "multiple",
    defaultAddOnIds: ["honey-butter"],
    category: "crew-bucket",
    minSelections: 4,
    maxSelections: 4,
    addOns: [
      {
        id: "honey-butter",
        name: "honey-butter",
        category: "flavors",
        price: 0,
        image: "/images/wings/honey-butter-chicken.webp",
      },
      {
        id: "calamansi-chili",
        name: "calamansi-chili",
        category: "flavors",
        price: 0,
        image: "/images/wings/calamansi-chili.webp",
      },
      {
        id: "garlic-parmesan",
        name: "garlic-parmesan",
        category: "flavors",
        price: 0,
        image: "/images/wings/garlic-parmesan.webp",
      },
      {
        id: "ghost-pepper",
        name: "ghost-pepper",
        category: "flavors",
        price: 0,
        image: "/images/wings/ghost-pepper.webp",
      },
      {
        id: "spicy-sriracha",
        name: "spicy-sriracha",
        category: "flavors",
        price: 0,
        image: "/images/wings/spicy-sriracha.webp",
      },
    ],
  },
  {
    id: "fries-size-set-1",
    heading: "Size",
    subHeading: "Select One",
    selectionType: "single",
    category: "fries-size",
    defaultAddOnIds: ["regular"],
    addOns: [
      {
        id: "regular",
        name: "Regular",
        category: "sides",
        price: 75,
        image: "/images/sides/crickle-fries.webp",
      },
      {
        id: "medium",
        name: "Medium",
        category: "sides",
        price: 100,
        image: "/images/sides/crickle-fries.webp",
      },
      {
        id: "large",
        name: "Large",
        category: "sides",
        price: 150,
        image: "/images/sides/crickle-fries.webp",
      },
      {
        id: "extra-large",
        name: "Extra large",
        category: "sides",
        price: 200,
        image: "/images/sides/crickle-fries.webp",
      },
    ],
  },
  {
    id: "sides-set-1",
    heading: "Add-ons (optional)",
    subHeading: "Select any choices",
    selectionType: "quantity",
    category: "sides",
    addOns: [
      {
        id: "white-rice",
        name: "White Rice",
        category: "sides",
        price: 2,
        image: "/images/sides/buttermilk-slaw.webp",
      },
      {
        id: "crinkle-fries",
        name: "Crinkle Fries",
        category: "sides",
        price: 3,
        image: "/images/sides/buttermilk-slaw.webp",
      },
      {
        id: "buttermilk-slaw",
        name: "Buttermilk Slaw",
        category: "sides",
        price: 2.5,
        image: "/images/sides/buttermilk-slaw.webp",
      },
    ],
  },

  {
    id: "dips-set-1",
    heading: "Dips",
    subHeading: "Choose your favorite sauce",
    selectionType: "quantity",
    category: "dips",
    addOns: [
      {
        id: "ranch",
        name: "Ranch",
        category: "dips",
        price: 0.75,
        image: "/images/sides/buttermilk-slaw.webp",
      },
      {
        id: "honey-mustard",
        name: "Honey Mustard",
        category: "dips",
        price: 0.75,
        image: "/images/sides/buttermilk-slaw.webp",
      },
    ],
  },

  {
    id: "drinks-set-1",
    heading: "Drinks",
    subHeading: "Something cold to go with it",
    selectionType: "single",
    category: "drinks",
    defaultAddOnIds: ["coca-cola-medium"],
    addOns: [
      {
        id: "coca-cola-small",
        name: "Coca-Cola (small)",
        category: "drinks",
        price: 3.5,
        image: "/images/drinks/coca-cola.webp",
      },
      {
        id: "coca-cola-medium",
        name: "Coca-Cola (Medium)",
        category: "drinks",
        price: 3.5,
        image: "/images/drinks/coca-cola.webp",
      },
      {
        id: "coca-cola-large",
        name: "Coca-Cola (Large)",
        category: "drinks",
        price: 3.5,
        image: "/images/drinks/coca-cola.webp",
      },
      {
        id: "sprite-medium",
        name: "Sprite (Medium)",
        category: "drinks",
        price: 2.5,
        image: "/images/drinks/coca-cola.webp",
      },
      {
        id: "sprite-large",
        name: "Sprite (Large)",
        category: "drinks",
        price: 2.5,
        image: "/images/drinks/coca-cola.webp",
      },
    ],
  },
  {
    id: "drinks-set-2",
    heading: "Drinks",
    subHeading: "Something cold to go with it",
    selectionType: "quantity",
    category: "quantity-drinks",
    addOns: [
      {
        id: "coca-cola-small",
        name: "Coca-Cola (Small)",
        category: "drinks",
        price: 3.5,
        image: "/images/drinks/coca-cola.webp",
      },
      {
        id: "coca-cola-medium",
        name: "Coca-Cola (Medium)",
        category: "drinks",
        price: 3.5,
        image: "/images/drinks/coca-cola.webp",
      },
      {
        id: "coca-cola-large",
        name: "Coca-Cola (Large)",
        category: "drinks",
        price: 3.5,
        image: "/images/drinks/coca-cola.webp",
      },
      {
        id: "sprite-medium",
        name: "Sprite (Medium)",
        category: "drinks",
        price: 2.5,
        image: "/images/drinks/coca-cola.webp",
      },
      {
        id: "sprite-large",
        name: "Sprite (Large)",
        category: "drinks",
        price: 2.5,
        image: "/images/drinks/coca-cola.webp",
      },
    ],
  },
  {
    id: "size-set-1",
    heading: "Size",
    subHeading: "Select One",
    selectionType: "single",
    category: "size",
    defaultAddOnIds: ["small"],
    addOns: [
      {
        id: "small",
        name: "Small",
        category: "drinks",
        price: 75,
        image: "/images/drinks/coca-cola.webp",
      },
      {
        id: "regular",
        name: "Regular",
        category: "drinks",
        price: 75,
        image: "/images/drinks/coca-cola.webp",
      },
      {
        id: "medium",
        name: "Medium",
        category: "drinks",
        price: 100,
        image: "/images/drinks/coca-cola.webp",
      },
      {
        id: "large",
        name: "Large",
        category: "drinks",
        price: 150,
        image: "/images/drinks/coca-cola.webp",
      },
      {
        id: "extra-large",
        name: "Extra large",
        category: "drinks",
        price: 200,
        image: "/images/drinks/coca-cola.webp",
      },
    ],
  },
];
