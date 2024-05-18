import User from "../models/userModel.js"
import Post from "../models/postModel.js"
import { v2 as cloudinary } from "cloudinary"


//Get Post function
const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)//Used to find the post
        if (!post) {
            return res.status(404).json({ error: "Post not found!!" })
        }

        res.status(200).json({ post })

    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}

//Create Post function
const createPost = async (req, res) => {
    try {
        const { postedBy, text } = req.body;
        let { img } = req.body

        if (!postedBy || !text) {
            return res.status(400).json({ error: "Posted by and text fields are required" })
        }

        const user = await User.findById(postedBy) //Checks whether the user exists .
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        if (user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "Unauthorized to create some other user post." })
        }//This don't allow any user to post anything from other user's account 

        const maxLength = 500;
        if (text.length > maxLength) {
            return res.status(400).json({ error: `Text must be less than ${maxLength} characters.` })
        }

        if (img) {
            const uploadedResponse = await cloudinary.uploader.upload(img)
            img = uploadedResponse.secure_url;

        }

        const newPost = new Post({ postedBy, text, img })

        await newPost.save()
        res.status(201).json({ message: "Post created successfully", newPost })

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error)


    }
}

//Delete Post function
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)//Check whether user exist or not 
        if (!post) {
            return res.status(404).json({ error: "Post not found!!" })
        }

        if (post.postedBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "Unauthorized to delete post " })//This checks whether you trying to delete your post or some other's post ... If someother's then it will not allow 
        }

        //Previously we are only deleting this post from the database , BUT we are also using CLOUDINARY for storing images , so what if there is an image uploaded in the post , THEREFORE , we also need to delete it from the cloudinary

        if (post.img) {
            const imgId = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId);
        }
        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Post deleted Successfully!" })

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error)
    }
}

//Like Unlike Post function
const likeUnlikePost = async (req, res) => {
    try {
        const { id: postId } = req.params
        const userId = req.user._id

        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ error: "Post not found!" })
        }

        const userLikedPost = post.likes.includes(userId)//we gonna look at the "likes" array of the post  , included in the user Id.....

        if (userLikedPost) {
            //Unlike Post
            await Post.updateOne({ _id: postId }, { $pull: { likes: userId } })//it says that in the particullar id remove that userId {in simple words , it means remove the user that likes and unlike the post }
        }
        else {
            //Like Post

            post.likes.push(userId)
            await post.save()
            res.status(200).json({ message: "Post liked successfully" })
        }


    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error)
    }
}

//Reply to Post function
const replyToPost = async (req, res) => {
    try {
        const { text } = req.body//req.body se text property ko extract kar ke text variable mein store kiya gaya hai. Isse text variable mein wo data hoga jo client ne POST request ke saath bheja hai.

        const postId = req.params.id
        const userId = req.user._id
        const userProfilePic = req.user.profilePic
        const username = req.user.username

        if (!text) {
            return res.status(400).json({ error: "Text field is required." })
        }

        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ error: "Post not found!" })
        }

        const reply = { userId, text, userProfilePic, username }
        post.replies.push(reply)
        await post.save()
        res.status(200).json({ message: "Reply added successfully", post })

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error)

    }
}

//Getting Feed
const getFeed = async (req, res) => {
    try {
        const userId = req.user._id
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ error: "User not found!" })
        }
        const following = user.following
        const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({ createdAt: -1 })

        res.status(200).json(feedPosts)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getUserPosts = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const posts = await Post.find({ postedBy: user._id }).sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { createPost, getPost, deletePost, likeUnlikePost, replyToPost, getFeed, getUserPosts }