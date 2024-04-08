"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillsSchema = exports.ZSkills = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.ZSkills = zod_1.z.object({
    skill: zod_1.z.string(),
    perfection: zod_1.z.string(),
});
exports.skillsSchema = new mongoose_1.Schema({
    skill: { type: String },
    perfection: { type: String },
});
//# sourceMappingURL=skillsSchema.js.map