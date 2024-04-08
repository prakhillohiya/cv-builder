"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cvModel = void 0;
const mongoose_1 = require("mongoose");
const cvSchema_1 = require("../schema/cv/cvSchema");
exports.cvModel = (0, mongoose_1.model)('CV', cvSchema_1.cvSchema);
//# sourceMappingURL=cvModel.js.map