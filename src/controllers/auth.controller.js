import userModel from "../models/user.model";

async function registerUser(req,res) {
  const {username, email, password, role="user"} = req.body;

  
}