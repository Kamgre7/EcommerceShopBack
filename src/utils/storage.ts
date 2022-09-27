import * as path from 'path';
import { diskStorage } from 'multer';
import * as mime from 'mime';
import { v4 as uuid } from 'uuid';

export const storageDir = () => path.join(__dirname, '../../storage');

export const multerStorage = (dest: string) =>
  diskStorage({
    destination: (req, file, cb) => cb(null, dest),
    filename: (req, file, cb) =>
      cb(null, `${uuid()}.${(mime as any).getExtension(file.mimetype)}`),
  });
