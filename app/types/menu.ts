

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

export type AddOn = {
  id: string;
  name: string;
  category: AddOnCategory;
  price: number;
  image: string;
};

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



export type SelectedAddOn = {
  addOn: AddOn;
  quantity: number;
};


export type BasketItem = {
  id: string;
  item: Menu;
  quantity: number;
  selectedAddOns: SelectedAddOn[];
};