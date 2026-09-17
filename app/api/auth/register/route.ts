import { NextResponse } from "next/server";

const API_URL = process.env.API_URL;

if (!API_URL) {
  throw new Error("API_URL is not defined");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          message: "Name, email and password are required",
        },
        { status: 400 }
      );
    }

    if (password.length < 4) {
      return NextResponse.json(
        {
          message: "Password must be at least 4 characters",
        },
        { status: 400 }
      );
    }

    // Create user directly
    const createUserResponse = await fetch(`${API_URL}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        avatar: "https://api.lorem.space/image/face?w=640&h=480",
      }),
    });

    const userData = await createUserResponse.json();

    // User creation failed
    if (!createUserResponse.ok) {
      console.error("Create user failed:", userData);

      return NextResponse.json(
        {
          message:
            userData?.message || "Failed to create account",
        },
        {
          status: createUserResponse.status,
        }
      );
    }

    // Login automatically after successful registration
    const loginResponse = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const loginData = await loginResponse.json();

    if (!loginResponse.ok) {
      console.error("Automatic login failed:", loginData);

      return NextResponse.json(
        {
          message: "Account created successfully. Please login.",
        },
        { status: 201 }
      );
    }

    // Create response
    const response = NextResponse.json(
      {
        message: "Registration successful",
        user: {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          avatar: userData.avatar,
        },
      },
      { status: 201 }
    );

    // Store access token
    response.cookies.set(
      "access_token",
      loginData.access_token,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      }
    );

    // Store refresh token
    response.cookies.set(
      "refresh_token",
      loginData.refresh_token,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      }
    );

    return response;
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      {
        message: "Something went wrong while creating your account",
      },
      { status: 500 }
    );
  }
}