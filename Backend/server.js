<<<<<<< HEAD
import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";// Whenever you are importing any file then it is necessary to use .extension at the end of the file, name as it is . unilike in the component: there is no such need , as of my knowledge till now  
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
// import messageRoutes from "./routes/messageRoutes.js";
import { v2 as cloudinary } from "cloudinary";
// import { app, server } from "./socket/socket.js";
// import job from "./cron/cron.js";

dotenv.config();//This is used to connect env file to server 

const app = express()

connectDB();
// job.start();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middlewares
app.use(express.json({ limit: "50mb" })); // To parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); // To parse form data in the req.body
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
// app.use("/api/messages", messageRoutes);

// http://localhost:5000 => backend,frontend

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	// react app
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
=======
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";  // Whenever you are importing any file then it is necessary to use .extension at the end of the file, name as it is . unilike in the component: there is no such need , as of my knowledge till now  
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import { v2 as cloudinary } from "cloudinary"



dotenv.config();//This is used to connect env file to server 

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

// Instead of getting this below fixed port i.e. 5000 , it is good practice to get that port from environment vaiables .. and i am doing this above
// app.listen(5000, () => {
//     console.log(
//         "Server started at http://localhost:5000")
// });

//CLOUDINARY
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//MiddleWares
app.use(express.json({ limit: '50mb' }));//to parse JSON data in the req.body
// the express.json() middleware has a default limit of 100kb for the request body size.. SO WE HAVE SET ITS LIMIT TO 50mb

app.use(express.urlencoded({ extended: true }));//To parse form data in the req.body

app.use(cookieParser())


//Routes
app.use("/api/users", userRoutes)//when you hit the api/users/signup you'll get the res (as sign up successfully ::--> this is the message passed to it till now (at 2:00:10 ))
app.use("/api/posts/", postRoutes)

// so this can be written as :Below:
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
});
>>>>>>> 0d00deef4c1f037fa075847f988ac901c685e54f
