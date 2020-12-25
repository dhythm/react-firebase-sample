
import { https, Response } from 'firebase-functions';

export const helloWorldApi = async (req: https.Request, res: Response<any>) => {
    res.send('Hello, world')
}