import multer from 'multer';
import dotEnv from 'dotenv';
dotEnv.config();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.FILE_UPLOAD_PATH);
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    },
});

export const upload = multer({ storage: storage });