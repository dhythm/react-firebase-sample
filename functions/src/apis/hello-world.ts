
import { https, Response } from 'firebase-functions';

export const helloWorld = async (req: https.Request, res: Response<any>) => {
    res.send('Hello, world')
}