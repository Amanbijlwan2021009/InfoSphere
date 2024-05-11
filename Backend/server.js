import express from "express";
import dotenv from "dotenv";  
import connectDB from "./db/connectDB.js";  // Whenever you are importing any file then it is necessary to use .extension at the end of the file name as it is . 
// unilike in the component there is no need as of my knowledge till now  



dotenv.config();//This is used to connect env file to server 

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

// Instead of getting this below fixed port i.e. 5000 , it is good practice to get that port from environment vaiables .. and i am doing this above
// app.listen(5000, () => {
//     console.log(
//         "Server started at http://localhost:5000")
// });

// so this can be written as :Below:
app.listen(PORT, () => {
    console.log(
        `Server started at http://localhost:${PORT}`)
});
