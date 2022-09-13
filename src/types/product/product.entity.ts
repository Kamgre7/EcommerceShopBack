export interface ProductInterface {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  sku: string;
  boughtCounter: number;
  photoFileName: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface ProductFilterResponse {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  sku: string;
}

export interface MulterDiskUploadedFiles {
  [fieldname: string]:
    | {
        filename: string;
        size: number;
        mimetype: string;
        originalname: string;
        fieldname: string;
        encoding: string;
        destination: string;
        path: string;
      }[]
    | undefined;
}
