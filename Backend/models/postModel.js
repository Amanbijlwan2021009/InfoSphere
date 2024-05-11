import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,//this is gonna be an id that will be auto generated by mongoose
        ref: 'User',// the reference of the above id will be User Model
        required: true
    },
    text: {
        type: String,
        maxLength: 500
    },
    img: {
        type: String,
    },
    likes: {
        type: Number,
        default: 0,
    },
    //replies should be array of something so it is written as replies:[..]...

    replies: [{
        userId: {//as each replies should have a user id so to identify them

            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reply',
            required: true
        },
        text: {
            type: String,
            required: true
        },

        userProfilePic: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        }
    }
    ]
}, {
    timestamps: true
});

const Post = mongoose.model("Post", postSchema);

export default Post;