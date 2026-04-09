import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
  uri: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId, // here type means the type of data that will be stored in this field, in this case it is an ObjectId which is a reference to another document in the database
    ref: "user", // here user is the name of the model that we are referencing. ref is used to establish a relationship btwn two models. 
    required: true
  }
});

const musicModel = mongoose.model("music", musicSchema);
export default musicModel;