import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb://localhost:27017/cityPizza').then(()=>{
       console.log('DB connected') ;
    })
}

// import mongoose from "mongoose";

// export const connectDB = async () => {
//     try {
//         await mongoose.connect('mongodb://192.168.43.126:27017/cityPizza'); // Just the connection string
//         console.log('DB connected');
//     } catch (error) {
//         console.error('DB connection error:', error);
//     }
// };

