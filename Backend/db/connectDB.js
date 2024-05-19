import mongoose from "mongoose";
<<<<<<< HEAD

const connectDB = async () => {
    try {
        //conn variable which uses mongoose connect method that connects mongo uri in env
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // To avoid warnings in the console
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;



// import mongoose from "mongoose";
// const connectDB = async () => {
//     try{
//         //conn variable which uses mongoose connect method that connects mongo uri in env
//         const conn = await mongoose.connect(process.env.MONGO_URI, {

//             //to avoid warning in the console
//             // useNewUrlParser: true,
//             // useUnifiedTopology: true,
//         });
//         console.log(`MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.error(`Error: ${error.message}`);
//         process.exit(1);//means that you are exiting this process
//     }
// }

// export default connectDB;
=======
const connectDB = async () => {
    try{
        //conn variable which uses mongoose connect method that connects mongo uri in env
        const conn = await mongoose.connect(process.env.MONGO_URI, {

            //to avoid warning in the console
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);//means that you are exiting this process
    }
}

export default connectDB;
>>>>>>> 0d00deef4c1f037fa075847f988ac901c685e54f
