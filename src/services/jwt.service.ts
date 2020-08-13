import { jwtConfig } from '../config';
import { verify, sign } from 'jsonwebtoken';
import { Service } from 'typedi';

@Service()
export class JwtService {

  public decodeToken(token: string): any {
    const secret = process.env.JWT_SECRET;

    return verify(token, secret);
  }

  public generateToken(accessTokenPayload: any, refreshTokenPayload: any) {
    const { algorithm, secret, accessTokenExpiryTime, refreshTokenExpiryTime }: any = jwtConfig;
    const accessToken = sign(accessTokenPayload, secret, { algorithm, expiresIn: accessTokenExpiryTime });
    const refreshToken = sign(refreshTokenPayload, secret, { algorithm, expiresIn: refreshTokenExpiryTime });

    return {
      accessToken,
      expiresIn: accessTokenExpiryTime,
      refreshToken,
    }
  }
}