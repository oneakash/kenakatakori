import { NextResponse } from "next/server";

const API_URL = "https://api.escuelajs.co/api/v1";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.email || !body.password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const apiResponse = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: body.email,
        password: body.password,
      }),
    });

    if (!apiResponse.ok) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const data = await apiResponse.json();

    const response = NextResponse.json({
      message: "Login successful",
    });

    response.cookies.set("access_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    response.cookies.set("refresh_token", data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}