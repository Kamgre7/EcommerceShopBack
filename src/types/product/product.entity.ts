export interface ProductInterface {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  boughtCounter: number;
  photoFileName: string;
  createdAt: Date;
  modifiedAt: Date;
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
