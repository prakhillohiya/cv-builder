"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.ZLogin = exports.ZUser = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.ZUser = zod_1.z.object({
    _id: zod_1.z.string().optional(),
    userName: zod_1.z.string(),
    email: zod_1.z.string(),
    password: zod_1.z.string(),
    number: zod_1.z.string().optional(),
});
exports.ZLogin = zod_1.z.object({
    userNameOrEmail: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.userSchema = new mongoose_1.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    number: { type: String, required: false },
});
//# sourceMappingURL=userSchema.js.map