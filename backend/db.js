const knex = require('knex')

let db

module.exports = {
  get: () => {
    if (!db) {
      throw new Error('DB is not initialized.')
    }
    return db
  },
  init: async () => {
    db = knex({
      client: 'mysql',
      connection: {
        host: 'ict-archi-sof3-groep5.cv407npsmk57.us-east-1.rds.amazonaws.com',
        port: 3306,
        user: 'admin',
        password: 'sof3-groep5',
        database: 'sof3-groep5',
      },
      acquireConnectionTimeout: 60000,
    })

    await db.schema.hasTable('data').then(function (exists) {
      if (!exists) {
        return db.schema.createTable('category', function (table) {
          table.increments('id')
          table.string('filename')
          table.string('uuid')
        })
      }
    })
    await db.schema.hasTable('user').then(function (exists) {
      if (!exists) {
        return db.schema.createTable('user', function (table) {
          table.increments('id')
          table.string('email')
          table.string('password')
        })
      }
    })
    console.log(`DB initialized.`)
  },
}
