"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenParser = void 0;
const users_model_1 = require("../users/users.model");
const jwt = require("jsonwebtoken");
const evironment_1 = require("../common/evironment");
const restify_errors_1 = require("restify-errors");
const tokenParser = (req, resp, next) => {
    const token = extractToken(req);
    if (token) {
        jwt.verify(token, evironment_1.environment.security.apiSecret, applyBearer(req, next));
    }
    else {
        next();
    }
};
exports.tokenParser = tokenParser;
function extractToken(req) {
    //Authorization: Bearer token
    let token = undefined;
    const authorization = req.header('Authorization');
    if (authorization) {
        const parts = authorization.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1];
        }
    }
    return token;
}
function applyBearer(req, next) {
    return (error, decoded) => {
        if (error) {
            next(new restify_errors_1.NotAuthorizedError(error));
        }
        else {
            let user = new users_model_1.User();
            user.email = decoded.sub;
            req.authenticated = user;
            next();
        }
    };
}
