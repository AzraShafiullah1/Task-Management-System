
import { authMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextFetchEvent, NextResponse } from "next/server";

// Configure Clerk middleware behavior
const handler = authMiddleware({
  // Optional: publicRoutes, beforeAuth, afterAuth, etc.
});

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
): Promise<NextResponse | Response | void> {
  try {
    const result = await handler(req, event);
    
    // If `null` or `undefined`, simply return `void` (no response)
    if (result == null) {
      return; // This is equivalent to returning `void`
    }
    
    // Otherwise, return the response
    return result;
  } catch (err) {
    console.error("Clerk middleware error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
