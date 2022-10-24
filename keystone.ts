import { config, graphQLSchemaExtension } from '@keystone-6/core'

import db from './db'
import { withAuth, session } from './auth'
import lists from './lists'
import { mergeSchemas } from '@graphql-tools/schema'

const gql = String.raw

const extendGraphqlSchema = (schema) =>
  mergeSchemas({
    schemas: [schema],
    typeDefs: gql`
      type Mutation {
        createPetAndUser(
          name: String!
          ownerId: ID
          breedId: ID
          email: String
          phone: String
        ): Pet
      }
    `,
    resolvers: {
      Mutation: {
        createPetAndUser: (root, variables, ctx) => {
          // console.log('>>> ', { root, variables, ctx })
          const { email, phone } = variables
          ctx.db.Owner.createOne({
            data: {
              email,
              phone,
              password: 'adfasdfsadf',
            },
          })
          return variables
        },
      },
    },
  })

export default config(
  withAuth({
    extendGraphqlSchema,
    lists,
    db,
    session,
    ui: {
      isAccessAllowed: (ctx) => !!ctx.session?.data,
    },
  })
)
