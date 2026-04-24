import { z } from "zod";
export const zodSignupSchema = z.object({
    username: z.string().min(5),
    email: z.string().email().min(6),
    password: z.string().min(5)
});