import {Express } from "express";
import userRoute from './userRoute'
import cvRoute from "./cvRoute";
import cvTemplateRoute from "./cvTemplateRoute";
import { authMiddleware } from "../middleware/auth";
import { ZUser } from "../schema/userSchema";
import { validateSchema } from "../middleware/validator";


const routes=(app:Express)=>{
   app.use('/user',userRoute)
   app.use('/cv',authMiddleware,cvRoute)
   app.use('/template',authMiddleware,cvTemplateRoute)
}

export default routes