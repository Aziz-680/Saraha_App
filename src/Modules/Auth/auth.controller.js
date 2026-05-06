import {Router} from "express";
import * as authService from "./auth.service.js"
import { validation } from "../../Middlewares/index.js";
import { registerSchema } from "../../Validators/auth.validators.js";
const authController = Router();

authController.post('/register', validation(registerSchema), async (req,res) => {
    const result = await authService.registerService(req.body);
    res.status(201).json({message:"User Registered Successfully", data:result});
});

authController.post('/login', async (req,res) => {
    const result = await authService.loginService(req.body);
    res.status(200).json({message:"User Logged in Successfully", ...result});
});

authController.post('/retoken', async (req,res) => {
    const result = await authService.refreshTokenService(req.headers);
    res.status(200).json({message:"Token Refreshed", ...result});
});



export default authController;