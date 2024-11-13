import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import multer from 'multer';

const router  = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        const uploadDir = path.join(__dirname, '../uploads');
        cb(null, uploadDir);
    },


    filename:(req, file, cb)=>{
        const extname = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${extname}`)
    }
})

const fileFilter = (req,file, cb) =>{
    const filetypes = /jpe?g|png|webp/i;
    const mimetypes = /image\/jpe?g|image\/png||image\/webp/;

    const extname = path.extname(file.originalname);
    const mimetype = file.mimetype;

    if(filetypes.test(extname) && mimetypes.test(mimetype)){
        cb(null, true)
    }else{
        cb(new Error("image only"), false);
    }

};

const upload  = multer({storage,fileFilter});
const uploadSingleImage = upload.single('image');

router.post('/',(req, res)=>{
    uploadSingleImage(req,res,(err)=>{
        if(err){
            res.status(400).send({message: err.message});
        }else if(req.file){
            res.status(200).send({
                message:"Message uploaded successifully",
                image: `/${req.file.path}`
            });
        }else{
            res.status(400).send({message: "No image file provided"});
        }
    });
});


export default router;