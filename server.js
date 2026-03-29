import app from "./src/app.js"
import connectDB from "./src/db/db.js"
import { configDotenv } from "dotenv"
configDotenv()

connectDB()
console.log("MONGO_URI:", process.env.MONGO_URI)

app.listen(3000,()=>{
  console.log("Server is running on port 3000.")
})