import { createPostService, deletePostService, getAllPostsService, updatePostService } from "../services/postService.js";

export async function createPost(req, res) {
    // console.log(req.file);
    // console.log(req.file.location);
    // console.log(req);
    // console.log(req.body);
    if (!req.file || !req.file.location) {
        return res.status(400).json({
            success: false,
            message: "Image is required (error from postController.js)"
        });
    }
    const post = await createPostService({
        caption: req.body.caption,
        image: req.file.location
    });
    return res.status(201).json({
        success: "true",
        message: "Post created successfully",
        data: post
    })
}

// 📍 dummy controller for GET request hitting /posts
// export async function getAllPosts(req, res){
//     // return unimplemented
//     return res.status(501).json({
//         success: false,
//         message: 'Not Implemented'
//     });
// }

// 📍 actual controller for GET request hitting /posts
// - we'll receive the limit and offeset in the query params
// - e.g. api/v1/posts/limit=10&offeset=0
export async function getAllPosts(req, res) {
    try {
        const limit = req.query.limit || 10;
        const offset = req.query.offset || 0;
        const paginatedPosts = await getAllPostsService(limit, offset);
        return res.status(200).json({
            success: true,
            message: 'All posts fetched successfully',
            data: paginatedPosts
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

export async function deletePost(req, res) {
    try {
        const postId = req.params.id;
        const response = await deletePostService(postId);
        if (!response) {
            return res.status(404).json({
                sucess: false,
                message: "Post not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Post delete successfully',
            data: response
        });
    }
    catch {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

export async function updatePost(req, res) {
    try {
        console.log(req.file);
        const updateObject = req.body;
        if (req.file) {
            updateObject.image = req.file.location;
        }
        const response = await updatePostService(req.params.id, updateObject);
        return res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: response
        });
    }
    catch {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}