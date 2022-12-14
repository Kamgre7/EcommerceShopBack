import { ProductFilterResponse } from '../product';

export interface BasketInterface {
  id: string;
  quantity: number;
}

export type AddToBasketResponse =
  | {
      isSuccess: true;
      id: string;
    }
  | {
      isSuccess: false;
      message: string;
    };

export interface BasketFilterResponse {
  id: string;
  quantity: number;
  product: ProductFilterResponse;
}

export interface RemoveProductFromBasket {
  isSuccess: boolean;
}

export interface BasketTotalPriceResponse {
  totalPrice: number;
  totalItems: number;
  itemsType: number;
}

export type BasketUpdateResponse =
  | {
      isSuccess: false;
      message: string;
    }
  | {
      isSuccess: true;
    };
