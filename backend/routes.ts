import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrlForGetObject } from "./s3";


const bucketName = 'sof3-groep5-ict-archi'


// Get request for a signed url to get an object from s3
export async function getImage (req: Request, res: Response) {
    const uuid = req.params.uuid
    const reply = await getSignedUrlForGetObject(bucketName, uuid)
    res.json(reply)
}

// Post request to upload image
export async function uploadImage (req: Request, res: Response) {
    const {bucketName} = req.body
    const uuid = uuidv4()
    res.json({
        getUrl: await getSignedUrlForGetObject(bucketName, uuid), "uuid": uuid
    })
}
    
