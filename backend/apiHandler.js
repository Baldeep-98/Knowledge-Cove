
const GraphQLDate = require('./graphqlDate')
const user = require('./users')
const rTime = require('./roomTime')
const book = require('./book');
const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const  addToCart  = require('./addCart');

const resolvers = {
    Query: {
        getUser: user.getUser,
        BookList: book.list,
        getBook: book.getBook,
        getBookedRoomInfo: rTime.getBookedRoom,
    },
    Mutation: {
        userAdd: user.userAdd,
        timeAdd: rTime.timeAdd,
        addToCart:book.addToCart,
    },
    
    GraphQLDate,
}


const server = new ApolloServer({
    typeDefs: fs.readFileSync('./schema.graphql', 'utf-8'), // schema
    resolvers,
    // just to print error in the console
    formatError: (error) => {
        console.log(error);
        return error;
    },
});

// Start the server

function installHandler(PORT) {
    server.listen({port: PORT}).then(({ url }) => {
        console.log(`Server ready at ${url}`);
    });
};


module.exports = { installHandler };