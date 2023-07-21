import createSessionCookie from "@/actions/create-session-cookie";
import deleteSessionCookie from "@/actions/delete-session-cookie";
import handleApiError from "@/actions/handle-api-error";

export async function POST(request: Request) {
  try {
    const idToken = (await request.json()).idToken;
    if (!idToken) {
      throw new Error("No idToken provided");
    }
    await createSessionCookie({ idToken });
  } catch (error) {
    return handleApiError(error);
  }
  return new Response(null, { status: 200 });
}

export async function DELETE(request: Request) {
  try {
    await deleteSessionCookie();
  } catch (error) {
    return handleApiError(error);
  }
  return new Response(null, { status: 200 });
}
