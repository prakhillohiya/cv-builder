"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.experienceSchema = exports.ZExperience = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.ZExperience = zod_1.z.object({
    orgName: zod_1.z.string(),
    joiningLocation: zod_1.z.string(),
    position: zod_1.z.string(),
    ctc: zod_1.z.string(),
    technologies: zod_1.z.string(),
    startDate: zod_1.z.string(),
    endDate: zod_1.z.string(),
});
exports.experienceSchema = new mongoose_1.Schema({
    orgName: { type: String },
    joiningLocation: { type: String },
    position: { type: String },
    ctc: { type: String },
    technologies: { type: String },
    startDate: { type: String },
    endDate: { type: String },
});
//# sourceMappingURL=experienceSchema.js.map