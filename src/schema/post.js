import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true,
        minLength: 5
    },
    image: {
        type: String,
        required: true
    },
    // - every post must belong to some user
    // - so, we also need to store userId
    // - so that there is some sense of relationship
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        // - every document present inside a collection in MongoDB has a unique ID, the above lines specifies that userId should be of that unique ID type
        ref: "User" // this means : the userId belongs to the collection named 'User' 
    }
}, {timestamps: true});

const Post = mongoose.model("Post", postSchema);

export default Post;