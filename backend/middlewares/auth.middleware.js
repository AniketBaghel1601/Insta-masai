const jwt = require('jsonwebtoken');
const {balckListModel} = require('../models/blaclistModel');

const auth = async(req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1];

    try{
        const present_token = await balckListModel.findOne({token});
        if(present_token){
            res.status(200).json({msg : "you are logged out please login again..."});
        }
        else{
            const decoded = jwt.verify(token,"Aniket");
            if(decoded){
                req.body.userId = decoded.userId;
                req.body.username = decoded.username;
                console.log(decoded);
                next();
            }
            else{
                res.status(200).json("wrong input !");
            }
        }
    }
    catch(err){
        res.status(400).json({error : err});
    }
}

module.exports = {
    auth
}