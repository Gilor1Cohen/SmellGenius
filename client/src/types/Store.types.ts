export interface StoreItem {
  _id: string;
  perfumeName: string;
  gender: "Men" | "Women" | "Unisex";
  priceBeforeDiscount: number;
  priceAfterDiscount: number;
  url: string;
}

export interface StoreData {
  pages: number;
  items: StoreItem[];
}

export interface StoreRes {
  data: StoreData;
}
