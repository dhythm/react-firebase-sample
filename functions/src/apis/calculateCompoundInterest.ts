import { Decimal } from 'decimal.js';
import { https, Response } from 'firebase-functions';

export const calculateCompoundInterestApi = async (
  req: https.Request,
  res: Response<any>,
) => {
  const { query } = req;
  const { principal, interest, investmentPeriod } = query;

  try {
    if (isNaN(principal) || isNaN(interest) || isNaN(investmentPeriod)) {
      throw new Error('');
    }
    const assets = new Decimal(principal).times(
      Decimal.pow(Decimal.add(1, interest), investmentPeriod),
    );
    res.send({ assets });
  } catch (e) {
    res.status(400).send('Error');
  }
};
