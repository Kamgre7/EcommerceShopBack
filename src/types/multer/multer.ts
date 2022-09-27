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
