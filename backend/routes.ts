import { Request, Response } from 'express'
import { createBucket, listBuckets } from "./s3"

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
