import { type IProductOrder } from '@/shared/model/product-order.model';

import { type InvoiceStatus } from '@/shared/model/enumerations/invoice-status.model';
import { type PaymentMethod } from '@/shared/model/enumerations/payment-method.model';
export interface IInvoice {
  id?: number;
  date?: Date;
  details?: string | null;
  status?: keyof typeof InvoiceStatus;
  paymentMethod?: keyof typeof PaymentMethod;
  paymentDate?: Date;
  paymentAmount?: number;
  code?: string | null;
  order?: IProductOrder;
}

export class Invoice implements IInvoice {
  constructor(
    public id?: number,
    public date?: Date,
    public details?: string | null,
    public status?: keyof typeof InvoiceStatus,
    public paymentMethod?: keyof typeof PaymentMethod,
    public paymentDate?: Date,
    public paymentAmount?: number,
    public code?: string | null,
    public order?: IProductOrder,
  ) {}
}
