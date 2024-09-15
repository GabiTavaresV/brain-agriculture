import { Request, Response } from "express";
import { LoginService } from "../service/login-service";

export class LoginController {
  public async login(request: Request, response: Response): Promise<Response> {
    try {
      const { username, password } = request.body;

      const loginService = new LoginService();

      const token = await loginService.generateToken({
        username,
        password,
      });
      return response.json({ token });
    } catch (error) {
      console.error("Erro ao gerar o token:", error);
      return response.status(500).json({ message: "Erro ao obter dados." });
    }
  }
}
