import * as mongoose from 'mongoose';

export interface CartItem extends mongoose.Document{
    description: string,
    quantity: number,
    price: number,
    idProduto: string
}

export interface CartModel extends mongoose.Model<Cart> {
    findByEmail(email: string): Promise<Cart>
  }

export interface Cart extends mongoose.Document{
    userEmail: string,
    items: CartItem[],
}

const cartItemSchema = new mongoose.Schema(
    {
        description:{
            type: String,
            required: true
        },
        quantity:{
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
    }
)

const cartSchema = new mongoose.Schema(
    {
        userEmail:{
            type: String,
            required: true
        },
        items: {
            type: [cartItemSchema],
            required: false,
            select: true,
            default: []
        }
    }
)

cartSchema.statics.findByEmail = function(userEmail: string){
    return this.findOne({userEmail}) //{email: email}
  }

export const Cart = mongoose.model<Cart, CartModel>('Cart', cartSchema)