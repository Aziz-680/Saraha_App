import multer from "multer";
import { fileExtensions } from '../Common/constants.js';

const multerLocal = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const destination = 'uploads'
            fs.mkdirSync(destination,{recursive:true})
            cb(null, destination)
        },
        filename:function (req, file, cb) {
            console.log(`File before multer parsing`);
            console.log({file});

            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, uniqueSuffix + '.' + file.originalname)
        }
    })

    //   image/png
    const fileFilter = function (req, file, cb) {
        const [fileType, fileExtension] = file.mimetype.split('/')
        const allowedExtensions = fileExtensions[fileType]
        if (allowedExtensions.includes(fileExtension)) {
            return cb(null, true)
        }

        return cb(new Error('File type not allowed'), false)
    }

    const limits ={
        files : 1,
        field : 1 
    }

    return multer({ fileFilter, storage })
}

export default multerLocal;
