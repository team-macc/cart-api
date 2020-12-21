"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerError = void 0;
const handlerError = (req, resp, err, done) => {
    // err.toJSON=()=>{
    //     return {
    //         message: err.message,
    //     }
    //}
    switch (err.name) {
        case 'MongoError':
            if (err.code === 11000) {
                err.statusCode = 400;
            }
            break;
        case 'ValidationError':
            err.statusCode = 400;
    }
    done();
};
exports.handlerError = handlerError;
