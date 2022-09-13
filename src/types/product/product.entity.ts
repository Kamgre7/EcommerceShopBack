export interface ProductInterface {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  boughtCounter: number;
  photoFileName: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface ProductInventoryInterface {
  id: string;
  quantity: number;
  createdAt: Date;
  modifiedAt: Date;
}

export interface ProductFilterResponse {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  sku: string;
}
