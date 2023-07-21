import createSell from "@/actions/create-sell";
import handleApiError from "@/actions/handle-api-error";

export async function POST(request: Request) {
  try {
    await createSell(await request.formData());
  } catch (error) {
    return handleApiError(error);
  }
  return new Response(null, { status: 201 });
}
