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
        host: 'xxxxx',
        port: 111111111,
        user: '',
        password: '',
        database: '',
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
