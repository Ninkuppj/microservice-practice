import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { CONSTANTS, PERMISSIONS } from "./app/lib/constants";

export default withAuth(
  async function middleware(req:any) {
    const token = await getToken({ req }) 
    const isAuth = !!token  
    const isAuthPage =req.nextUrl.pathname.startsWith("/login")
    const  needAuthentication= !isAuth && isAuthPage;
    if(token!.role===CONSTANTS.ROLE.SUPER_ADMIN) return NextResponse.next()
    if (needAuthentication){
      return new Response("Please log in to view this page.",{status:401})
    }else if(!isAuth && !isAuthPage){
      // Redirect to login page if user is not authenticated and trying to access a protected route
      return NextResponse.redirect('/login')
    } else {
      // Allow the request to continue if user is authenticated or trying to access an unauthenticated route
      const result = PERMISSIONS[token!.role as any]?.path.includes(req.nextUrl.pathname);
      if (!result) {
        return NextResponse.redirect(
          new URL('/404', req.url).href
        );
      }
      return NextResponse.next()
    }
    //   if (isAuth && isAuthPage) {
    //     return NextResponse.redirect(new URL("/", req.url))
    //   } 
    // if(!isAuth){
    //   {
    //     return NextResponse.redirect(
    //       new URL('/login')
    //     );
    //   }
    // }
    }

    
)
// export default withAuth(
//   function middleware(req) {
//     const token = req.nextauth.token as any;
//     const collectPath = token
//       ? token.permissions.reduce(
//           (acc: string[], curr: string) => [
//             ...acc,
//             ...(PERMISSIONS[curr]?.path || []),
//           ],
//           ['/', '/dashboard/:path*',]
//         )
//       : [];

//     const result = match(req.nextUrl.pathname, collectPath) as any;

//     if (!result) {
//       return NextResponse.redirect(
//         new URL('/404', req.url).href
//       );
//     }
//   }
// );
export const config = {
  matcher: ["/dashboard/:path*", "/"],
}