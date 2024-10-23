import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/usersController.js';

const router = Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

export default router;