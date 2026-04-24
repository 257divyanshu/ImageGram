import express from "express";
import { getProfile, signIn, signUp } from "../../controllers/userController.js";
import { validate } from "../../validators/zodValidator.js";
import { zodSignupSchema } from "../../validators/zodSignupSchema.js";
import { zodSigninSchema } from "../../validators/zodSigninSchema.js";

const router = express.Router();

router.get('/profiles', getProfile);
router.post('/signup', validate(zodSignupSchema), signUp);
router.post('/signin',validate(zodSigninSchema) ,signIn);

export default router;