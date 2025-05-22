import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        });
        response.cookies.set("token", "", {httpOnly: true, expires: new Date(0)});
        return response;
    }catch(err : any){
        console.log(err);
        return NextResponse.json({message: "Something went wrong"}, {status: 500});
    }
}