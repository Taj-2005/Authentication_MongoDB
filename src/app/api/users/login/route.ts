import {connectDB} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest ,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(req: NextRequest) {
    try{
        const reqBody = await req.json();
        const {username, password} = reqBody ;
        console.log(reqBody);

        const user = await User.findOne({username});

        if(!user){
            return NextResponse.json({message: "User not found"}, {status: 400});
        } 
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);

        if(!isPasswordCorrect){
            return NextResponse.json({message: "Invalid credentials"}, {status: 400});
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });
        response.cookies.set("token", token, {httpOnly: true});
        return response;
    }catch(err : any){
        console.log(err); 
        return NextResponse.json({message: "Something went wrong"}, {status: 500});
    }
}