export const environment = {
<<<<<<< HEAD
    server: {port: process.env.SERVER_PORT || 3001},
    db: {url: process.env.DB_URL || 'mongodb://localhost:27017/cart-api'},
    security:{saltRounds: process.env.SALT_ROUNDS || 10,
        apiSecret: process.env.API_SECRET || 'secretKet'}        
=======
    server: { port: process.env.SERVER_PORT || 3001 },
    db: { url: process.env.DB_URL || 'mongodb://root:uFmVY4qzIU@cart-db-mongodb/cart-api' },
    security: {
        saltRounds: process.env.SALT_ROUNDS || 10,
        apiSecret: process.env.API_SECRET || 'secretKet'
    }
>>>>>>> ad3ed57ad5b4c60eef739120c0ec1bcd75aeccc1
}