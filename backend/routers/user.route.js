import express from 'express';
import {  getCurrentUser, UpdateProfile } from '../controllers/user.controller.js';
import isAuth from '../middlewares/isAuth.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();

userRouter.get("/currentuser",isAuth,getCurrentUser);
userRouter.post("/updateprofile",isAuth,upload.single("photoUrl"),UpdateProfile)

export default userRouter;