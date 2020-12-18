import {Server} from './server/server.js'
import {cartsRouter} from './carts/cart.router'

const server = new Server()
server.bootstrap([cartsRouter]).then(()=>{
    console.log('Server is listening on:', server.application.address())
}).catch((error)=>{
    console.log('Server failed to start')
    console.log(error)
    process.exit(1)
})