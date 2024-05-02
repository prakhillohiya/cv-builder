import { Express, Request, Response } from "express";
import { authMiddleware } from "../middleware/auth";
import cvRoute from "./cvRoute";
import cvTemplateRoute from "./cvTemplateRoute";
import userRoute from './userRoute';


const routes = (app: Express) => {
   app.use('/user', userRoute)
   app.use('/cv', authMiddleware, cvRoute)
   app.use('/template', authMiddleware, cvTemplateRoute)
   app.use('/check', async (req: Request, res: Response) => {
      try {
         res.status(200).send({ "message": "Server Running" })
      } catch (error) {
         res.status(500).send({ "message": "Internal Server Error" })
      }
   })
}

export default routes