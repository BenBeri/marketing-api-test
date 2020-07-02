import * as bcrypt from 'bcryptjs';

export class BcryptSupport {

  static async generate(plainText: string, saltRounds: number) {
    return await bcrypt.hash(plainText, saltRounds);
  }

  static async compare(plainText, hash) {
    return await bcrypt.compare(plainText, hash);
  }
}
