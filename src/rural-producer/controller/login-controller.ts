import { Request, Response } from "express";
import { LoginService } from "../service/login-service";

export class LoginController {
  public async login(request: Request, response: Response) {
    const { username, password } = request.body;

    const service = new LoginService();

    const token = await service.generateToken({ username, password });
    return response.json({ token });
  }
}
