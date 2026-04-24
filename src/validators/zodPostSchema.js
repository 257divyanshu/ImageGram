import { z } from "zod";
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
// using the z object, we can create our schema
export const zodPostSchema = z.object({
    caption: z.string({message: "Caption is required"}).min(1)
});