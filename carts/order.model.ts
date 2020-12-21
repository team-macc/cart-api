import { CartItem } from "./carts.model"

export class Order{
    constructor(){
        this.items = []
    }
    userEmail: string
    items:CartItem[]
    date: Date
    status: string
}