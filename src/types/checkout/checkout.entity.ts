import { BasketFilterResponse } from '../basket';
import { UserAddressInterface } from '../user';

export interface CheckoutTotalPriceResponse {
  totalPrice: number;
  totalItems: number;
  itemsType: number;
}

export interface CheckoutInterface {
  id: string;
  total: number;
}

export interface CheckoutOrderInfo {
  firstName: string;
  lastName: string;
  orderId: string;
  totalPrice: number;
  address: UserAddressInterface;
  basket: BasketFilterResponse[];
}

export interface CheckoutPlaceOrderResponse {
  isSuccess: boolean;
  message: string;
}

export interface CheckoutOrderHistoryResponse extends CheckoutInterface {
  address: UserAddressInterface;
  items: BasketFilterResponse[];
}

export type RemoveOrderHistoryResponse = {
  isSuccess: true;
};
