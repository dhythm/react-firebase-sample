import { Decimal } from 'decimal.js';
import { https, Response } from 'firebase-functions';

Decimal.set({ rounding: 2 })

export const calculateCompoundInterestApi = async (
  req: https.Request,
  res: Response<any>,
) => {
  const { query } = req;
  const { principal, interest, investmentPeriod } = query as any;

  try {
    if (isNaN(principal) || isNaN(interest) || isNaN(investmentPeriod)) {
      throw new Error('[Bad request] Invalid parameters');
    }
    const yearlyAssets = [...Array(Number(investmentPeriod)).keys()].reduce((acc: Decimal[], curr) => {
      if (curr === 0) return [new Decimal(principal), new Decimal(principal).times(Decimal.add(1, Decimal.div(interest, 100)))]
      return [...acc, new Decimal(acc[curr]).times(Decimal.add(1, Decimal.div(interest, 100)))]
    }, [])
    // const assets = new Decimal(principal).times(
    //   Decimal.pow(Decimal.add(1, Decimal.div(interest, 100)), investmentPeriod),
    // );
    res.send({ yearlyAssets });
  } catch (e) {
    res.status(400).send('Error');
  }
};
