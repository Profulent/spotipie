//handles files uplaod to imagekit.
// you give it a file and it uploads it to imagekit and returns the result or uploaded file info.



import ImageKit from "@imagekit/nodejs";


const imageKitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});


async function uploadFile(file){
  const result = await imageKitClient.files.upload({
    file, // the real bytes of the data
    fileName:"music_" + Date.now(),  // unique name to each file. 
    folder:"yt-complete-backend/music" // the folder in imagekit where files will be uploaded.
  })

  return result; //sends back the result of the upload, which includes the url of the uploaded file and other info about the file.
}

export default {
  uploadFile
}