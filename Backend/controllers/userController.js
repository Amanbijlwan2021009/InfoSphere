import User from "../models/userModel.js";
<<<<<<< HEAD
import Post from "../models/postModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

const getUserProfile = async (req, res) => {
	// We will fetch user profile either with username or userId
	// query is either username or userId
	const { query } = req.params;

	try {
		let user;
 // const user = await User.findOne({ username }).select("-password").select("-updatedAt")

        //check if query is userId
		if (mongoose.Types.ObjectId.isValid(query)) {
			user = await User.findOne({ _id: query }).select("-password").select("-updatedAt");
		} else {
			//check if query is username
			user = await User.findOne({ username: query }).select("-password").select("-updatedAt");
		}

		if (!user) return res.status(404).json({ error: "User not found" });

		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in getUserProfile: ", err.message);
	}
};

const signupUser = async (req, res) => {
	try {
		const { name, email, username, password } = req.body;
		const user = await User.findOne({ $or: [{ email }, { username }] });

		if (user) {
			return res.status(400).json({ error: "User already exists" });
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			name,
			email,
			username,
			password: hashedPassword,
		});
		await newUser.save();

		if (newUser) {
			generateTokenAndSetCookie(newUser._id, res);

			res.status(201).json({
				_id: newUser._id,
				name: newUser.name,
				email: newUser.email,
				username: newUser.username,
				bio: newUser.bio,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in signupUser: ", err.message);
	}
};

const loginUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) return res.status(400).json({ error: "Invalid username or password" });

		if (user.isFrozen) {
			user.isFrozen = false;
			await user.save();
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			username: user.username,
			bio: user.bio,
			profilePic: user.profilePic,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
		console.log("Error in loginUser: ", error.message);
	}
};

const logoutUser = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 1 });
		res.status(200).json({ message: "User logged out successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in signupUser: ", err.message);
	}
};

