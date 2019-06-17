import koa from 'koa';
import koaRouter from 'koa-router';
import koaBody from 'koa-bodyparser';
import {graphqlKoa, graphiqlKoa} from 'apollo-server-koa';
import {makeExecutableSchema} from 'graphql-tools';

/* eslint-disable babel/new-cap */
const app = new koa();
const router = new koaRouter();
/* eslint-enable babel/new-cap */
const PORT = 3001;

const typeDefs = `
  type Filter {
    id: Int!
    title: String
    date: String
    ordersFlagged: Int!
  }

  type Query {
    filters: [Filter]
    filter(id: Int!): Filter
  }
`;

const filters = [
  {
    id: 341,
    title: 'Suspicious email',
    date: '22 hours ago',
    ordersFlagged: 2,
  },
  {
    id: 893,
    title: 'Invalid address',
    date: '3 weeks ago',
    ordersFlagged: 9,
  },
  {
    id: 124,
    title: 'Invalid credit card',
    date: '2 months ago',
    ordersFlagged: 1,
  },
];

const resolvers = {
  Query: {
    filters: () => filters,
    filter(obj, args) {
      return filters.find((filter) => filter.id === args.id);
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

router.post('/graphql', koaBody(), graphqlKoa({schema}));
router.get('/graphql', graphqlKoa({schema}));

router.get('/graphiql', graphiqlKoa({endpointURL: '/graphql'}));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT);
