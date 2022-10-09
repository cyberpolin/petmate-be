import { list, config } from '@keystone-6/core'
import { statelessSessions } from '@keystone-6/core/session'
import { password, relationship, text } from '@keystone-6/core/fields'
import { createAuth } from '@keystone-6/auth'

const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } = process.env

const DATABASE_URL = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`

// Move to it's own file

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  sessionData: 'phone',
  secretField: 'password',
  initFirstItem: {
    fields: ['phone', 'email', 'password'],
  },
})

const session = statelessSessions({
  max: 60 * 60 * 24 * 1, // one day
  secret: 'WHATEVER BUT AT LEAST 32 CHAR 1234567890',
})

export default config(
  withAuth({
    lists: {
      User: list({
        fields: {
          phone: text({
            validation: { isRequired: true },
          }),
          email: text({
            validation: { isRequired: true },
            isIndexed: 'unique',
          }),
          password: password({ validation: { isRequired: true } }),
          pets: relationship({
            ref: 'Pet.owner',
            many: true,
          }),
        },
      }),
      Pet: list({
        fields: {
          name: text({
            validation: { isRequired: true },
          }),
          owner: relationship({
            ref: 'User.pets',
          }),
        },
      }),
      Breed: list({
        fields: {
          name: text({
            validation: { isRequired: true },
          }),
        },
      }),
    },
    db: {
      provider: 'postgresql',
      url: DATABASE_URL,
      onConnect: async (context) => {},
      enableLogging: true,
      useMigrations: true,
      idField: { kind: 'uuid' },
    },
    session,
    ui: {
      isAccessAllowed: (ctx) => !!ctx.session?.data,
    },
  })
)
