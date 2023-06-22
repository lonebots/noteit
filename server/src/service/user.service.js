import userModel from "../model/user.model.js";

// create user service 
export async function createUser(input) {
    return await userModel.create(input)
}

// find user service (id) 
export async function findUserbyId(id) {
    const user = await userModel.findById(id);
    return user;
}

// find user service (email) 
export async function findUserbyEmail(email) {
    const user = await userModel.findOne({ email }).select('+password')
    return user;
}

// validating password 
export async function validatePassword(input) {
    const { email, password } = input;
    const user = await findUserbyEmail(email)   // find user
    if (!user) {
        return false
    }

    const isValid = await user.comparePasswords(password);
    console.log('is valid : ', isValid)
    if (!isValid) {
        return false
    }
    return user;
}
