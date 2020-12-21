import * as restify from 'restify';
import {Cart, CartItem} from './carts.model'
import {ModelRouter} from '../common/model-router'
import { NotFoundError } from 'restify-errors';
import {authorize} from '../security/authz.handler'
import * as restifyClient from 'restify-clients'
import {Order} from './order.model'

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

    pedidoParser=(cart:Cart):Order=>{
        let order = new Order()
        order.userEmail = cart.userEmail
        order.date = new Date()
        order.status = 'Waiting'
        if(cart.items){
            cart.items.forEach(item=>{
                item._id=undefined
                order.items.push(item)
            })
        }

        return order
    }

       
    fecharPedido = (req, resp, next)=>{
        const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmZWxpcGUudGl0b25lbEBnbWFpbC5jb20iLCJyb2xlcyI6WyJBZG1pbiJdLCJpYXQiOjE2MDgzMTc0MTMsImV4cCI6MTY2ODMxNzQxM30.-ylgexuKIYOpI6EeGonfbG0s6swyutZGziA4ActCSGo'
        let client = restifyClient.createJsonClient({
            url: 'http://172.17.0.3:3002'
          })

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
          }

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
          }

       Cart.findById(req.params.id).then(
           cart=>{                              
               client.post(optionsPost, this.pedidoParser(cart), function(err, req, res, obj){
                   if(err){
                       return next(err)
                   }
                resp.json(obj)
                cart.items = []
                cart.save()
                return next()
               })
               
           }
       ).catch(next)
       
    }


    applyRoutes(application: restify.Server) {
        console.log('****************CART ROUTERS****************')        
        application.get('/carts',[authorize, this.findByEmail, this.findAll])
        application.get('/carts/:id', [authorize,this.validateId, this.findById])
        application.post('/carts',[authorize, this.save])
        application.put('/carts/:id', [authorize,this.validateId,this.replace])
        application.patch('/carts/:id', [authorize,this.validateId,this.update])
        application.del('/carts/:id', [authorize,this.validateId,this.delete])        
        application.get('/carts/:id/items', [authorize,this.validateId,this.findItems])
        application.put('/carts/:id/items', [authorize,this.validateId, this.replaceItems])
        application.post('/carts/:id/fechar',[authorize, this.fecharPedido])     
    }}

export const cartsRouter = new CartsRouter()