import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrlForGetObject } from "./s3";
import auth = require("./auth")
import User = require("./user")
const knex = require('./db')


const bucketName = 'sof3-groep5-ict-archi'


// Get request for a signed url to get an object from s3
// Params: uuid of the image
export async function getImage (req: Request, res: Response) {
    const uuid = req.params.uuid
    const reply = await getSignedUrlForGetObject(bucketName, uuid)
    res.json(reply)
}

// Post request to upload image
// Body: filename of the image
// Saves to database
// Returns: presigned url to upload image and uuid of the image
export async function uploadImage (req: Request, res: Response) {
    const {filename} = req.body
    const uuid = uuidv4()
    knex.get()('data').insert({ filename: filename, uuid: uuid })
    res.json({
        getUrl: await getSignedUrlForGetObject(bucketName, uuid), "uuid": uuid
    })
}

// Post request to register user
// Body: username and password
// Returns: success and token
export async function register(req, res) {
    const email = req.body.email
    const password = req.body.password
    if(!email || !password) {
        return res.status(400).json({
            message: 'Missing parameters'
        })
    }
    const newUser = new User(email, password)
    await newUser.save()
    const user = await User.find(email)
    const token = await auth.genToken(user)
    res.json({ success: "User created!", token })
}

// Post request to login user
// Body: username and password
// Returns: success and token
export async function login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.find(email)
    if (!user) {
        return res.status(401).json({ error: "Invalid login." })
    }
    const isValid = await user.validPassword(password)
    if (!isValid) {
        return res.status(401).json({ error: "Invalid password." })
    }
    const token = await auth.genToken(user)
    res.json({ message: "Successful login!", token })
}
