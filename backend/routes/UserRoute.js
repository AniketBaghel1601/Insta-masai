const express = require('express');
const {UserModel} = require('../models/UsersModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {balckListModel} = require('../models/blaclistModel');
const userRoute = express.Router();

userRoute.use(express.json());


// registration

userRoute.post('/register',async(req,res)=>{
    const {name,email,gender,password,age,city} = req.body;

    const user = await UserModel.findOne({email});
    if(user){
        res.status(200).json({msg : "you are already registered"});
    }
    else{
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.status(400).json({error : err});
            }
            else{
                const newUser = new UserModel({name,email,gender,password:hash,age,city});
                await newUser.save();
                res.status(200).json({msg : "new user got registered!"});
            }
        })
    }
})

userRoute.post('/login',async(req,res)=>{
    const {email,password} = req.body;

    const user = await UserModel.findOne({email});

    if(user){
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                const token = jwt.sign({userId : user.id, username : user.name},"Aniket");
                res.status(200).json({msg : "you are logged in!", token});
            }
            else{
                res.status(200).json({error : err});
            }
        })
    }
    else{
        res.status(200).json({msg : "please register..."});
    }
})

userRoute.post('/logout',async(req,res)=>{
    const token = req.headers.authorization?.split(' ')[1];
    try {
        const blackListedUser = new balckListModel({token});
       await blackListedUser.save();
        res.status(200).json({msg : "you are logged out!"})
    } catch (error) {
        res.status(200).json({msg : "please login first !"});
    }
})



module.exports = {
    userRoute
}