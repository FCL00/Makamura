

export type Reviews = {
    id: number;
    name: string;
    rating: number;
    comment: string;
    context: string
}

export const reviews: Reviews[] = [
  {
    id: 1,
    name: "Jamie R.",
    rating: 5,
    comment: "Ordered the ghost pepper on a dare. Regretted it, went back the next week anyway.",
    context: "First-time order · Ghost Pepper",
  },
  {
    id: 2,
    name: "Alex M.",
    rating: 5,
    comment: "Crispy on the outside, juicy inside. Definitely ordering again.",
    context: "Regular · Classic Wings",
  },
  {
    id: 3,
    name: "Sarah L.",
    rating: 5,
    comment: "The spicy sriracha has just the right amount of heat.",
    context: "Weekend order · Spicy Sriracha",
  },
  {
    id: 4,
    name: "Mark D.",
    rating: 5,
    comment: "The bucket was perfect for sharing with friends.",
    context: "Group order · Chicken Bucket",
  },
];