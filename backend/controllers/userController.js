import UserModel from "../models/user.js";
import bcrpt from 'bcryptjs';
import asyncHandler from "./asyncHandler.js";
import generateToken from "../utils/createToken.js";

const createUser = asyncHandler(async(req,res)=>{
    const{username,email,password}=req.body;
    if(!username || !email || !password) throw new Error("Please fill all the fields");

    const userExists = await UserModel.findOne({email});
    if(userExists)res.status(429).send('User arleady exists');

    const salt = await bcrpt.genSalt(10);
    const hashedPassword = await bcrpt.hash(password, salt);
    const newUser = new UserModel({username,email,password: hashedPassword});

    try {
        await newUser.save();
        generateToken(res, newUser._id); 

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
        })
    } catch (error) {
        res.status(400)
        throw new Error('Invalid user data');
    }



});

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    const existingUser = await UserModel.findOne({email});

    if(existingUser){
        const isPasswordValid = await bcrpt.compare(password,existingUser.password);

        if(isPasswordValid){
            generateToken(res, existingUser._id);
            res.status(201).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin, 
            });

        }else{
            res.status(401).json({"message":"invalid password"})
        }
    }else{
        res.status(401).json({"message":"user does not exist"})
    }

});

const logoutCurrentUser = (asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires: new Date(0),
    });
    res.status(200).json({message: " User logged out successifully"});
}));

const getAllUsers = asyncHandler(async(req,res)=>{
    const users = await UserModel.find({});
    res.json(users);
})

const getCurrentUserProfile = asyncHandler(async(req,res)=>{
    const user = await UserModel.findById(req.user._id);

    if(user){
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email
    
        })
    }else{
        res.status(404).json({message: "Profile not found"})
    }
})

const updateCurrentUserProfile = asyncHandler(async(req,res)=>{
    const user = await UserModel.findById(req.user._id);
    if(user){
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        if(req.body.password){
            const salt = await bcrpt.genSalt(10);
            const hashedPassword = await bcrpt.genSalt(req.body.password,salt)
            user.password = hashedPassword;
        }
        const updatedUser = await user.save();
        
        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    }else{
        res.status(404)
        throw new Error('User not found')
    };
});

export{createUser,loginUser, logoutCurrentUser,getAllUsers,getCurrentUserProfile,updateCurrentUserProfile };



