const multer = require('multer');
import path from 'path';

export const MulterConfig = multer({ 
    storage: multer.memoryStorage({
        destination: (req:Express.Request, file:any, cb:any) => {
            cb(null, path.join(__dirname, '..', '..', 'temp'));
        },
        filename: (req:Express.Request, file:any, cb:any) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        },
    }) 
});
