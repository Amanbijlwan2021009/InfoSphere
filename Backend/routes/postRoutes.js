import express from "express"
import { createPost, getPost, deletePost, likeUnlikePost,replyToPost,getFeed } from "../controllers/postController.js"
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();


//Feed
router.get("/feed",protectRoute,getFeed)
//Get Post 
router.get("/:id", getPost)

//Creates Post
router.post("/create", protectRoute, createPost)

//Delete Post
router.delete("/:id", protectRoute, deletePost)

//Like Post
router.post("/like/:id",protectRoute, likeUnlikePost)


router.post("/reply/:id",protectRoute, replyToPost)

export default router;