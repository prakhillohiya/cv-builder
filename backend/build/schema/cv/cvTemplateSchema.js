"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cvTemplateSchema = exports.ZCVTemplate = void 0;
const mongoose_1 = require("mongoose");
const profileSchema_1 = require("./profileSchema");
const templateSchema_1 = require("./templateSchema");
const zod_1 = require("zod");
exports.ZCVTemplate = zod_1.z.object({
    title: zod_1.z.string(),
    profile: profileSchema_1.ZProfile,
    template: templateSchema_1.ZTemplate,
});
exports.cvTemplateSchema = new mongoose_1.Schema({
    title: { type: String, unique: true },
    profile: profileSchema_1.profileSchema,
    template: templateSchema_1.templateSchema,
});
//# sourceMappingURL=cvTemplateSchema.js.map