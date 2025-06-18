import {NextResponse} from "next/server";
import withAuth from "./app/middlewares/withAuth";

export function mainMiddleware(req) {
 const res = NextResponse.next();
 return res;
}
export default withAuth(mainMiddleware, ["/owner", "/admin", "/pelanggan"]);

// bypass auth
// export default mainMiddleware;
