import mongoose from "mongoose";


async function connectDB() {
  
  try {
    await mongoose.connect(process.env.MONGO_URI)

    console.log("database connected successfully.")
  }
  catch(error){
    console.log('Database connection error', error)
  }
}


export default connectDB;