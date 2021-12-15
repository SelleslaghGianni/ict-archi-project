import express from 'express'
import { buckets, createABucket, helloWorld } from './routes'


const app = express()
app.use(express.json())

app.get('/hello', helloWorld)

app.get('/buckets', buckets)

app.post('/createBucket', createABucket)

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

