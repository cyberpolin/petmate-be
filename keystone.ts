import * as dotenv from 'dotenv'
import { list, config } from "@keystone-6/core"
import { text } from '@keystone-6/core/fields'

const {
    parsed:{

        PGUSER,
        PGPASSWORD,
        PGHOST,
        PGPORT,
        PGDATABASE,
    }
} = dotenv.config()

const DATABASE_URL=`postgresql://${ PGUSER }:${ PGPASSWORD }@${ PGHOST }:${ PGPORT }/${ PGDATABASE }`

export default config({
    lists:{
        User: list({
            fields: {
                phone: text({
                    validation: { isRequired: true}
                }),
                email: text({
                    validation: {isRequired: true}, isIndexed: 'unique'
                })
            }
        }),
        Breed: list({
            fields:{
                name: text({
                    validation: {isRequired: true}
                })
            }
        })
    },
    db:{
        provider: 'postgresql',
        url: DATABASE_URL,
        onConnect: async context => {},
        enableLogging: true,
        useMigrations: true,
        idField: { kind: 'uuid' },
    }

})
