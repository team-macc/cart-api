import * as restify from 'restify'

export const handlerError = (req: restify.Request,
    resp: restify.Response, err: any, done: any)=>{

        // err.toJSON=()=>{
        //     return {
        //         message: err.message,
        //     }
        //}
        switch(err.name){
            case 'MongoError':
                if(err.code ===11000){
                    err.statusCode = 400
                }
                break
            case 'ValidationError':
                err.statusCode = 400
        }
        done()
    }