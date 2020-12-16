export interface IJwtResponse {
  token: string;
  id: number;
  userName: string;
  email: string;
  type: string;
  authority: Array<string>;
}
