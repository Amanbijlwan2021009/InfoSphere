import express from "express";
import {
    followUnFollowUser,
    getUserProfile,
    loginUser,
    logoutUser,
    signupUser,
    updateUser,
    getSuggestedUsers,
    freezeAccount,
} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/profile/:query", getUserProfile);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute, followUnFollowUser); // Toggle state(follow/unfollow)
router.put("/update/:id", protectRoute, updateUser);
router.put("/freeze", protectRoute, freezeAccount);

export default router;


// import express from "express";
// import { signupUser, loginUser, logoutUser, followUnfollowUser, updateUser, getUserProfile } from "../controllers/userController.js";
// import protectRoute from "../middlewares/protectRoute.js"


// const router = express.Router();

// //Get Profile
// router.get("/profile/:query", getUserProfile)//i think we used "get" here , so that we can get all the details not sure about that

// //SignUp
// router.post("/signup", signupUser)

// //Login
// router.post("/login", loginUser)

// //Logout
// router.post("/logout", logoutUser)

// //follow and Unfollow
// router.post("/follow/:id", protectRoute, followUnfollowUser)
// //bcz we will be following user using id ,,,, and ,,,, id is joined with ':' therefore it will be dynamic
// //"protectRoute" is  a middleware  , that provide extra security like the logged out user cann't follow or unfollow and many more..


// //Update:=>
// router.put("/update/:id", protectRoute, updateUser)

// //update profile

// export default router;