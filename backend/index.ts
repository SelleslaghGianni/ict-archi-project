import express from 'express'
import { buckets, createABucket, getGetUrl, getPutUrl, helloWorld } from './routes'


const app = express()
app.use(express.json())

app.get('/hello', helloWorld)

app.get('/buckets', buckets)

app.post('/createBucket', createABucket)

app.get('/getGetUrl', getGetUrl)

app.put('/getPutUrl', getPutUrl)

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

