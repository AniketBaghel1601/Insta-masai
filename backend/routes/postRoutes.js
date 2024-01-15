const express = require('express');
const {auth} = require("../middlewares/auth.middleware");
const { postModel } = require('../models/postsModel');

const postRoute = express.Router();

postRoute.use(express.json());



postRoute.get('/',auth,async(req,res)=>{
    try {
        const posts = await postModel.findOne({userId : req.body.userId});
        res.status(200).json({msg : posts});
    } catch (error) {
        res.status(400).json({err : error})
    }
})


postRoute.post('/add',auth,async(req,res)=>{
    try {
        const payload = req.body;
        const post = new postModel(payload);
       await post.save();
        res.status(200).json({msg : "new post created"});
    } catch (error) {
        res.status(200).json({err : error});
    }
})

postRoute.patch('/update/:postId',auth,async(req,res)=>{
    try {
        
    const postId = req.params.postId;
    const post = await postModel.findOne({_id : postId});
    if(post.userId===req.body.userId){
       await postModel.findByIdAndUpdate({_id : postId},req.body);
       res.status(200).json({msg : "post updated"});
    }
    else{
        res.status(200).json({msg : 'enter the correct id !'});
    }

    } catch (error) {
        console.log(error);
    }
})

postRoute.delete('/delete/:postId',auth,async(req,res)=>{
    const postId = req.params.postId;
    const post = await postModel.findOne({_id : postId});
    if(post.userId===req.body.userId){
       await postModel.findByIdAndDelete({_id : postId},req.body);
       res.status(200).json({msg : "post deleted"});
    }
    else{
        res.status(200).json({msg : 'enter the correct id !'});
    }

})

module.exports = {
    postRoute
}