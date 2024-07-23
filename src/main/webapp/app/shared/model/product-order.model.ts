import { type ICustomer } from '@/shared/model/customer.model';

import { type OrderStatus } from '@/shared/model/enumerations/order-status.model';
export interface IProductOrder {
  id?: number;
  placedDate?: Date;
  status?: keyof typeof OrderStatus;
  code?: string;
  customer?: ICustomer;
}

export class ProductOrder implements IProductOrder {
  constructor(
    public id?: number,
    public placedDate?: Date,
    public status?: keyof typeof OrderStatus,
    public code?: string,
    public customer?: ICustomer,
  ) {}
}
