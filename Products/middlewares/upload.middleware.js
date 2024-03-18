// const multer = require('multer')
// const path = require('path')
import multer from "multer";
import path from "path";

 const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
           return cb(null, ("uploads"))
        },
        filename: (req, file, cb) => {
           return cb(null, `${Date.now()}_${file.originalname}`)
        }
 
    })
}).fields([
   {name: 'image1', maxCount: 1},
   {name: 'image2', maxCount: 1},
   {name: 'image3', maxCount: 1},
   {name: 'image4', maxCount: 1}
]);

export default upload;