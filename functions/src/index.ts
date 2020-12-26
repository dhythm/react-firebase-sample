import * as functions from 'firebase-functions';
import { calculateCompoundInterestApi } from './apis/calculateCompoundInterest';
import { helloWorldApi } from './apis/helloWorld';

const { onRequest } = functions.region('asia-northeast1').https;
const helloWorld = onRequest(helloWorldApi);
const calculateCompoundInterest = onRequest(calculateCompoundInterestApi);

export { helloWorld, calculateCompoundInterest };
