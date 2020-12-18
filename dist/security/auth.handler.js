// import * as restify from 'restify'
// import {User} from '../users/users.model'
// import {NotAuthorizedError} from 'restify-errors'
// import * as jwt from 'jsonwebtoken'
// import {environment} from '../common/evironment'
// export const authenticate: restify.RequestHandler = 
// function (req, resp, next){  
//     const{email, password} = req.body
//     User.findByEmail(email,'+password').then(user=>{
//         if(user && user.matches(password)){
//             //gerar token
//             const token = jwt.sign({
//                 sub: user.email,
//                 iss: 'meat-api'
//             }, environment.security.apiSecret)
//             resp.json({name: user.name, email: user.email, acessToken: token})
//             return next(false)
//         }else{
//             return next(new NotAuthorizedError('Invalid Credencials'))
//         }
//     }).catch(next)
// }
