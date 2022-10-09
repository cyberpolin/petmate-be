const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } = process.env

const DATABASE_URL = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`

export default {
  provider: 'postgresql',
  url: DATABASE_URL,
  onConnect: async (context) => {},
  enableLogging: true,
  useMigrations: true,
  idField: { kind: 'uuid' },
}
