import { cookies } from "next/headers";

const API_URL = "https://api.escuelajs.co/api/v1";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return null;
  }

  const response = await fetch(`${API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}