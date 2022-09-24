import { OrderEntity } from '../checkout/entities/order.entity';

export const orderFilter = (order: OrderEntity) => {
  const { id, total, items, address } = order;

  return { id, total, address, items: JSON.parse(items) };
};