const followUnFollowUser = async (req, res) => {
	try {
		const { id } = req.params;
		const userToModify = await User.findById(id);
		const currentUser = await User.findById(req.user._id);

		if (id === req.user._id.toString())
			return res.status(400).json({ error: "You cannot follow/unfollow yourself" });

		if (!userToModify || !currentUser) return res.status(400).json({ error: "User not found" });

		const isFollowing = currentUser.following.includes(id);

		if (isFollowing) {
			// Unfollow user
			await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
			res.status(200).json({ message: "User unfollowed successfully" });
		} else {
			// Follow user
			await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
			res.status(200).json({ message: "User followed successfully" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in followUnFollowUser: ", err.message);
	}
};

const updateUser = async (req, res) => {
	const { name, email, username, password, bio } = req.body;
	let { profilePic } = req.body;

	const userId = req.user._id;
	try {
		let user = await User.findById(userId);
		if (!user) return res.status(400).json({ error: "User not found" });

		if (req.params.id !== userId.toString())
			return res.status(400).json({ error: "You cannot update other user's profile" });

		if (password) {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			user.password = hashedPassword;
		}

		if (profilePic) {
			if (user.profilePic) {
				await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);
			}

			const uploadedResponse = await cloudinary.uploader.upload(profilePic);
			profilePic = uploadedResponse.secure_url;
		}

		user.name = name || user.name;
		user.email = email || user.email;
		user.username = username || user.username;
		user.profilePic = profilePic || user.profilePic;
		user.bio = bio || user.bio;

		user = await user.save();

		// Find all posts that this user replied and update username and userProfilePic fields
		await Post.updateMany(
			{ "replies.userId": userId },
			{
				$set: {
					"replies.$[reply].username": user.username,
					"replies.$[reply].userProfilePic": user.profilePic,
				},
			},
			{ arrayFilters: [{ "reply.userId": userId }] }
		);

		// password should be null in response
		user.password = null;

		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in updateUser: ", err.message);
	}
};

const getSuggestedUsers = async (req, res) => {
	try {
		// exclude the current user from suggested users array and exclude users that current user is already following
		const userId = req.user._id;

		const usersFollowedByYou = await User.findById(userId).select("following");

		const users = await User.aggregate([
			{
				$match: {
					_id: { $ne: userId },
				},
			},
			{
				$sample: { size: 10 },
			},
		]);
		const filteredUsers = users.filter((user) => !usersFollowedByYou.following.includes(user._id));
		const suggestedUsers = filteredUsers.slice(0, 4);

		suggestedUsers.forEach((user) => (user.password = null));

		res.status(200).json(suggestedUsers);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const freezeAccount = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		if (!user) {
			return res.status(400).json({ error: "User not found" });
		}

		user.isFrozen = true;
		await user.save();

		res.status(200).json({ success: true });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export {
	signupUser,
	loginUser,
	logoutUser,
	followUnFollowUser,
	updateUser,
	getUserProfile,
	getSuggestedUsers,
	freezeAccount,
};



// import User from "../models/userModel.js";
// import Post from "../models/postModel.js";
// import bcrypt from "bcryptjs"
// import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";
// // import express from "express";
// import { v2 as cloudinary } from "cloudinary"

// const getUserProfile = async (req, res) => {
//     // We will fetch user profile either with username or userId
//     // query is either username or userId
//     const { query } = req.params;

//     try {
//         let user;
//         // const user = await User.findOne({ username }).select("-password").select("-updatedAt")

//         //check if query is userId
//         if (mongoose.Types.ObjectId.isValid(query)) {
//             user = await User.findOne({ _id: query }).select("-password").select("-updatedAt");
//         } else {
//             //check if query is username
//             user = await User.findOne({ username: query }).select("-password").select("-updatedAt");
//         }

//         if (!user) return res.status(404).json({ error: "User not found" });

//         res.status(200).json(user);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//         console.log("Error in getUserProfile: ", err.message);
//     }
// };


// const signupUser = async (req, res) => {
//     try {
//         const { name, email, username, password } = req.body;
//         const user = await User.findOne({ $or: [{ email }, { username }] });//This will check whether the user is registered or not {::more specifically it will check for any email or username of the user in the db::}

//         if (user) {
//             return res.status(400).json({ error: "User already exists" });//If user already registered
//         }

//         //Hashing Password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);
=======
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";
// import express from "express";
import { v2 as cloudinary } from "cloudinary"


const getUserProfile = async (req, res) => {
    //We will fetch user profile either by username or userid
    //query is either username or userid
    const { query } = req.params;

    try {
        let user;
        // const user = await User.findOne({ username }).select("-password").select("-updatedAt")

        //check if query is userId
        if (mongoose.Types.ObjectId.isValid(query)) {
            user = await User.findOne({ _id: query }).select("-password").select("-updatedAt")
        
        }
        //check if query is username
        else{
            user = await User.findOne({ username: query }).select("-password").select("-updatedAt")
        }
        
        if (!user) return res.status(400).json({ error: "User not found." })
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({ error: err.message });
        console.log("Error in updateUser: ", err.message);

    }
}

// const signupUser = async (req, res) => {
//     // res.send("Do")
//     try {
//         const { name, email, username, password } = req.body;
//         const user = await User.findOne({ $or: [{ email }, { username }] })//This will check whether the user is registered or not {::more specifically it will check for any email or username of the user in the db::}

//         if (user) {
//             res.status(400).json({ error: "User already exists" })//If user already registered
//         }

//         //hashing password
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password, salt)
>>>>>>> 0d00deef4c1f037fa075847f988ac901c685e54f

//         //creating new USER
//         const newUser = new User({
//             name,
//             email,
//             username,
//             password: hashedPassword,
<<<<<<< HEAD

=======
>>>>>>> 0d00deef4c1f037fa075847f988ac901c685e54f
//         });
//         //saving user and sending response
//         await newUser.save();

//         if (newUser) {
//             generateTokenAndSetCookie(newUser._id, res);//this file is used to generate token and cookie

//             res.status(201).json({
//                 _id: newUser._id,//the id is auto generated by mongodb
//                 name: newUser.name,
//                 email: newUser.email,
//                 username: newUser.username,
//                 bio: newUser.bio,
//                 profilePic: newUser.profilePic,
<<<<<<< HEAD
//             });
//         } else {
//             res.status(400).json({ error: "Invalid user data" });
//         }
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//         console.log("Error in signupUser: ", err.message);
//     }
// };

=======
//             })
//         }
//         // res.status(200).json({ message: "User created successfully" })
//         else {
//             res.status(400).json({ error: "Invalid User data" })
//         }

//     } catch (err) {
//         res.status(500).json({ error: err.message })
//         console.log("Error in signupUser:", err.message)

//     }
// }

const signupUser = async (req, res) => {
    try {
        const { name, email, username, password } = req.body;
        const user = await User.findOne({ $or: [{ email }, { username }] });

        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            username,
            password: hashedPassword,

        });
        await newUser.save();

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username,
                bio: newUser.bio,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error in signupUser: ", err.message);
    }
};
>>>>>>> 0d00deef4c1f037fa075847f988ac901c685e54f

// const loginUser = async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const user = await User.findOne({ username });
//         const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
//         //here if the user name not found then it will give a strange error bcz bycrpt cannot compare a string (i.e. passoword) from a null (i.e. user?.password)        
<<<<<<< HEAD
//         //         // So to solve this we have used '||' , therefore , if the user not found then bcrypt will compare pass with an empty block
//         //         //and why ? placed betwee user , password ,, bcz if user is empty then how will it search for pass , so ? is added
//         if (!user || !isPasswordCorrect) return res.status(400).json({ error: "Invalid username or password" });

//         if (user.isFrozen) {
//             user.isFrozen = false;
//             await user.save();
//         }

//         generateTokenAndSetCookie(user._id, res);

//         res.status(200).json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             username: user.username,
//             bio: user.bio,
//             profilePic: user.profilePic,
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//         console.log("Error in loginUser: ", error.message);
//     }
// };

// const logoutUser = (req, res) => {
//     try {
//         res.cookie("jwt", "", { maxAge: 1 })//after 1 ms it gonna cleared out
//         res.status(200).json({ message: "User logged out successfully" })

//     } catch (error) {
//         res.status(500).json({ error: error.message })
//         console.log("Error Occured", error.message)

//     }
// }

// const followUnfollowUser = async (req, res) => {
//     try {
//         // console.log("Received request to follow/unfollow user:", req.params.id);

//         const { id } = req.params;
//         const userToModify = await User.findById(id);//this is the person that we(app's user) gonna follow or unfollow
//         const currentUser = await User.findById(req.user._id)//here current USER will be us 
//         if (id === req.user._id.toString()) { return res.status(400).json({ error: "You cannot follow / unfollow yourself!" }); }//By using .toString you willnot be able to follow/unfollow yourself.......But if you remove it you can follow/unfollow yourself 

//         if (!userToModify || !currentUser) { return res.status(400).json({ error: "User not found." }) }

//         const isFollowing = currentUser.following.includes(id);

//         if (isFollowing) {
//             //Unfollow User

//             //Modify current user  following, modify followers of userToModify

//             await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } })//Same, id of the person current user followed will also be removed from here

//             await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } })//this will remove current user id from the person that he/she followed previously...

//             res.status(200).json({ message: "User unfollowed successfully." })
//             // console.log("error",error)

//         }
//         else {
//             //Follow User

//             //Modify current user   
//             await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } })
//             await User.findByIdAndUpdate(req.user._id, { $push: { following: id } })

//             res.status(200).json({ message: "User followed successfully." })

//         }
=======
//         // So to solve this we have used '||' , therefore , if the user not found then bcrypt will compare pass with an empty block
//         //and why ? placed betwee user , password ,, bcz if user is empty then how will it search for pass , so ? is added

//         if (!user || !isPasswordCorrect) { return res.status(400).json({ error: "Invalid username or password" }); }

//         generateTokenAndSetCookie(user._id, res)

//         res.status(200).json({
// 			_id: user._id,
// 			name: user.name,
// 			email: user.email,
// 			username: user.username,
// 			bio: user.bio,
// 			profilePic: user.profilePic,
// 		});
>>>>>>> 0d00deef4c1f037fa075847f988ac901c685e54f


//     } catch (error) {
//         res.status(500).json({ error: error.message })
<<<<<<< HEAD
//         console.log("Error in followUnfollow User", error.message)

//     }
// }

// const updateUser = async (req, res) => {
//     const { name, email, password, username, bio } = req.body
//     let { profilePic } = req.body

//     const userId = req.user._id

//     try {
//         let user = await User.findById(userId);
//         if (!user) return res.status(400).json({ error: "User not found.." })
//         if (req.params.id !== userId.toString()) return res.status(400).json({ error: "You cannot update other user's profile" });



//         if (password) {

//             const salt = await bcrypt.genSalt(10);
//             const hashedPassword = await bcrypt.hash(password, salt);
//             user.password = hashedPassword
//         }


//         //Deleting profile pic from CLOUDINARY
//         if (profilePic) {

//             if (user.profilePic) {//if user already have a profile Pic then we first delete it from the cloudinary
//                 await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0])
//             }
//             const uploadedResponse = await cloudinary.uploader.upload(profilePic) // 
//             profilePic = uploadedResponse.secure_url;

//         }

//         user.name = name || user.name;
//         user.email = email || user.email;
//         user.username = username || user.username;
//         user.profilePic = profilePic || user.profilePic;
//         user.bio = bio || user.bio;

//         user = await user.save();

//         //Find all posts that this user replied and update username and userProfilePic fields
//         await Post.updateMany(
//             { "replies.userId": userId },
//             {
//                 $set: {
//                     "replies.$[reply].username": user.username,
//                     "replies.$[reply].userProfilePic": user.profilePic,
//                 }
//             },
//             {
//                 arrayFilters: [{ "reply.userId": userId }]
//             }
//         )

//         // password should be null
//         user.password = null;

//         res.status(200).json(user)


//     } catch (error) {
//         res.status(500).json({ error: error.message })
//         console.log("Error in update User", error.message)

//     }
// }


// export { signupUser, loginUser, logoutUser, followUnfollowUser, updateUser, getUserProfile }
=======
//         console.log("Error in loging user", error.message)

//     }
// }
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) return res.status(400).json({ error: "Invalid username or password" });

        if (user.isFrozen) {
            user.isFrozen = false;
            await user.save();
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            bio: user.bio,
            profilePic: user.profilePic,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in loginUser: ", error.message);
    }
};

