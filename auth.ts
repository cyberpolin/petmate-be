import { createAuth } from '@keystone-6/auth'
import { statelessSessions } from '@keystone-6/core/session'

export const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  sessionData: 'phone',
  secretField: 'password',
  initFirstItem: {
    fields: ['phone', 'email', 'password'],
  },
})

export const session = statelessSessions({
  max: 60 * 60 * 24 * 1, // one day
  secret: 'WHATEVER BUT AT LEAST 32 CHAR 1234567890',
})
