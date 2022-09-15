import * as crypto from 'crypto';

export const hashPassword = (pwd: string, salt: string): string => {
  const hmac = crypto.createHmac('sha512', salt);
  hmac.update(pwd);
  return hmac.digest('hex');
};

export const randomSalt = (size: number): string => {
  const salt = crypto.randomBytes(size);
  return salt.toString('hex');
};
