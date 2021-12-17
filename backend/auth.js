const jwt = require('jsonwebtoken')

const SECRET = 'gobackpost'

function sign(payload) {
  return new Promise((resolve, reject) => {
    // TODO: Set shorter expiry time
    jwt.sign(payload, SECRET, function (err, token) {
      if (err) {
        return reject(err)
      }
      resolve(token)
    })
  })
}

function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET, function (err, payload) {
      if (err) {
        return reject(err)
      }
      resolve(payload)
    })
  })
}

module.exports = {
  authenticate: async function (req, res, next) {
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).json({ error: 'Authentication required.' })
    }
    try {
      await verify(token)
    } catch (err) {
      return res.status(403).json({ error: 'Invalid login.' })
    }
    req.user = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
    return next()
  },
  genToken: function (user) {
    const payload = {
      sub: user.id,
      email: user.email,
      admin: user.isAdmin,
    }
    return sign(payload)
  },
}
