export interface ProductCategoryInterface {
  id: string;
  name: string;
  description: string;
  photoFileName: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface CategoryFilterResponse {
  id: string;
  name: string;
  description: string;
}

export type CreateCategoryResponse =
  | {
      isSuccess: false;
      message: string;
    }
  | CategoryFilterResponse;
