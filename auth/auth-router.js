const bcryptjs = require('bcryptjs')
const router = require('express').Router();
const jwt = require('jsonwebtoken')

const Users = require('../users/users-model')

router.post('/register', (req, res) => {
  let user = req.body
  const hash = bcryptjs.hashSync(user.password, 10)
  user.password = hash
  Users.add(user)
    .then(saved => {
      const token = createToken(saved)
      res.status(201).json({ data: user, token: token })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: 'Error creating user' })
    })
});

router.post('/login', (req, res) => {
  let { username, password } = req.body
  Users.login({ username })
    .first()
    .then(user => {
      if (user && bcryptjs.compareSync(password, user.password)) {
        const token = createToken(user)
        res.status(200).json({ message: 'Welcome', jwt_token: token })
      } else {
        res.status(401).json({ message: 'Invalid Credentials' })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: 'Error logging in' })
    })
});

function createToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  }
  const secret = process.env.JWR_SECRET || 'qweoiufguiyawegfdawuoiybdubaiufweoiuhrdawa'
  const options = {
    expiresIn: '1hr'
  }
  return jwt.sign(payload, secret, options)
}

module.exports = router;
