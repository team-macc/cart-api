"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose = require("mongoose");
const cartItemSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    idProduto: {
        type: String,
        required: true
    }
});
const cartSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    items: {
        type: [cartItemSchema],
        required: false,
        select: true,
        default: []
    }
});
cartSchema.statics.findByEmail = function (userEmail) {
    return this.findOne({ userEmail }); //{email: email}
};
exports.Cart = mongoose.model('Cart', cartSchema);
