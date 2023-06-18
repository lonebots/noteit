import userModel from "../model/user.model.js";

// create user service 
export async function createUser(input) {
    console.log('create user start')
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

