import getProduct from "@/actions/get-product";
import handleApiError from "@/actions/handle-api-error";
import verifySessionCookie from "@/actions/verify-session-cookie";

export async function GET(_: Request, params: { id: string }) {
  try {
    await verifySessionCookie();
    const id = params.id;
    const product = await getProduct(id);
    return new Response(JSON.stringify(product.toModel()), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
