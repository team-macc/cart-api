// import * as restify from 'restify';
// import {User} from './users.model'
// import {ModelRouter} from '../common/model-router'
// import {authenticate} from '../security/auth.handler'
// import {authorize} from '../security/authz.handler'

// class UsersRouter extends ModelRouter<User>{

//     constructor(){
//         super(User)
//         this.on('beforeRender', document=>{
//             delete document.password
//             //ou
//             //document.password = undefined
//         })
//     }
    

//     // findByEmail = (req, resp, next)=>{
//     //     console.log('Find By email')
//     //     if(req.query.email){
//     //       User.findByEmail(req.query.email)
//     //           .then(user => user ? [user] : [])
//     //           .then(this.renderAll(resp,next))
//     //           .catch(next)              
//     //     }else{
//     //       next()
//     //     }
//     //   }


//     findByEmail = (req,resp, next)=>{
//         if(req.query.email){
//             User.find({email: req.query.email})
//             .then(this.renderAll(resp, next))
//             .catch(next)
//         }else{
//             next()
//         }
//     }
    

//     applyRoutes(application: restify.Server) {
//         console.log('****************USERS****************')
//         application.get({path:`${this.basePath}`, version: '2.0.0'}, [authorize('admin'), this.findByEmail,this.findAll])
//         // application.get({path:`${this.basePath}`, version: '1.0.0'}, [this.findAll])
//         application.get('/users/:id', [this.validateId, this.findById])
//         application.post('/users', this.save)
//         application.put('/users/:id', [this.validateId,this.replace])
//         application.patch('/users/:id', [this.validateId,this.update])
//         application.del('/users/:id', [this.validateId,this.delete])
//         application.post(`${this.basePath}/authenticate`,[authenticate])
//     }
// }
// export const usersRouter = new UsersRouter()