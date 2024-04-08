"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cvTemplateController_1 = require("../controller/cvTemplateController");
const validator_1 = require("../middleware/validator");
const cvTemplateSchema_1 = require("../schema/cv/cvTemplateSchema");
const router = (0, express_1.Router)();
router.get('/fetchAll', cvTemplateController_1.fetchAllCVTemplates);
router.get('/fetch/:templateId', cvTemplateController_1.fetchCVTemplate);
router.post('/insert', (0, validator_1.validateSchema)(cvTemplateSchema_1.ZCVTemplate), cvTemplateController_1.insertTemplate);
router.post('/update/:templateId', (0, validator_1.validateSchema)(cvTemplateSchema_1.ZCVTemplate), cvTemplateController_1.updateTemplate);
router.delete('/delete/:templateId', cvTemplateController_1.deleteTemplateWithId);
exports.default = router;
//# sourceMappingURL=cvTemplateRoute.js.map