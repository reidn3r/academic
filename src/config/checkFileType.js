const path = require('path');

const checkFileType = (file, cb) => {
    const types = /jpeg|jpg|png|gif|svg/;
    const extName = types.test(path.extname(file.originalname).toLocaleLowerCase());
    const mimeType = types.test(file.mimeType);

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb("Error: You can Only Upload Images!!");
    }
}

module.exports = { checkFileType };