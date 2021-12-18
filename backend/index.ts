import express from 'express';
import { allFilesFromUser, getImage, login, register, uploadImage } from './routes';

const knex = require("./db")
knex.init()


const app = express()
app.use(express.json())

const cors = require('cors');
app.use(cors());

app.post('/api/files', uploadImage)

app.get('/api/files/:uuid', getImage)

app.get('/api/allfiles/:user', allFilesFromUser)

app.post('/api/user/register', register)

app.post('/api/user/login', login)

app.listen(3030, () => {
    console.log('Listening on port 3030')
})

