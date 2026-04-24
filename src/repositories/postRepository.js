import Post from "../schema/post.js";

export const createPost = async(caption, image, userId) => {
    try{
        const newPost = await Post.create({caption, image, userId});
        return newPost;
    }
    catch(error){
        console.log(error);
    };
};

// 🕰️ OLD db interaction function (un-paginated)
// export const findAllPosts = async() => {
//     try{
//         const posts = await Post.find();
//         return posts
//     }
//     catch(error){
//         console.log(error);
//     };
// };
// 🕰️ NEW db interaction function (paginated)
export const findAllPosts = async(limit, offset) => {
    try{
        const posts = await Post.find().sort({createdAt: -1, }).skip(offset).limit(limit);
        return posts;
    }
    catch(error){
        console.log(error);
    };
};

export const countAllPosts = async() => {
    try{
        const count = await Post.countDocuments();
        return count;
    }
    catch(err){
        console.error(err);
    }
}

export const findPostById = async(id) => {
    try{
        const post = await Post.findById(id);
        return post;
    }
    catch(error){
        console.log(error);
    };
};

export const deletePostById = async(id) => {
    try{
        const post = await Post.findByIdAndDelete(id);
        return post;
    }
    catch(error){
        console.log(error);
    };
};

export const updatePostById = async(id, updateObject) => {
    try{
        const post = await Post.findByIdAndUpdate(id, updateObject, {new: true
        });
        // - by default (without that third argument object), the findByIdAndUpdate() function returns the old post
        // - to make it return the new post, we add that third argument
        return post;
    }
    catch(error){
        console.log(error);
    };
}