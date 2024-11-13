import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
    name:{type:String, required:true, unique:true, minLength:3, maxLength: 50, trim: true}
});

const GenreModel = mongoose.model('genre',genreSchema);
export default GenreModel