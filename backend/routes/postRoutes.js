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


postRoute.post('/add',(req,res)=>{
    try {
        const payload = req.body;
        const post = new postModel(payload);
        res.status(200).json('')
    } catch (error) {

    }
})

postRoute.patch('/update',(req,res)=>{

})

postRoute.delete('/delete',(req,res)=>{

})

module.exports = {
    postRoute
}