import mongoose from "mongoose";

// user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
    },
    email: {
        type: String,
        required: [true, 'Please provide a valid email.'],
        unique: true,
        trim: true, // remove preceeding/ trailing zeros
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
        index: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlenght: 6,
        trim: true,
        select: false,
    }
},
    {
        timestamps: true
    });

// TODO : hash the password before saving 

const userModel = mongoose.model("User", userSchema)

export default userModel;