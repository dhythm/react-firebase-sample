import * as functions from 'firebase-functions';
import { calculateCompoundInterestApi } from './apis/calculateCompoundInterest';
import { calculateResidualDebtApi } from './apis/calculateResidualDebt';
import { helloWorldApi } from './apis/helloWorld';

const { onRequest } = functions.region('asia-northeast1').https;
const helloWorld = onRequest(helloWorldApi);
const calculateCompoundInterest = onRequest(calculateCompoundInterestApi);
const calculateResidualDebt = onRequest(calculateResidualDebtApi);


export { helloWorld, calculateCompoundInterest, calculateResidualDebt };
