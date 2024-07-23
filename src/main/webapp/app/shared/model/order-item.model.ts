import { type IProduct } from '@/shared/model/product.model';
import { type IProductOrder } from '@/shared/model/product-order.model';

import { type OrderItemStatus } from '@/shared/model/enumerations/order-item-status.model';
export interface IOrderItem {
  id?: number;
  quantity?: number;
  totalPrice?: number;
  status?: keyof typeof OrderItemStatus;
  product?: IProduct;
  order?: IProductOrder;
}

export class OrderItem implements IOrderItem {
  constructor(
    public id?: number,
    public quantity?: number,
    public totalPrice?: number,
    public status?: keyof typeof OrderItemStatus,
    public product?: IProduct,
    public order?: IProductOrder,
  ) {}
}
