import express from "express"
import musicController from "../controllers/music.controller"




const router = express.Router() 


router.post("/upload", musicController.createMusic) // this route will be used to upload music, only artists can upload music, so we will check for the role of the user in the controller. we will also use multer middleware to handle the file upload, which will add the file information to the request object, which we can access in the controller.




export default router