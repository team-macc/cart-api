"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartsRouter = void 0;
const carts_model_1 = require("./carts.model");
const model_router_1 = require("../common/model-router");
const restify_errors_1 = require("restify-errors");
const authz_handler_1 = require("../security/authz.handler");
const restifyClient = require("restify-clients");
const order_model_1 = require("./order.model");
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
        this.pedidoParser = (cart) => {
            let order = new order_model_1.Order();
            order.userEmail = cart.userEmail;
            order.date = new Date();
            order.status = 'Waiting';
            if (cart.items) {
                cart.items.forEach(item => {
                    item._id = undefined;
                    order.items.push(item);
                });
            }
            return order;
        };
        this.fecharPedido = (req, resp, next) => {
            const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmZWxpcGUudGl0b25lbEBnbWFpbC5jb20iLCJyb2xlcyI6WyJBZG1pbiJdLCJpYXQiOjE2MDgzMTc0MTMsImV4cCI6MTY2ODMxNzQxM30.-ylgexuKIYOpI6EeGonfbG0s6swyutZGziA4ActCSGo';
            let client = restifyClient.createJsonClient({
                url: 'http://172.17.0.3:3002'
            });
            let optionsPost = {
                path: '/orders',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                retry: {
                    'retries': 0
                },
                agent: false
            };
            let optionsPut = {
                path: `/carts/${req.params.id}/items`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                retry: {
                    'retries': 0
                },
                agent: false
            };
            carts_model_1.Cart.findById(req.params.id).then(cart => {
                client.post(optionsPost, this.pedidoParser(cart), function (err, req, res, obj) {
                    if (err) {
                        return next(err);
                    }
                    resp.json(obj);
                    cart.items = [];
                    cart.save();
                    return next();
                });
            }).catch(next);
        };
    }
    applyRoutes(application) {
        console.log('****************CART ROUTERS****************');
        application.get('/carts', [authz_handler_1.authorize, this.findByEmail, this.findAll]);
        application.get('/carts/:id', [authz_handler_1.authorize, this.validateId, this.findById]);
        application.post('/carts', [authz_handler_1.authorize, this.save]);
        application.put('/carts/:id', [authz_handler_1.authorize, this.validateId, this.replace]);
        application.patch('/carts/:id', [authz_handler_1.authorize, this.validateId, this.update]);
        application.del('/carts/:id', [authz_handler_1.authorize, this.validateId, this.delete]);
        application.get('/carts/:id/items', [authz_handler_1.authorize, this.validateId, this.findItems]);
        application.put('/carts/:id/items', [authz_handler_1.authorize, this.validateId, this.replaceItems]);
        application.post('/carts/:id/fechar', [authz_handler_1.authorize, this.fecharPedido]);
    }
}
exports.cartsRouter = new CartsRouter();
