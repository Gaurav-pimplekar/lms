import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { authMiddleware, isLogin } from "@/middelware/auth";



export async function POST(req) {
  try {
    dbConnect();
    const { email, password } = await req.json();

    // Find user
    const user = await User.findOne({email});
    if (!user) {
      return Response.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Validate password
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return Response.json({ error: "Invalid email or password" }, { status: 401 });
    // }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, "this_is_my_secret", {expiresIn:60});
    return Response.json({ token, role: user.role }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req){
  try {
    const decode = isLogin(req);
    console.log(decode);
    return Response.json({ isLogin: true, role: req?.user?.role }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "token is invalid or expire" }, { status: 500 });
  }
}