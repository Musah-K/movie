import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';
import asyncHandler from '../controllers/asyncHandler.js';

//check authentication

const authenticate = asyncHandler(async(req,res,next)=>{
    let token;
    token = req.cookies.jwt;

    if(token){
        try {
            const decode =  jwt.verify(token, process.env.SECRET);
            req.user = await UserModel.findById(decode.userId).select('-password');

            next()
        } catch (error) {
            res.status(500)
            throw new Error('failed, try Again')
        }
    }else{
        res.status(401)
        throw new Error('Not authorised, token failed!')
    }
});

//check admin

const authorizeAdmin = (req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401).send('Not authorised as an admin')
    }
}

export{authenticate, authorizeAdmin};
