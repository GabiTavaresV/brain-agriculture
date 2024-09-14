import jwt from "jsonwebtoken";

export class LoginService {
  public async generateToken({ username, password }: any): Promise<any> {
    const secretKey = process.env.SECRET_KEY || "";
    const payload = {
      username,
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    return token;
  }
}
