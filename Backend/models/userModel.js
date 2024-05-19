import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            minLength: 6,
            required: true,
        },
        profilePic: {
            type: String,
            default: "",
        },
        followers: {
            type: [String],
            default: [],
        },
        following: {
            type: [String],
            default: [],
        },
        bio: {
            type: String,
            default: "",
        },
        isFrozen: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;


// import mongoose from "mongoose";

// const userSchema = mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     username: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         minLength: 6,
//         required: true,
//     },
//     profilePic: {
//         type: String,
//         default: "",
//     },
//     followers: {
//         type: [String],
//         default: [],
//     },
//     following: {
//         type: [String],
//         default: [],
//     },
//     bio: {
//         type: String,
//         default: "",
//     }

// }, {
//     timestamps: true,//this adds createdAt and updatedAt field ,,,, By which we can add things like profile created etc
// });

// const User = mongoose.model('User', userSchema);
// export default User;