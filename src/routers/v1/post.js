import express from "express";
import { s3Uploader } from "../../config/multerConfig.js";
import { createPost, deletePost, getAllPosts, updatePost } from "../../controllers/postController.js";
import { validate } from "../../validators/zodValidator.js";
import { zodPostSchema } from "../../validators/zodPostSchema.js";

const router = express.Router();
// - the express.Router() function returns a router object to modularize the routes

// - now we need to mention the routes using the router object that express.Router() function returned
// 📍 createPost without validation
// router.post('/', s3Uploader.single('image'), createPost);
// 📍 createPost with validation
// 📍 WRONG ORDER
// router.post('/', validate(zodPostSchema), s3Uploader.single('image'), createPost);
// 📍 RIGHT ORDER
router.post('/', s3Uploader.single('image'), validate(zodPostSchema), createPost);
router.get('/', getAllPosts);
router.delete('/:id', deletePost);
router.put('/:id', s3Uploader.single('image'), updatePost);

export default router;