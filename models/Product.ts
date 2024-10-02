export interface Product {
    _id?: string;  // Optional since MongoDB will auto-generate it
    name: string;
    description: string;
    price: number;
    quantity: number;
  }
