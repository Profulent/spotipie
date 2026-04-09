import jwt from "jsonwebtoken"

async function authArtist(req, res, next) {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({
      message: "unauthorized"
    })
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (decoded.role !== "artist") {
      return res.status(403).json({ message: "you dont have access" })
    }

    req.user = decoded;

    next() // if decoded.role == artist we run this 

  }
  catch (err) {
    console.log(err)
    return res.status(401).json({
      message: "unauthorized"
    })
  }
}

export default {
  authArtist
}