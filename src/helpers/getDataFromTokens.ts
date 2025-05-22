 import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromTokens = (req: NextRequest) => {
    try{
        const token = req.cookies.get("token")?.value || "";
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);
        if (typeof decodedToken === "object" && decodedToken !== null && "id" in decodedToken) {
            return decodedToken.id;
        }
        throw new Error("Invalid token payload");
    }catch(err : any){
        throw new Error(err.message);
    }
}