
const { ApolloServer, gql } = require('apollo-server');
const GraphQLJSON = require('graphql-type-json');


var StudiesAPI = require("./services/StudiesAPI.js");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  scalar JSON

  type Query {
    allStudies: JSON
  }

`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    allStudies: async (_source, { }, { dataSources }) => {
      return dataSources.studiesAPI.getStudies();;
    }  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      studiesAPI: new StudiesAPI()
    };
  },
  csrfPrevention: true,
  cache: 'bounded',
  context: ({ req }) => {
    return req;
  },
 });

 server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
// The `listen` method launches a web server.
