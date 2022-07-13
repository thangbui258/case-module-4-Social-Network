"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapperError = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.default = wrapperError;
//# sourceMappingURL=error.js.map