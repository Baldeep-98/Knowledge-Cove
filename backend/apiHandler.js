const GraphQLDate = require('./graphqlDate')
const user = require('./users')
const rTime = require('./roomTime')
const book = require('./book');
const { ApolloServer } = require('apollo-server');
const fs = require('fs');

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
        addBook: book.addBook,
        updateBook: book.updateBook,
    },
    
    GraphQLDate,
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync('./schema.graphql', 'utf-8'),
    resolvers,

    formatError: (error) => {
        console.log(error);
        return error;
    },
});

function installHandler(PORT) {
    server.listen({port: PORT}).then(({ url }) => {
        console.log(`Server ready at ${url}`);
    });
};

module.exports = { installHandler };
