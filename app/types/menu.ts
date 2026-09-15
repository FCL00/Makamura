export type Category = "wings"  | "buckets" | "sides"  | "drinks"  | "dips"  | "all";

export type Menu = {
  id: string,
  name: string,
  category: Category,
  heat: number,
  price: number,
  popular: boolean,
  description: string,
  image: string,
}


// export type HeatLevels = Record<string, {label: string, dots: number}>

export type HeatLevels = {
    [key: number]: {label: string, dots: number}
}


