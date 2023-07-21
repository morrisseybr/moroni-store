import createProduct from "@/actions/create-product";
import handleApiError from "@/actions/handle-api-error";
import verifySessionCookie from "@/actions/verify-session-cookie";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await verifySessionCookie();
    await createProduct(await request.formData());
  } catch (error) {
    return handleApiError(error);
  }
  return new Response(null, { status: 201 });
}
