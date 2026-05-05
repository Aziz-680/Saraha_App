import { Router } from "express";
import * as userService from "./user.service.js"
import { authenticate, authorize } from "../../Middlewares/authentication.middleware.js";
import { USER_ROLES } from "../../common/constants.js";

const userController = Router();

// GET /users/:id -> Get single user
userController.get('/profile', authenticate, async (req, res, next) => {

    const data = await userService.getProfileService(req);
    res.status(200).json({ message: "Profile Loaded Succesfully", data });

});

userController.put('/update', authenticate, async (req, res) => {

    const result = await userService.updateUserProfile(req.user , req.body)
    res.status(200).json({ message: "Profile Updated", data: result });

})

userController.get('/all' , authenticate , authorize(USER_ROLES.ADMIN), async (req,res) => {
    const result = await userService.getAllUsers()
    res.status(200).json({message: "All Users are Displayed Here." , data: result})
})

export default userController;