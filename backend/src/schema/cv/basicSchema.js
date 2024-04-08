"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicSchema = exports.ZBasic = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.ZBasic = zod_1.z.object({
    avatar: zod_1.z.string(),
    name: zod_1.z.string(),
    profession: zod_1.z.string(),
    email: zod_1.z.string(),
    phone: zod_1.z.string(),
    address: zod_1.z.string(),
    city: zod_1.z.string(),
    pincode: zod_1.z.string(),
    intro: zod_1.z.string(),
});
exports.basicSchema = new mongoose_1.Schema({
    avatar: { type: String },
    name: { type: String },
    profession: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    pincode: { type: String },
    intro: { type: String },
});
//# sourceMappingURL=basicSchema.js.map