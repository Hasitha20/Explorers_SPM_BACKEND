const router = require ('express').Router()
const cloudinary = require ('cloudinary');
const fs = require('fs')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME_KM,
    api_key: process.env.CLOUD_API_KEY_KM,
    api_secret: process.env.CLOUD_API_SECRET_KM
})

//upload Images
router.post('/upload', (req, res) => {
    try {
        console.log(req.files)
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({msg : 'No Files were uploaded.'})

        const file = req.files.file;
        if(file.size > 1024*1024) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg : 'Size is too Large'})

        }

        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg : 'File format is Invalid.'})

        }

        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "test"}, async(err, result) => {
            if(err) throw err;

            removeTmp(file.tempFilePath)

            res.json({public_id: result.public_id, url: result.secure_url})
        })

        // res.json('Test Upload')
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

//Delete Images
router.post('/destroy', (req, res) => {
    try {
        const {public_id} = req.body;
        if(!public_id) return res.status(400).json({msg: 'No Image Selected!'})

        cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
            if(err) throw err;

            res.json({msg: "Deleted Image"})
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
    
})

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err;
    })
}

module.exports = router 