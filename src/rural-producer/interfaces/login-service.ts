export interface ILoginService {
  generateToken(credentials: { username: string; password: string }): Promise<string>;
}
