const productRouter = require('express').Router();
const Product = require('../models/productsModel');


productRouter.route("/getAll").get((req, res) => {
    Product.find({}, function(docs, err) {
        if(!err){
            res.send(docs);

        }
        else{
            res.send(err);
        }
    })
})
module.exports = productRouter;