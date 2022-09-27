import { OrderEntity } from '../checkout/entities/order.entity';
import { CheckoutOrderHistoryResponse } from '../types';

export const orderFilter = (
  order: OrderEntity,
): CheckoutOrderHistoryResponse => {
  const { id, total, items, address } = order;

  return { id, total, address, items: JSON.parse(items) };
};
