import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";  // Whenever you are importing any file then it is necessary to use .extension at the end of the file, name as it is . unilike in the component: there is no such need , as of my knowledge till now  
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js"



dotenv.config();//This is used to connect env file to server 

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

// Instead of getting this below fixed port i.e. 5000 , it is good practice to get that port from environment vaiables .. and i am doing this above
// app.listen(5000, () => {
//     console.log(
//         "Server started at http://localhost:5000")
// });

//Midle Wares
app.use(express.json());//to parse JSON data in the req.body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

//Routes
app.use("/api/users", userRoutes)//when you hit the api/users/signup you'll get the res (as sign up successfully ::--> this is the message passed to it till now (at 2:00:10 ))


// so this can be written as :Below:
app.listen(PORT, () => {
    console.log(
        `Server started at http://localhost:${PORT}`)
});

