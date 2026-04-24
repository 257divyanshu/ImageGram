// 📍 schema
// - zod wants us to define schema for the incoming requests
// - using schema we mention the expected input properties for the request's body
// - schema is like a brueprint (of what to expect in a request)

// 📍 schema.parse()
// - schema object is created by zod
// - it has a parse() function
// - the parse() function takes the request's body and checks if the request's body is validating the schema or not
// - if yes, next() will be called
// - else, an error will be thrown

export const validate = (schema) => {
    return async (req, res, next) => {
        try {
            console.log("inside zodValidator's try block");
            // console.log(req);
            // console.log(req.body);
            schema.parse(req.body);
            next();
        }
        catch (error) {
            console.log("ACTUAL ERROR:", error);
            return res.status(400).json({
                success: false,
                message: "Validation Error",
                errors: error.issues
            });
        }
    }
}