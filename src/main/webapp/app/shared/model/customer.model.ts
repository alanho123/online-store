import { type IUser } from '@/shared/model/user.model';

import { type Gender } from '@/shared/model/enumerations/gender.model';
export interface ICustomer {
  id?: number;
  firstName?: string;
  lastName?: string;
  gender?: keyof typeof Gender;
  email?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string | null;
  city?: string;
  country?: string;
  user?: IUser;
}

export class Customer implements ICustomer {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public gender?: keyof typeof Gender,
    public email?: string,
    public phone?: string,
    public addressLine1?: string,
    public addressLine2?: string | null,
    public city?: string,
    public country?: string,
    public user?: IUser,
  ) {}
}
