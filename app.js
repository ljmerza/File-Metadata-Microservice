'use strict'

const express = require("express")
const multer = require('multer')

const app = express()

app.set('port', process.env.PORT || 80)
app.use(express.static('.'))

// set destination and fiename of uploaded file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

// connect destination and filename settings to multer object
const upload = multer({
    storage: storage
})

app.post("/api/fileanalyse/", upload.array('aFile'), addFile)

function addFile(req, res){
    // display all data gotten from file - is an array of jsons
    console.log("Uploaded file data: ", req.files)
    // set header status to okay
    res.status(200)
    // send only file sizes back to client
    req.files.forEach(function(aFile){
        res.json({
            size: aFile.size,
        })
    })
}
   
app.listen(app.get('port'), function(){
    console.log('server listening on port', app.get('port'))
}) 