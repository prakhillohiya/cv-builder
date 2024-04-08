"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.educationSchema = exports.ZEducation = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.ZEducation = zod_1.z.object({
    degree: zod_1.z.string(),
    institution: zod_1.z.string(),
    percentage: zod_1.z.string(),
});
exports.educationSchema = new mongoose_1.Schema({
    degree: { type: String },
    institution: { type: String },
    percentage: { type: String },
});
//# sourceMappingURL=educationSchema.js.map