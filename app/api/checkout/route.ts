import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

if (!API_URL) {
  throw new Error("API_URL is not defined");
}

const SHIPPING_COST = 10;

export async function POST(request: Request) {
  try {
    // -----------------------------
    // 1. Check authentication
    // -----------------------------

    const cookieStore = await cookies();

    const accessToken =
      cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          message: "You must be logged in to checkout",
        },
        { status: 401 }
      );
    }

    const profileResponse = await fetch(`${API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!profileResponse.ok) {
      return NextResponse.json(
        { message: "Your session has expired. Please login again." },
        { status: 401 }
      );
    }

    // -----------------------------
    // 2. Read request
    // -----------------------------

    const body = await request.json();

    const customer = body.customer;
    const items = body.items;

    if (
      !customer ||
      typeof customer !== "object" ||
      !Array.isArray(items) ||
      items.length === 0 ||
      items.length > 50
    ) {
      return NextResponse.json(
        {
          message: "Invalid checkout data",
        },
        { status: 400 }
      );
    }

    // -----------------------------
    // 3. Validate customer data
    // -----------------------------

    const requiredCustomerFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "postalCode",
      "country",
    ] as const;

    if (
      requiredCustomerFields.some(
        (field) =>
          typeof customer[field] !== "string" ||
          !customer[field].trim()
      )
    ) {
      return NextResponse.json(
        {
          message: "Please complete all required fields",
        },
        { status: 400 }
      );
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email) ||
      !/^[0-9+().\-\s]{7,20}$/.test(customer.phone) ||
      !["card", "cash"].includes(customer.paymentMethod)
    ) {
      return NextResponse.json(
        { message: "Please provide valid customer and payment data" },
        { status: 400 }
      );
    }

    // -----------------------------
    // 4. Fetch trusted product prices
    // -----------------------------

    const verifiedItems = [];

    for (const item of items) {
      if (
        !item ||
        typeof item.productId !== "number" ||
        !Number.isInteger(item.productId) ||
        item.productId <= 0 ||
        typeof item.quantity !== "number" ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 99
      ) {
        return NextResponse.json(
          {
            message: "Invalid cart item",
          },
          { status: 400 }
        );
      }

      if (
        items.filter((cartItem) => cartItem.productId === item.productId)
          .length > 1
      ) {
        return NextResponse.json(
          { message: "Duplicate products are not allowed" },
          { status: 400 }
        );
      }

      const response = await fetch(
        `${API_URL}/products/${item.productId}`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        return NextResponse.json(
          {
            message: `Product ${item.productId} could not be found`,
          },
          { status: 400 }
        );
      }

      const product = await response.json();

      verifiedItems.push({
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity: item.quantity,
        lineTotal: product.price * item.quantity,
      });
    }

    // -----------------------------
    // 5. Calculate trusted total
    // -----------------------------

    const subtotal = verifiedItems.reduce(
      (total, item) => total + item.lineTotal,
      0
    );

    const shipping = SHIPPING_COST;

    const total = subtotal + shipping;

    // -----------------------------
    // 6. Mock payment
    // -----------------------------

    const paymentSuccessful = true;

    if (!paymentSuccessful) {
      return NextResponse.json(
        {
          message: "Payment failed",
        },
        { status: 402 }
      );
    }

    // -----------------------------
    // 7. Create mock order
    // -----------------------------

    const orderId = `ORD-${Date.now()}`;

    console.log("Mock order created:", {
      orderId,
      customer,
      items: verifiedItems,
      subtotal,
      shipping,
      total,
    });

    return NextResponse.json({
      success: true,
      orderId,
      subtotal,
      shipping,
      total,
    });
  } catch (error) {
    console.error("Checkout error:", error);

    return NextResponse.json(
      {
        message: "Something went wrong during checkout",
      },
      { status: 500 }
    );
  }
}