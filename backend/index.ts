import express from 'express';
import { getImage, uploadImage } from './routes';

const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'ict-archi-sof3-groep5.cv407npsmk57.us-east-1.rds.amazonaws.com',
      port : 3306,
      user : 'admin',
      password : 'sof3-groep5',
      database : 'sof3-groep5'
    }
  });



const app = express()
app.use(express.json())


app.post('/api/files', uploadImage)

app.get('/api/files/:uuid', getImage)

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

