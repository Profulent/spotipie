// allowing only artists to create music, verification using token
// if token role is artist, then allow to create music, else return unauthorized. 
// Also, the file will be uploaded to imagekit and the url will be saved in the database along with the title of the music.
import musicModel from "../models/music.model.js";
import albumModel from "../models/album.model.js";
import jwt from "jsonwebtoken";
import uploadFile from "../services/storage.service.js";

async function createMusic(req, res) {

  const token = req.cookies.token; // checking for token in cookies because we are using cookie to store the token . if user is logged in  then there will be a token in cookies else not

  if (!token) {  // no token = user is not logged in.
    return res.status(401).json({
      message: "Unauthorized"
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // if token is valid and hasnt been changed, it will return the decoded token, which contains the user information, including the role. If token is invalid, it will throw an error and catch block will handle it.


    if (decoded.role !== "artist") {
      return res.status(403).json({
        message: "You dont have access to create music"
      })
    }

    const { title } = req.body;
    const file = req.file; //multer middleware will handle the file upload and will add the file information to the request object, which we can access using req.file.

    const result = await uploadFile(file.buffer.toString("base64")); // we need to convert the file buffer to base64 string before uploading to imagekit, because imagekit expects the file to be in base64 format. // we getting url in result.url. 

    const music = await musicModel.create({ // the below is the data we want to save in the db.
      uri: result.url,
      title,
      artist: decoded.id
    })
    return res.status(201).json({
      message: "Music created successfully",
      music,
      musicUrl: result.url
    })
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Unauthorized",
    })
  }
}


async function createAlbum(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized"
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (decoded.role !== "artist") {
      return res.status(403).json({
        message: "You dont have access to create an album"
      })
    }

    const { title, musics } = req.body;

    const album = await albumModel.create({
      title,
      artist: decoded.id,
      musics
    })

    res.status(201).json({
      message: "Album created successfully",
      album: {
        id: album._id,
        title: album.title,
        musics: album.musics,
        artist: album.artist
      }
    })
  }
  catch (err) {
    console.log(err)
    return res.status(401).json({
      message: "Unauthorized"
    })
  }
}


export default {
  createMusic,
  createAlbum
}