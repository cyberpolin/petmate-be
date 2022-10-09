import { config } from '@keystone-6/core'

import db from './db'
import { withAuth, session } from './auth'
import lists from './lists'

export default config(
  withAuth({
    lists,
    db,
    session,
    ui: {
      isAccessAllowed: (ctx) => !!ctx.session?.data,
    },
  })
)
