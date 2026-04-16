// allowing only artists to create music, verification using token
// if token role is artist, then allow to create music, else return unauthorized. 
// Also, the file will be uploaded to imagekit and the url will be saved in the database along with the title of the music.
import musicModel from "../models/music.model.js";
import albumModel from "../models/album.model.js";
import jwt from "jsonwebtoken";
import uploadFile from "../services/storage.service.js";

async function createMusic(req, res) {

  const { title } = req.body;
  const file = req.file; //multer middleware will handle the file upload and will add the file information to the request object, which we can access using req.file.

  const result = await uploadFile(file.buffer.toString("base64")); // we need to convert the file buffer to base64 string before uploading to imagekit, because imagekit expects the file to be in base64 format. // we getting url in result.url. 

  const music = await musicModel.create({ // the below is the data we want to save in the db.
    uri: result.url,
    title,
    artist: req.user.id
  })
  return res.status(201).json({
    message: "Music created successfully",
    music,
    musicUrl: result.url
  })
}


async function createAlbum(req, res) {

  const { title, musics } = req.body;

  const album = await albumModel.create({
    title,
    artist: req.user.id,
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


async function getAllMusics(req, res) {

  const musics = await musicModel.find().populate("artist", "username email")

  res.status(200).json({
    message: "Music fetched successfully",
    musics
  })
}


async function getAllAlbums(req, res) {
  const albums = await albumModel.find().populate("artist", "username email").populate("musics")

  res.status(200).json({
    message: "albums fetched successfully",
    albums
  })
}


async function getAlbumById(req, res) {
  const albumId = req.params.albumId;
  const album = await albumModel.findById(albumId).populate("artist", "username email").populate("musics")

  if (!album) {
    return res.status(404).json({
      message: "Album not found"
    })
  }

  return res.status(200).json({
    message: "Album fetched successfully",
    album
  })
}



export default {
  createMusic,
  createAlbum,
  getAllMusics,
  getAllAlbums,
  getAlbumById
}