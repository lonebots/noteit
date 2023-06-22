import mongoose from "mongoose";
import config from 'config';
import bcrypt from 'bcrypt'; // for hashing
import logger from '../utils/log.utils.js'

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

// hash the password before saving 
userSchema.pre('save', async function (next) {
    // password not modified
    if (!this.isModified('password')) {
        return next();
    }
    // generate salt 
    const salt = await bcrypt.genSalt(config.get('app.secret.saltworkfactor'));
    const hashPassword = await bcrypt.hashSync(this.password, salt);
    this.password = hashPassword;
    return next();
})

// compare password
userSchema.methods.comparePasswords = async function (candidatePassword) {
    try {
        return await bcrypt.compare(this.password, candidatePassword);
    }
    catch (error) {
        logger.error('Could not verify user', error);
        return false;
    }
}

const userModel = mongoose.model("User", userSchema)

export default userModel;