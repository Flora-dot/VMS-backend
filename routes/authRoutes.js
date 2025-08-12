import express from 'express';
import { register, login } from '../controllers/authControllers.js'; // include .js extension if using ES modules

const router = express.Router();

// Define POST /auth/register (or "/" if mounted at /auth/register in app.js)
router.post("/register", register);

router.post("/login", login); // Define POST /auth/login

export default router;