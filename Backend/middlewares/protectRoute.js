<<<<<<< HEAD
import User from "../models/userModel.js";
=======
import User from "../models/userModel.js"
>>>>>>> 0d00deef4c1f037fa075847f988ac901c685e54f
import jwt from "jsonwebtoken";

//next is used below . why?====>>>> bcz when the follow:id is invoked then first  protectRoute will get invoked 
// and when all the function inside it is performed then 
// next will get triggered and followUnfollowUser controller will get invoked..

const protectRoute = async (req, res, next) => {
<<<<<<< HEAD
	try {
		const token = req.cookies.jwt;

		if (!token) return res.status(401).json({ message: "Unauthorized" });

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findById(decoded.userId).select("-password");

		req.user = user;

		next();
	} catch (err) {
		res.status(500).json({ message: err.message });
		console.log("Error in signupUser: ", err.message);
	}
};

export default protectRoute;
=======
    try {
        const token = req.cookies.jwt;

        if (!token) return res.status(401).json({ messge: "Unauthorized" });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");

        req.user = user;

        next();

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log("Error in loging user", error.message)
    }
};

export default protectRoute;
>>>>>>> 0d00deef4c1f037fa075847f988ac901c685e54f
