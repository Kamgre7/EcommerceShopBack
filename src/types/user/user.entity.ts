export interface UserInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  pwdHash: string;
  pwdSalt: string;
  currentTokenId: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface UserAddressInterface {
  id: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  mobilePhone: number;
}
