import { S3, SharedIniFileCredentials } from 'aws-sdk'



const credentials = new SharedIniFileCredentials({profile: 'default'})

const s3Client = new S3({region: 'us-east-1', credentials})



export async function listBuckets() : Promise<string[]> {
    const buckets = await s3Client.listBuckets().promise()
    return buckets.Buckets.map(b => b.Name)    
    
}


export async function createBucket(bucketName) : Promise<void> {
    try {
        await s3Client.createBucket({Bucket: bucketName}).promise()
    } catch (error){
        console.log("error", error)
    }
}
