<<<<<<< HEAD
import express from "express";
import {
    createPost,
    deletePost,
    getPost,
    likeUnlikePost,
    replyToPost,
    getFeedPosts,
    getUserPosts,
} from "../controllers/postController.js";
=======
import express from "express"
import { createPost, getPost, deletePost, likeUnlikePost, replyToPost, getFeed, getUserPosts } from "../controllers/postController.js"
>>>>>>> 0d00deef4c1f037fa075847f988ac901c685e54f
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

<<<<<<< HEAD
router.get("/feed", protectRoute, getFeedPosts);
router.get("/:id", getPost);
router.get("/user/:username", getUserPosts);
router.post("/create", protectRoute, createPost);
router.delete("/:id", protectRoute, deletePost);
router.put("/like/:id", protectRoute, likeUnlikePost);
router.put("/reply/:id", protectRoute, replyToPost);

export default router;
=======

//Feed
router.get("/feed", protectRoute, getFeed)
//Get Post 
router.get("/:id", getPost)

router.get("/:user/username", getUserPosts)

//Creates Post
router.post("/create", protectRoute, createPost)

//Delete Post
router.delete("/:id", protectRoute, deletePost)

//Like Post
router.put("/like/:id", protectRoute, likeUnlikePost)

//i am changing method in like and reply from post to put , bcz we are going to do updating in that so put would be better , ,,,, Rather it doesn't affected anything we can use post also 
// BUT its a good practice to do so

router.put("/reply/:id", protectRoute, replyToPost)

export default router;
>>>>>>> 0d00deef4c1f037fa075847f988ac901c685e54f
