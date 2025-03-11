import { http } from "./http";

export interface Auth {
  username: string;
  password: string;
}

export const loginAccount = (body: Auth) => http.post('/auth/get-token', body);