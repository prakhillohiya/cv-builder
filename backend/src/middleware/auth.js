"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const authMiddleware = (req, res, next) => {
    try {
        const { jwt } = req.cookies;
        if (!jwt) {
            return res
                .status(401)
                .send({ message: "Auth Token Not Provided", status: 401 });
        }
        const user = (0, jwt_1.verifyToken)(jwt);
        if (!user) {
            return res.status(401).send({ message: "Session Expired", status: 401 });
        }
        req.body.reqUser = user;
        next();
    }
    catch (error) {
        return res.status(500).send({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.js.map