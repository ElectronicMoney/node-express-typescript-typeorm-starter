import path from 'path'
import {FileFilterCallback} from 'multer'

// Check fileType
export const checkFileExtention = (file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedFileExt = ['.jpeg', '.jpg','.png', '.gif'];
    const allowedMimeType = ['image/jpeg', 'image/jpg','image/png', 'image/gif'];

    // Get the file extention name
    const fileExtName = path.extname(file.originalname).toLocaleLowerCase()
    // Get the file mineType
    const mimeType = file.mimetype
    //  Check if file Extention Name is allowed
    if (allowedFileExt.includes(fileExtName) && allowedMimeType.includes(mimeType)) {
        return cb(null, true);
    } else {
        return cb({name: 'Wrong file extention', message: 'You can only upload an image file!'});
    }

}
