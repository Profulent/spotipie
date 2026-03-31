import express from "express"
import musicController from "../controllers/music.controller.js"
import multer from "multer"


const upload = multer({
  storage: multer.memoryStorage(), // store the file in memory, we will upload it to imagekit. 

})

const router = express.Router() 


router.post("/upload", upload.single("music"), musicController.createMusic) // this route will be used to upload music, only artists can upload music, so we will check for the role of the user in the controller. we will also use multer middleware to handle the file upload, which will add the file information to the request object, which we can access in the controller.




export default router