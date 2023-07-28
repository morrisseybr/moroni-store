import createProduct from "@/actions/create-product";
import handleApiError from "@/actions/handle-api-error";
import verifySessionCookie from "@/actions/verify-session-cookie";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  try {
    await verifySessionCookie();
    await createProduct(await request.formData());
    revalidatePath("/products");
  } catch (error) {
    return handleApiError(error);
  }
  return new Response(null, { status: 201 });
}
