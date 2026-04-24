import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 6,
        // 📍 custom validation:
        validate: {
            validator: function (emailValue) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue);
            },
            message: "Invalid email format",
        },
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
    },
}, {timestamps: true});

// userSchema.pre('save',function modifyPassword(next) { // old version
userSchema.pre('save',function modifyPassword() { // new version
    const user = this; // object containing the plain password
    const SALT = bcrypt.genSaltSync(9);
    const hashedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = hashedPassword;
    // next(); // no need to call it, because Mongoose will execute it automatically
})

const User = mongoose.model("User", userSchema);

export default User;