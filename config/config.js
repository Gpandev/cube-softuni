module.exports = {
    development: {
        port: process.env.PORT || 3000,
        privateKey: 'CUBE-WORKSHOP',
        databaseUrl: `mongodb+srv://georgiUser:${process.env.DB_PASSWORD}@georgisu-o1mbq.mongodb.net/cubicle?retryWrites=true&w=majority`
    },
    production: {}
};