import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import { ILoginService } from '../../rural-producer/interfaces/login-service';

dotenv.config();

export class LoginService implements ILoginService {
  public async generateToken(credentials: { username: string; password: string }): Promise<string> {
    const secretKey = process.env.SECRET_KEY || '';

    const token = jwt.sign({ username: credentials.username }, secretKey, {
      expiresIn: '1h',
    });
    return token;
  }
}
