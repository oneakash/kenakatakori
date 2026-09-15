import {
  LoginInput,
  LoginResponse,
  RefreshTokenResponse,
  User,
  RegisterInput,
  RegisterResponse,
} from "@/types/user";

const API_URL = "https://api.escuelajs.co/api/v1";

export async function loginUser(
  data: LoginInput
): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Invalid email or password");
  }

  return response.json();
}

export async function registerUser(
  data: RegisterInput
): Promise<RegisterResponse> {
  const response = await fetch(`${API_URL}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
      avatar:
        data.avatar ||
        "https://i.imgur.com/yhW6Yw1.jpg",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create account");
  }

  return response.json();
}

export async function checkEmailAvailability(
  email: string
): Promise<boolean> {
  const response = await fetch(
    `${API_URL}/users/is-available`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Unable to check email");
  }

  const data = await response.json();

  return data.isAvailable;
}

export async function getProfile(
  accessToken: string
): Promise<User> {
  const response = await fetch(`${API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return response.json();
}

export async function refreshAccessToken(
  refreshToken: string
): Promise<RefreshTokenResponse> {
  const response = await fetch(`${API_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  return response.json();
}