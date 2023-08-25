import createProduct from "@/actions/create-product";
import getProducts from "@/actions/get-products";
import handleApiError from "@/actions/handle-api-error";
import verifySessionCookie from "@/actions/verify-session-cookie";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  try {
    await verifySessionCookie();
    const cursor = new URL(request.url).searchParams.get("cursor");
    const products = await getProducts(cursor);
    return new Response(
      JSON.stringify(products.map((product) => product.toModel())),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await verifySessionCookie();
    await createProduct(await request.json());
    revalidatePath("/products");
  } catch (error) {
    return handleApiError(error);
  }
  return new Response(null, { status: 201 });
}
