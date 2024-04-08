"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const validator_1 = require("../middleware/validator");
const userSchema_1 = require("../schema/userSchema");
const router = (0, express_1.Router)();
router.post('/register', (0, validator_1.validateSchema)(userSchema_1.ZUser), userController_1.createUser);
router.post('/login', (0, validator_1.validateSchema)(userSchema_1.ZLogin), userController_1.login);
router.post('/logout', userController_1.logout);
exports.default = router;
//# sourceMappingURL=userRoute.js.map