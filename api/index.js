const { ApolloServer } = require('apollo-server');
const { ApolloServer: Serverless } = require('apollo-server-cloud-functions');


const { schema, context } = require('./graphql');

if (process.env.NODE_ENV === 'development') {

    const server = ApolloServer({schema, context});

    server.listen()
        .then(({ url }) => {
            console.log(`Server is running at ${url}`);
        });

} else {

    const server = Serverless({schema, context});

    exports.graphqlBougieHaus = server.createHandler();

    // console.log(exports);
}