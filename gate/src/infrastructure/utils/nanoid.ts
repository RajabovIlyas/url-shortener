import * as crypto from 'crypto';

export function customNanoid(size = 21) {
  const alphabet =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let id = '';
  const randomBytes = crypto.randomBytes(size);

  for (let i = 0; i < size; i++) {
    id += alphabet[randomBytes[i] % alphabet.length];
  }

  return id;
}