import { getDataFromTokens } from "@/helpers/getDataFromTokens";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import {connectDB} from "@/dbConfig/dbConfig";
connectDB();
export async function GET(req: NextRequest) {
    try {
        const userId = getDataFromTokens(req);
        const user = await User.findOne({_id : userId}).select("-password");
        return NextResponse.json({
           message: "User found",
           data: user 
        });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}