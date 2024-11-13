import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{type:String, required:true, trim:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    isAdmin:{type:Boolean,required:true, default:false}
},{timestamps:true});

const UserModel = mongoose.model('users', userSchema);
export default UserModel;