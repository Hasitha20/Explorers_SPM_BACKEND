const router = require('express').Router()
const cloudinary = require('cloudinary')
const auth = require('../middleware/csauth')
const authCashier = require('../middleware/csauthCashier')
const fs = require('fs')

//we will upload image on cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})
//upload image
router.post('/upload',auth, authCashier, (req, res)=>{
    try{
        console.log(req.files)
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({msg:'No files were uploaded.'})

        const file = req.files.file;
        if(file.size > 1024*1024*5) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg:'Size too large.File shoulld be at least 5MB'})
        }

        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg:'File format is incorrect. it should be jpeg and png type.'})
        }
            

        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "cashier"}, async(err, result)=>{
            if(err) throw err;


            removeTmp(file.tempFilePath)


            res.json({public_id: result.public_id, url: result.secure_url})
        })



    }catch(err){
        return res.status(500).json({msg: err.message})
    }
})
//Delete a image
router.post('/destroy',auth, authCashier, (req, res)=>{
    try{
        const {public_id} = req.body
        if(!public_id) return  res.status(400).json({msg: 'No images selected'})

        cloudinary.v2.uploader.destroy(public_id, async(err, result)=>{
            if(err) throw err;

            res.json({msg: 'Deleted Image'})
        })
    }catch(err){
        return res.status(500).json({msg: err.message})
    }
    

})
const removeTmp = (path)=>{
    fs.unlink(path, err=>{
        if(err) throw err;
    })
}
module.exports = router