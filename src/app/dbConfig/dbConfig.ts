import mongoose from 'mongoose';

export async function connectDB() {
    try{
        mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection;
        
        connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });

        connection.on("error", (err) => {
            console.log("MongoDB connection error: ", err);
        });
    }catch(err){
        console.log("Something went wrong while connecting to the database");
        console.log(err);
    } 
}