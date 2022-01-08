const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const TrackAPI = require("./datasources/track-api");

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
      return {
        trackAPI: new TrackAPI(),
      };
    },
  });

  const PORT = process.env.PORT || 4000;
  const { url, port } = await server.listen(PORT);
  console.log(`
      🚀  Server is running
      🔉  Listening on port ${port}
      📭  Query at ${url}
    `);
}

startApolloServer(typeDefs, resolvers);
