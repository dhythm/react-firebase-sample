import Decimal from 'decimal.js';
import { https, Response } from 'firebase-functions';

export const calculateRepaymentPerMonthApi = async (
  req: https.Request,
  res: Response<any>,
) => {
  const { query } = req;
  const { debt, interest, period } = query as any;

  try {
    if (isNaN(debt) || isNaN(interest) || isNaN(period)) {
      throw new Error('[Bad request] Invalid parameters');
    }
    const repaymentCount = new Decimal(period).mul(12);
    const monthlyInterest = new Decimal(interest).div(12).div(100);
    const repaymentAmountPerMonth = new Decimal(debt)
      .mul(monthlyInterest)
      .mul(monthlyInterest.add(1).pow(repaymentCount))
      .div(monthlyInterest.add(1).pow(repaymentCount).sub(1));
    res
      .set('Access-Control-Allow-Origin', '*')
      .send({ amount: repaymentAmountPerMonth.toFixed(0) });
  } catch (e) {
    res.status(400).send(e);
  }
};
