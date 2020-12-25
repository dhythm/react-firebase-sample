import * as functions from 'firebase-functions';
import { helloWorld as helloWorldApi } from './apis/hello-world';

const { onRequest } = functions.region('asia-northeast1').https;
const helloWorld = onRequest(helloWorldApi)

export { helloWorld }