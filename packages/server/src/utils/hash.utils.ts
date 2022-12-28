import * as argon2 from 'argon2';

export const generateHash = async (input: string) => {
  return argon2.hash(input);
};

export const compareHash = async (hash: string, input: string) => {
  return argon2.verify(hash, input);
};
