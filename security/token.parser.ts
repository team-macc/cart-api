import * as restify from 'restify'
import {User} from '../users/users.model'
import * as jwt from 'jsonwebtoken'
import {environment} from '../common/evironment'
import {NotAuthorizedError} from 'restify-errors'

export const tokenParser: restify.RequestHandler = (req, resp, next)=>{
    const token = extractToken(req)    
    if(token){        
        jwt.verify(token, environment.security.apiSecret, applyBearer(req, next))
    }else{
        next()
    }
}

function extractToken(req: restify.Request){
    //Authorization: Bearer token
    let token = undefined
    const authorization = req.header('Authorization')
    if(authorization){
        const parts: string[] = authorization.split(' ')
        if(parts.length === 2 && parts[0] === 'Bearer'){
            token = parts[1]
        }
    }

    return token
}


function applyBearer (req: restify.Request, next: restify.Next): (error, decoded)=>void{
    return (error, decoded)=>{
        if(error){
            next(new NotAuthorizedError(error))
        }else{
            let user = new User()
            user.email = decoded.sub
            req.authenticated = user
            next()
        }        
    }
}