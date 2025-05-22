import {connectDB} from "@/app/dbConfig/dbConfig";
import User from "@/app/models/userModel";
import { NextRequest ,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connectDB();

export async function POST(req: NextRequest) {
    try{
        const reqBody = await req.json();
        const {username, email, password} = reqBody ; 
        console.log(reqBody);

        const existingUserCheck = await User.findOne({email})
        if(existingUserCheck){
            return NextResponse.json({message: "User already exists"}, {status: 400});
        }
         
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })

        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        } );
    }catch(err){
        console.log(err);
        return NextResponse.json({message: "Something went wrong"}, {status: 500});
    }
}