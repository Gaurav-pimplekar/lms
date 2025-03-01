import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function authMiddleware(req, roles) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, "this_is_my_secret");
    if (!roles.includes(decoded.role)) {
      return NextResponse.json({ error: "Forbidden: Insufficient permissions" }, { status: 403 });
    }
    console.log(decoded);
    req.user = decoded;
    return null; // No error, proceed
  } catch (error) {
    return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
  }
}


export function isLogin(req) {
  try {
    
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, "this_is_my_secret");
    
    req.user = decoded;
    return null; // No error, proceed
  } catch (error) {
    return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
  }
}