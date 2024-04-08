"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectsSchema = exports.ZProjects = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.ZProjects = zod_1.z.object({
    title: zod_1.z.string(),
    teamSize: zod_1.z.string(),
    duration: zod_1.z.string(),
    technologies: zod_1.z.string(),
    description: zod_1.z.string(),
});
exports.projectsSchema = new mongoose_1.Schema({
    title: { type: String },
    teamSize: { type: String },
    duration: { type: String },
    technologies: { type: String },
    description: { type: String },
});
//# sourceMappingURL=projectsSchema.js.map