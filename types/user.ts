export type UserRole = "customer" | "admin";

export interface User {
  id: number;
  email: string;
  password?: string;
  name: string;
  role: UserRole;
  avatar: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token?: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface RegisterResponse extends User {
  password?: string;
}