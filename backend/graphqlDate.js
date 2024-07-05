
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const GraphQLDate = new GraphQLScalarType({
    name: 'GraphQLDate',
    description: 'A Date() type in graphQL as a scalar',
    serialize: (value) => value.toISOString(),
    parseLiteral: (ast) => {
        if (ast.kind === Kind.STRING) {
        const value = new Date(ast.value);
        return Number.isNaN(value.getTime()) ? undefined : value;
        }
        return undefined;
    },
    parseValue: (value) => {
        const value2 = new Date(value);
        return Number.isNaN(value2.getTime()) ? undefined : value2;
    },
});

module.exports = GraphQLDate;
