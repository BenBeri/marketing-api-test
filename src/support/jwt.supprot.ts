import * as jsonwebtoken from 'jsonwebtoken';
import { AppLogger } from '../logger/logger';
import { SignOptions } from 'jsonwebtoken';

export class JwtSupport {

  protected static TAG: string = 'JwtSupport';

  static async createJwt(cert: string | Buffer, payLoad: object, signObject: SignOptions): Promise<string> {
    try {
      return await jsonwebtoken.sign(payLoad, cert, signObject);
    } catch (err) {
      AppLogger.error(err, this.TAG);
      return null;
    }

  }

  static async decodeToken(token: string): Promise<any> {
    return await jsonwebtoken.decode(token);
  }

}
