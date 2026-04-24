import { signInUserService, signUpUserService } from "../services/userService.js";

export async function getProfile(req, res) {
    // return unimplemented error
    return res.status(501).json({
        success: false,
        message: 'Not Implemented'
    });
}

export async function signUp(req, res) {
    try {
        console.log("logging req.body");
        console.log(req.body);
        const user = await signUpUserService(req.body);
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user
        });
    }
    catch (error) {
        console.log("controller layer error:");
        console.log(error);
        console.log("error.status :", error.status);
        if (error.status) { // if it has a status, that means its a custom error (its the custom error with status 400 error 'user with same email or username already exists')
            return res.status(error.status).json({
                success: false,
                message: error.message
            })
        }
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export async function signIn(req, res) {
    try {
        const response = await signInUserService(req.body);
        return res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data: response
        })
    }
    catch (error) {
        console.log("controller layer error:");
        console.log(error);
        console.log("error.status :", error.status);
        if (error.status) {
            return res.status(error.status).json({
                success: false,
                message: error.message
            })
        }
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}