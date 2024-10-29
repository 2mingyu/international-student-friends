export interface LoginResponse {
  token: string;
  userId: number;
  email: string;
  roles: string[];
}
