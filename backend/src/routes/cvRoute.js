"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cvController_1 = require("../controller/cvController");
const validator_1 = require("../middleware/validator");
const cvSchema_1 = require("../schema/cv/cvSchema");
const router = (0, express_1.Router)();
router.post('/create', (0, validator_1.validateSchema)(cvSchema_1.ZCV), cvController_1.createUserCV);
router.get('/fetchAll', cvController_1.fetchAllUserCV);
router.post('/update/:cvId', (0, validator_1.validateSchema)(cvSchema_1.ZCV), cvController_1.updateUserCV);
router.get('/fetch/:cvId', cvController_1.fetchUserCVWithCVId);
router.delete('/delete/:cvId', cvController_1.deleteCVWithCVId);
exports.default = router;
//# sourceMappingURL=cvRoute.js.map