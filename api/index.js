const { ApolloServer } = require('apollo-server');
const { ApolloServer: Serverless } = require('apollo-server-cloud-functions');

require('./db');

const context = require('./context');
const typeDefs = require('./graphql/typedefs.graphql');

if (process.env.NODE_ENV === 'development') {
    new ApolloServer({schema, context})
        .listen()
        .then(({ url }) => {
            console.log(`Server is running at ${url}`);
        });
} else {
    module.exports = {
        graphqlBougieHaus: new Serverless({schema, context}).createHandler({
            cors: {
                origin: 'https://*.bougie.haus',
                allowedHeaders: ['Authorization'],
                credentials: true,
            }
        })
    };
}
