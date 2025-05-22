import { verify } from 'crypto';
import mangoose from 'mongoose';
import { unique } from 'next/dist/build/utils';

const userSchema = new mangoose.Schema({
    username: {
        type : String,
        required : [true, "Please provide a email"],
        unique : true,  
    },
    email: {
        type : String,
        required : [true, "Please provide a email"],
        unique : true,
    },
    password:{
        type : String,
        required : [true, "Please provide a password"],
    },
    isVerified: {
        type : Boolean,
        default : false,
    },
    isAdmin: {
        type : Boolean,
        default : false,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifyTokenExpiry: String

})

const User = mangoose.models.users || mangoose.model('users', userSchema);

export default User