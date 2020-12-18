import * as restify from 'restify'
import {environment} from '../common/evironment'
import {Router} from '../common/router'
import * as mongoose from 'mongoose'
import {handlerError} from './error.handler'
import { mergePatchBodyParser } from './merge-patch.parser'
import {tokenParser} from '../security/token.parser'

export class Server{

    application: restify.Server

    initializeDb(): Promise<mongoose.Mongoose>{
        (<any>mongoose).Promise = global.Promise
        return mongoose.connect(environment.db.url,{
            useNewUrlParser: true})
    }

    iniRoutes(routers: Router[]): Promise<any>{
        return new Promise((resolve, reject)=>{
            try{
                this.application = restify.createServer({
                    name: 'cart-api',
                    version: '1.0.0'                    
                })

                this.application.use(restify.plugins.queryParser())
                this.application.use(restify.plugins.bodyParser())
                this.application.use(mergePatchBodyParser)
                this.application.use(tokenParser)

                //Routes
                routers.forEach((router) => {
                    router.applyRoutes(this.application)
                });

                this.application.listen(environment.server.port, ()=>{
                    resolve(this.application)
                })

                this.application.on('restifyError', handlerError)

            }catch(error){
                reject(error)
            }
        })
    }

    bootstrap(routers: Router[] = []): Promise<Server>{
        return this.initializeDb().then(()=>
               this.iniRoutes(routers).then(()=>this))
    }
}