import getProduct from "@/actions/get-product";
import handleApiError from "@/actions/handle-api-error";
import updateProduct from "@/actions/update-product";
import verifySessionCookie from "@/actions/verify-session-cookie";
import { ProductModel } from "@/core/model/Product";
import { revalidatePath } from "next/cache";

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

export async function PUT(request: Request, params: { id: string }) {
  try {
    await verifySessionCookie();
    const json = await request.json();
    const data = ProductModel.parse(json);
    const updatedProduct = await updateProduct(data);
    revalidatePath(`/products/${params.id}`);
    return new Response(JSON.stringify(updatedProduct.toModel()), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