const logoutUser = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 1 })//after 1 ms it gonna cleared out
        res.status(200).json({ message: "User logged out successfully" })

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("Error Occured", error.message)

    }
}

const followUnfollowUser = async (req, res) => {
    try {
        // console.log("Received request to follow/unfollow user:", req.params.id);

        const { id } = req.params;
        const userToModify = await User.findById(id);//this is the person that we(app's user) gonna follow or unfollow
        const currentUser = await User.findById(req.user._id)//here current USER will be us 
        if (id === req.user._id.toString()) { return res.status(400).json({ error: "You cannot follow / unfollow yourself!" }); }//By using .toString you willnot be able to follow/unfollow yourself.......But if you remove it you can follow/unfollow yourself 

        if (!userToModify || !currentUser) { return res.status(400).json({ error: "User not found." }) }

        const isFollowing = currentUser.following.includes(id);

        if (isFollowing) {
            //Unfollow User

            //Modify current user  following, modify followers of userToModify

            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } })//Same, id of the person current user followed will also be removed from here

            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } })//this will remove current user id from the person that he/she followed previously...

            res.status(200).json({ message: "User unfollowed successfully." })
            // console.log("error",error)

        }
        else {
            //Follow User

            //Modify current user   
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } })
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } })

            res.status(200).json({ message: "User followed successfully." })

        }


    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("Error in followUnfollow User", error.message)

    }
}

const updateUser = async (req, res) => {
    const { name, email, password, username, bio } = req.body
    let { profilePic } = req.body

    const userId = req.user._id

    try {
        let user = await User.findById(userId);
        if (!user) return res.status(400).json({ error: "User not found.." })
        if (req.params.id !== userId.toString()) return res.status(400).json({ error: "You cannot update other user's profile" });



        if (password) {

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword
        }


        //Deleting profile pic from CLOUDINARY
        if (profilePic) {

            if (user.profilePic) {//if user already have a profile Pic then we first delete it from the cloudinary
                await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0])
            }
            const uploadedResponse = await cloudinary.uploader.upload(profilePic) // 
            profilePic = uploadedResponse.secure_url;

        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.username = username || user.username;
        user.profilePic = profilePic || user.profilePic;
        user.bio = bio || user.bio;

        user = await user.save();

        // password should be null
        user.password = null;

        res.status(200).json(user)


    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("Error in update User", error.message)

    }
}


export { signupUser, loginUser, logoutUser, followUnfollowUser, updateUser, getUserProfile }
>>>>>>> 0d00deef4c1f037fa075847f988ac901c685e54f
