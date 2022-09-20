import * as crypto from 'crypto';

export const userActivationToken = (userId: string) => {
  const token = crypto.createHash('sha512');
  token.update(userId);
  return token.digest('hex');
};
