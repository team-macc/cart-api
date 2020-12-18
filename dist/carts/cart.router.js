"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartsRouter = void 0;
const carts_model_1 = require("./carts.model");
const model_router_1 = require("../common/model-router");
const restify_errors_1 = require("restify-errors");
const authz_handler_1 = require("../security/authz.handler");
class CartsRouter extends model_router_1.ModelRouter {
    constructor() {
        super(carts_model_1.Cart);
        this.findItems = (req, resp, next) => {
            carts_model_1.Cart.findById(req.params.id, "+items").then(cart => {
                if (!cart) {
                    throw new restify_errors_1.NotFoundError('Cart not Found');
                }
                else {
                    resp.json(cart.items);
                    return next();
                }
            }).catch(next);
        };
        this.replaceItems = (req, resp, next) => {
            carts_model_1.Cart.findById(req.params.id).then(cart => {
                if (!cart) {
                    throw new restify_errors_1.NotFoundError('Cart not Found');
                }
                else {
                    cart.items = req.body;
                    return cart.save();
                }
            }).then(cart => {
                resp.json(cart.items);
                return next();
            }).catch(next);
        };
        this.findByEmail = (req, resp, next) => {
            if (req.query.email) {
                carts_model_1.Cart.findByEmail(req.query.email)
                    .then(user => user ? [user] : [])
                    .then(this.renderAll(resp, next))
                    .catch(next);
            }
            else {
                next();
            }
        };
    }
    applyRoutes(application) {
        console.log('****************CART ROUTERS****************');
        application.get('/carts', [authz_handler_1.authorize, this.findByEmail, this.findAll]);
        application.get('/carts/:id', [this.validateId, this.findById]);
        application.post('/carts', this.save);
        application.put('/carts/:id', [this.validateId, this.replace]);
        application.patch('/carts/:id', [this.validateId, this.update]);
        application.del('/carts/:id', [this.validateId, this.delete]);
        application.get('/carts/:id/items', [this.validateId, this.findItems]);
        application.put('/carts/:id/items', [this.validateId, this.replaceItems]);
    }
}
exports.cartsRouter = new CartsRouter();
