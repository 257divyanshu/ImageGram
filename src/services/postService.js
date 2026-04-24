import { countAllPosts, deletePostById, findAllPosts, updatePostById } from "../repositories/postRepository.js";
import {createPost} from "../repositories/postRepository.js";

export const createPostService = async(createPostObject) => {
    const caption = createPostObject.caption?.trim();
    const image = createPostObject.image;
    const post = await createPost(caption, image);
    return post;
};

export const getAllPostsService = async(limit, offset) => {
    const posts = await findAllPosts(limit, offset);
    const totalDocuments = await countAllPosts();
    const totalPages = totalDocuments/limit;
    return {
        posts,
        totalDocuments,
        totalPages
    };
}

export const deletePostService = async(id) => {
    // call the repository function
    const response = await deletePostById(id);
    return response;
}

export const updatePostService = async(id, updateObject) => {
    // call the repository function
    const response = await updatePostById(id, updateObject);
    return response;
}