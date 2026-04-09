import express from "express"
import musicController from "../controllers/music.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"
import multer from "multer"


const upload = multer({
  storage: multer.memoryStorage(), // store the file in memory, we will upload it to imagekit. 

})

const router = express.Router()


router.post("/upload", authMiddleware.authArtist, upload.single("music"), musicController.createMusic) // this route will be used to upload music, only artists can upload music, so we will check for the role of the user in the controller. we will also use multer middleware to handle the file upload, which will add the file information to the request object, which we can access in the controller.

router.post("/album", authMiddleware.authArtist, musicController.createAlbum) // this route will be used to create album, only artists can create album, so we will check for the role of the user in the controller. we will also use multer middleware to handle the file upload, which will add the file information to the request object, which we can access in the controller.



export default router