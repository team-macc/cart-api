//Ambiente de DEV
// export const environment = {
//     server: { port: process.env.SERVER_PORT || 3001 },
//     db: { url: process.env.DB_URL || 'mongodb://localhost/cart-api?authSource=root',
//     options:{useNewUrlParser: true}},
//     security: {
//         saltRounds: process.env.SALT_ROUNDS || 10,
//         apiSecret: process.env.API_SECRET || 'secretKet'
//     },
//     services:{
//         order:{
//             url:'http://172.17.0.3:3002',
//             token:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmZWxpcGUudGl0b25lbEBnbWFpbC5jb20iLCJyb2xlcyI6WyJBZG1pbiJdLCJpYXQiOjE2MDgzMTc0MTMsImV4cCI6MTY2ODMxNzQxM30.-ylgexuKIYOpI6EeGonfbG0s6swyutZGziA4ActCSGo'
//         },
//         stock:{
//             url:'http://172.17.0.1:8080',
//             token:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmZWxpcGUudGl0b25lbEBnbWFpbC5jb20iLCJyb2xlcyI6WyJBZG1pbiJdLCJpYXQiOjE2MDgzMTc0MTMsImV4cCI6MTY2ODMxNzQxM30.-ylgexuKIYOpI6EeGonfbG0s6swyutZGziA4ActCSGo'
//         }
//     }
// }

// Ambiente de Produção

export const environment = {
    server: { port: process.env.SERVER_PORT || 3001 },
    db: { url: process.env.DB_URL ||
        'mongodb://macc:1234qwer@cluster-1-mongodb/cart-api?retryWrites=true&w=majority' },
    security: {
        saltRounds: process.env.SALT_ROUNDS || 10,
        apiSecret: process.env.API_SECRET || 'secretKet'
    },
    services:{
        order:{
            url:'http://172.17.0.3:3002',
            token:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmZWxpcGUudGl0b25lbEBnbWFpbC5jb20iLCJyb2xlcyI6WyJBZG1pbiJdLCJpYXQiOjE2MDgzMTc0MTMsImV4cCI6MTY2ODMxNzQxM30.-ylgexuKIYOpI6EeGonfbG0s6swyutZGziA4ActCSGo'
        },
        stock:{
            url:'http://172.17.0.1:8080',
            token:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmZWxpcGUudGl0b25lbEBnbWFpbC5jb20iLCJyb2xlcyI6WyJBZG1pbiJdLCJpYXQiOjE2MDgzMTc0MTMsImV4cCI6MTY2ODMxNzQxM30.-ylgexuKIYOpI6EeGonfbG0s6swyutZGziA4ActCSGo'
        }
    }
}