// File: src/user.controller.js

import { Router } from "express";
import * as userService from "./user.service.js"

const userController = Router();

// GET /users/:id -> Get single user
userController.get('/profile', async (req, res, next) => {
    try {
        const data = await userService.getProfileService(req.headers);
        res.status(200).json({ message: "Success", user: data });
    } catch (error) {
        next(error); // Passes to your global error handler
    }
});

// GET /users -> Get all users
userController.get('/', async (req, res, next) => {
    try {
        const data = await userService.getAllUsersService();
        res.status(200).json({ message: "Success", users: data });
    } catch (error) {
        next(error);
    }
});

// PUT /users/:id -> Update user
userController.put('/:id', async (req, res, next) => {
    try {
        const data = await userService.updateProfileService(req.params.id, req.body);
        res.status(200).json({ message: "User updated successfully", user: data }); 
    } catch (error) {
        next(error);
    }
});

// DELETE /users/:id -> Delete user
userController.delete('/:id', async (req, res, next) => {
    try {
        await userService.deleteProfileService(req.params.id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
});

export default userController;