import * as restify from 'restify';
import {Cart} from './carts.model'
import {ModelRouter} from '../common/model-router'
import { NotFoundError } from 'restify-errors';
import {authorize} from '../security/authz.handler'

class CartsRouter extends ModelRouter<Cart>{
    constructor(){
        super(Cart)
    }

    findItems = (req, resp, next)=>{
        Cart.findById(req.params.id, "+items").then(
            cart=>{
                if(!cart){
                    throw new NotFoundError('Cart not Found')
                }else{
                    resp.json(cart.items)
                    return next()
                }
            }
        ).catch(next)
    }

    replaceItems = (req, resp, next)=>{
        Cart.findById(req.params.id).then(
            cart=>{
                if(!cart){
                    throw new NotFoundError('Cart not Found')
                }else{
                    cart.items = req.body
                    return cart.save()
                }
            }
        ).then(cart=>{
            resp.json(cart.items)
            return next()
        }).catch(next)
    }

    findByEmail = (req, resp, next)=>{        
        if(req.query.email){
          Cart.findByEmail(req.query.email)
              .then(user => user ? [user] : [])
              .then(this.renderAll(resp,next))
              .catch(next)              
        }else{
          next()
        }
      }


    applyRoutes(application: restify.Server) {
        console.log('****************CART ROUTERS****************')        
        application.get('/carts',[authorize, this.findByEmail, this.findAll])
        application.get('/carts/:id', [this.validateId, this.findById])
        application.post('/carts', this.save)
        application.put('/carts/:id', [this.validateId,this.replace])
        application.patch('/carts/:id', [this.validateId,this.update])
        application.del('/carts/:id', [this.validateId,this.delete])        
        application.get('/carts/:id/items', [this.validateId,this.findItems])
        application.put('/carts/:id/items', [this.validateId, this.replaceItems])       
    }}

export const cartsRouter = new CartsRouter()