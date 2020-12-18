"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_js_1 = require("./server/server.js");
const cart_router_1 = require("./carts/cart.router");
const server = new server_js_1.Server();
server.bootstrap([cart_router_1.cartsRouter]).then(() => {
    console.log('Server is listening on:', server.application.address());
}).catch((error) => {
    console.log('Server failed to start');
    console.log(error);
    process.exit(1);
});
