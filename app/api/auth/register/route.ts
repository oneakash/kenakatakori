import { NextResponse } from "next/server";
import {
  checkEmailAvailability,
  registerUser,
} from "@/lib/api/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          message:
            "Name, email and password are required",
        },
        { status: 400 }
      );
    }

    if (password.length < 4) {
      return NextResponse.json(
        {
          message:
            "Password must be at least 4 characters",
        },
        { status: 400 }
      );
    }

    /*
     * Check whether the email is already registered.
     */
    const isAvailable =
      await checkEmailAvailability(email);

    if (!isAvailable) {
      return NextResponse.json(
        {
          message: "Email is already registered",
        },
        { status: 409 }
      );
    }

    /*
     * Create the user.
     */
    const user = await registerUser({
      name,
      email,
      password,
      avatar: body.avatar,
    });

    return NextResponse.json(
      {
        message: "Registration successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      {
        message: "Unable to create account",
      },
      { status: 500 }
    );
  }
}