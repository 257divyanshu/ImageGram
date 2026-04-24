import mongoose from "mongoose";
import { createUser, findUserByEmail } from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import { generateJwtToken } from "../utils/jwt.js";

export const signUpUserService = async(userObject) => {
    // - we don't need to make a database call to check if a user already exists with that particular credentials
    // - because of the 'unique: true' configuration in the email and username of the User schema 
    // - If a user with that email or username already exists:
    //   - The Database Rejects the Write: MongoDB catches the duplicate before it's saved.
    //   - Mongoose Throws an Error: The User.create method will fail and throw a specific "BulkWriteError" or "MongoServerError".
    //   - Error Code 11000: This is the specific error code for duplicate keys.
    // 📍 old code
    // const newUser = await createUser(userObject);
    // return newUser;
    // 📍 new code
    try{
        const newUser = await createUser(userObject);
        return newUser;
    }
    catch(error){
        console.log("service layer error:");
        console.log("error name :", error.name); // logs MongoServerError
        console.log("error message :", error.message); // logs E11000 duplicate key error collection: test.users index: username_1 dup key: { username: "123456" }
        console.log("error code :", error.code); // logs E11000
        if(error instanceof mongoose.Error.ValidationError){
            console.log("its a ValidationError");
        }
        if(error instanceof mongoose.Error.ValidatorError){
            console.log("its a ValidatorError");
        }
        if(error.name == "MongoServerError" && error.code == 11000){
            console.log('MongoSeverError with code 11000');
            throw {
                status: 400,
                message: "User with the same email or username already exists"
            }
        }
        console.log(error);
        throw error;
    }
};

export const signInUserService = async(userDetails) => {
    try{
        // 1. check if there's a valid registered user with the same email
        const user = await findUserByEmail(userDetails.email);
        if(!user){
            throw {
                status: 404,
                message: "User not found"
            }
        }
        // 2. compare the password
        const isPasswordValid = bcrypt.compareSync(userDetails.password, user.password);
        if(!isPasswordValid){
            console.log("password found invalid (logSource : userService.js)")
            throw {
                status: 401,
                message: "Invalid password"
            }
        }
        // 3. generate a JWT
        const token = generateJwtToken({email: user.email, _id: user._id, username: user.username});
        return token;
    }
    catch(error){
        throw error;
    }
}

export const checkIfUserExists = async(email) => {
    try{
        const user = await findUserByEmail(email);
        return user;
    }
    catch(error){
        throw error;
    }
}