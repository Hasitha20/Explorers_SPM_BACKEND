const usersRouter = require('express').Router();
const User = require('../models/userModel');


usersRouter.route("/displayusers").get((req, res)=>{
    User.find({role: {$nin: [1, 2, 4]}}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

module.exports = usersRouter