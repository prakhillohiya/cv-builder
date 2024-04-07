import { Router } from "express";
import { createUser, login, logout } from "../controller/userController";
import { validateSchema } from "../middleware/validator";
import { ZLogin, ZUser } from "../schema/userSchema";



const router=Router()

router.post('/register',validateSchema(ZUser),createUser)

router.post('/login',validateSchema(ZLogin),login)

router.post('/logout',logout)


export default router