import { type IProductCategory } from '@/shared/model/product-category.model';

import { type Size } from '@/shared/model/enumerations/size.model';
export interface IProduct {
  id?: number;
  name?: string;
  description?: string | null;
  price?: number;
  productSize?: keyof typeof Size;
  imageContentType?: string | null;
  image?: string | null;
  productCategory?: IProductCategory | null;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string | null,
    public price?: number,
    public productSize?: keyof typeof Size,
    public imageContentType?: string | null,
    public image?: string | null,
    public productCategory?: IProductCategory | null,
  ) {}
}
