import {
  RegisterUserInput,
  User,
} from "@/types/user";

const API_URL = "https://api.escuelajs.co/api/v1";

export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_URL}/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

export async function getUserById(
  id: number
): Promise<User> {
  const response = await fetch(
    `${API_URL}/users/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
}

export async function registerUser(
  data: RegisterUserInput
): Promise<User> {
  const response = await fetch(`${API_URL}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to register user");
  }

  return response.json();
}

export async function isEmailAvailable(
  email: string
): Promise<boolean> {
  const response = await fetch(
    `${API_URL}/users/is-available`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to check email availability"
    );
  }

  const data: { isAvailable: boolean } =
    await response.json();

  return data.isAvailable;
}