import express from "express";
import { signupUser, loginUser, logoutUser, followUnfollowUser } from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js"


const router = express.Router();

//SignUp
router.post("/signup", signupUser)

//Login
router.post("/login", loginUser)

//Logout
router.post("/logout", logoutUser)

//follow and Unfollow
router.post("/follow/:id", protectRoute, followUnfollowUser)//bcz we will be following user using id ,,,, and ,,,, id is joined with ':' therefore it will be dynamic
//"protectRoute" is  a middleware  , that provide extra security like the logged out user cann't follow or unfollow and many more..


//update profile

export default router;