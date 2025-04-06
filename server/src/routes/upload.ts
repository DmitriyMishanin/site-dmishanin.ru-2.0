import { Router } from 'express';
import { uploadImage } from '../controllers/UploadController';

const router = Router();

router.post('/image', uploadImage);

export default router; 