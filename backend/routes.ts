import { Request, Response } from 'express'
import { createBucket, getSignedUrlForGetObject, getSignedUrlForPutObject, listBuckets } from "./s3"

export function helloWorld(req, res) {
    console.log('hello world')
    console.log(req.params)
    res.json(req.params)
}

export async function buckets (req, res) {
    res.json(await listBuckets())
}

export async function createABucket (req: Request, res: Response) {
    console.log(req.body)
    const {bucketName} = req.body
    console.log("creating bucket")
    await createBucket(bucketName)
    res.json(await listBuckets())
}

export async function getPutUrl (req: Request, res: Response) {
    const {bucketName, key} = req.body
    res.json({
        putUrl: await getSignedUrlForPutObject(bucketName, key)
    })
}

export async function getGetUrl (req: Request, res: Response) {
    const {bucketName, key} = req.body
    res.json({
        getUrl: await getSignedUrlForGetObject(bucketName, key)
    })
}
    
