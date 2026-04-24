import { checkIfUserExists } from "../services/userService.js";
import { verifyJwtToken } from "../utils/jwt.js";

export const isAuthenticated = async(req, res, next) => {
    // 1. check if JWT is present in header
    const token = req.headers["x-access-token"];
    if(!token){
        return res.status(400).json({
            success: false,
            message: "Token is required"
        })
        // its a client side issue (he/she has not provided a token)
    }
    // 2. check if JWT token is valid
    try {
        const response = verifyJwtToken(token); // the result of JWT token verification is the payload
        const doesUserExist = await checkIfUserExists(response.email);
        if(!doesUserExist){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        req.user = response;
        next();
    }
    catch(error){
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        })
    }
}