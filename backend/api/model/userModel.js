"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema_1 = require("../schema/userSchema");
exports.userModel = (0, mongoose_1.model)('User', userSchema_1.userSchema);
//# sourceMappingURL=userModel.js.map