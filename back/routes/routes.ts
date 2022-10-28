import router from 'express';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema'
import { ingresoResolver } from '../graphql/resolvers/ingreso.resolvers';
import { gastoResolver } from '../graphql/resolvers/gasto.resolvers';
import { gastoFijoResolver } from '../graphql/resolvers/gasto-fijos.resolver';
import { ahorroResolver } from '../graphql/resolvers/ahorros.resolver';
import { inversionResolver } from '../graphql/resolvers/inversiones.resolver';

export const route = router();

const typeDefs = mergeTypeDefs(loadFilesSync('./graphql/types', { extensions: ['graphql'] }));
const resolvers = [ingresoResolver, gastoResolver, gastoFijoResolver, ahorroResolver, inversionResolver];
const schema = makeExecutableSchema({ typeDefs, resolvers: mergeResolvers(resolvers) });

route.use('/', graphqlHTTP({
    schema: schema,
    graphiql: true
}))