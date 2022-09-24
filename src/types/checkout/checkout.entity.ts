export interface CheckoutTotalPriceResponse {
  totalPrice: number;
  totalItems: number;
  itemsType: number;
}

export interface CheckoutInterface {
  id: string;
  total: number;
}
