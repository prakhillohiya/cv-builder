import { Router } from "express";
import { deleteTemplateWithId, fetchAllCVTemplates, fetchCVTemplate, insertTemplate, updateTemplate } from "../controller/cvTemplateController";
import { authMiddleware } from "../middleware/auth";
import { validateSchema } from "../middleware/validator";
import { ZCVTemplate } from "../schema/cv/cvTemplateSchema";

const router=Router()

router.get('/fetchAll',fetchAllCVTemplates)

router.get('/fetch/:templateId',fetchCVTemplate)

router.post('/insert',validateSchema(ZCVTemplate),insertTemplate)

router.post('/update/:templateId',validateSchema(ZCVTemplate),updateTemplate)

router.delete('/delete/:templateId',deleteTemplateWithId)



export default router