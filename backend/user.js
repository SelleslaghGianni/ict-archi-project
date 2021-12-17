const bcrypt = require('bcrypt')
const saltRounds = 10
const knex = require('./db')
class User {
  constructor(email, password, id) {
    this.email = email
    if (id !== undefined) {
      this.id = id
      this.password = password
    } else {
      this.hashPassword(password)
    }
  }

  hashPassword(password) {
    this.passwordPromise = new Promise(async (resolve, reject) => {
      if (!password) {
        return reject(new Error('Password is required'))
      }
      this.password = await bcrypt.hash(password, saltRounds)
      resolve()
    })
  }

  async save() {
    await this.passwordPromise
    return knex
      .get()('user')
      .insert({ email: this.email, password: this.password })
  }

  async validPassword(password) {
    return bcrypt.compare(password, this.password)
  }

  static async checkPassword(email, password) {
    const user = await knex.get()('user').where('email', email).first()
    if (!user) {
      return false
    }
    return bcrypt.compare(password, user.password)
  }

  static async deleteUser(userId) {
    return knex.get()('user').where({ id: userId }).del()
  }

  static async find(email) {
    const dbUser = await knex.get()('user').where({ email: email }).first()
    if (!dbUser) {
      return null
    }
    return new User(dbUser.email, dbUser.password, dbUser.id)
  }

  static async getEmail(userId) {
    const dbUser = await knex.get()('user').where({ id: userId }).first()
    if (!dbUser) {
      return null
    }
    return dbUser.email
  }
}

module.exports = User
