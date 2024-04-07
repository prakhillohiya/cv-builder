import { Router } from "express";
import { createUserCV, deleteCVWithCVId, fetchAllUserCV, fetchUserCVWithCVId, updateUserCV } from "../controller/cvController";
import { authMiddleware } from "../middleware/auth";
import { validateSchema } from "../middleware/validator";
import { ZCV } from "../schema/cv/cvSchema";


const router=Router()

router.post('/create',validateSchema(ZCV),createUserCV)
router.get('/fetchAll',fetchAllUserCV)
router.post('/update/:cvId',validateSchema(ZCV),updateUserCV)
router.get('/fetch/:cvId',fetchUserCVWithCVId)

router.delete('/delete/:cvId',deleteCVWithCVId)

export default router