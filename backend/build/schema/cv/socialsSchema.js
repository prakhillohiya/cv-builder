"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socialsSchema = exports.ZSocials = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.ZSocials = zod_1.z.object({
    platform: zod_1.z.string(),
    profileLink: zod_1.z.string(),
});
exports.socialsSchema = new mongoose_1.Schema({
    platform: { type: String },
    profileLink: { type: String },
});
//# sourceMappingURL=socialsSchema.js.map