"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const restify = require("restify");
const evironment_1 = require("../common/evironment");
const mongoose = require("mongoose");
const error_handler_1 = require("./error.handler");
const merge_patch_parser_1 = require("./merge-patch.parser");
const token_parser_1 = require("../security/token.parser");
const corsMiddleware = require("restify-cors-middleware");
class Server {
    initializeDb() {
        mongoose.Promise = global.Promise;
        return mongoose.connect(evironment_1.environment.db.url, {
            useNewUrlParser: true
        });
    }
    iniRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'cart-api',
                    version: '1.0.0'
                });
                const corsOptions = {
                    preflightMaxAge: 10,
                    origins: ['*'],
                    allowHeaders: ['Authorization'],
                    exposeHeaders: []
                };
                const cors = corsMiddleware(corsOptions);
                this.application.pre(cors.preflight);
                this.application.use(cors.actual);
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());
                this.application.use(merge_patch_parser_1.mergePatchBodyParser);
                this.application.use(token_parser_1.tokenParser);
                //Routes
                routers.forEach((router) => {
                    router.applyRoutes(this.application);
                });
                this.application.listen(evironment_1.environment.server.port, () => {
                    resolve(this.application);
                });
                this.application.on('restifyError', error_handler_1.handlerError);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap(routers = []) {
        return this.initializeDb().then(() => this.iniRoutes(routers).then(() => this));
    }
}
exports.Server = Server;
