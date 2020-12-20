export const environment = {
    server: { port: process.env.SERVER_PORT || 3001 },
    db: { url: process.env.DB_URL ||
        'mongodb://macc:1234qwer@cluster-1-mongodb/cart-api?retryWrites=true&w=majority' },
    security: {
        saltRounds: process.env.SALT_ROUNDS || 10,
        apiSecret: process.env.API_SECRET || 'secretKet'
    }
}