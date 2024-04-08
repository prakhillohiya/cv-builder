"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cvTemplateModel = void 0;
const mongoose_1 = require("mongoose");
const cvTemplateSchema_1 = require("../schema/cv/cvTemplateSchema");
exports.cvTemplateModel = (0, mongoose_1.model)('CVTemplate', cvTemplateSchema_1.cvTemplateSchema);
//# sourceMappingURL=cvTemplateModel.js.map