import { authMiddleware, clerkClient, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isSimpleMode = process.env.NEXT_PUBLIC_APP_MODE === "simple"

const isProtectedRoute = createRouteMatcher(["/onboarding(.*), /projects(.*)"])
const uuidRegex =
  /^\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}(\/.*)?$/

export default async function middleware(req: NextRequest) {
  if (isSimpleMode) {
    return NextResponse.next()
  }

  const response = await authMiddleware({
    publicRoutes: ["/"],
    afterAuth: async (auth, req) => {
      if (!auth.userId && isProtectedRoute(req.url)) {
        return NextResponse.redirect(new URL("/login", req.url))
      }

      if (auth.userId && isProtectedRoute(req.url)) {
        const user = await clerkClient.users.getUser(auth.userId)
        if (!user.publicMetadata.githubUsername) {
          return NextResponse.redirect(new URL("/onboarding", req.url))
        }
      }
    }
  })(req)

  return response
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
}
