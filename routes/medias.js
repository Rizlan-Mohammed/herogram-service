import express from 'express';
import multer from 'multer';
import {
    uploadMedia,
    getAllMedia,
    deleteMedia,
    shareMedia,
    getSharedMedia
} from '../controllers/mediasController.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); 
    },
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), uploadMedia);
router.get('/', getAllMedia);
router.delete('/:id', deleteMedia);
router.post('/share/:id', shareMedia);

export default router; 
