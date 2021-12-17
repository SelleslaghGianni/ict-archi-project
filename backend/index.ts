import express from 'express';
import { getImage, login, register, uploadImage } from './routes';

const knex = require("./db")
knex.init()


const app = express()
app.use(express.json())


app.post('/api/files', uploadImage)

app.get('/api/files/:uuid', getImage)

app.post('/user/register', register)

app.post('/user/login', login)

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

