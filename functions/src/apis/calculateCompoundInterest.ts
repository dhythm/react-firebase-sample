import { Decimal } from 'decimal.js';
import { https, Response } from 'firebase-functions';

export const calculateCompoundInterestApi = async (
  req: https.Request,
  res: Response<any>,
) => {
  const { query } = req;
  const { principal, interest, period } = query as any;

  try {
    if (isNaN(principal) || isNaN(interest) || isNaN(period)) {
      throw new Error('[Bad request] Invalid parameters');
    }
    const yearlyAssets = [...Array(Number(period)).keys()].reduce(
      (acc: Decimal[], curr) => {
        if (curr === 0)
          return [
            new Decimal(principal),
            new Decimal(principal).times(
              Decimal.add(1, Decimal.div(interest, 100)),
            ),
          ];
        return [
          ...acc,
          new Decimal(acc[curr]).times(
            Decimal.add(1, Decimal.div(interest, 100)),
          ),
        ];
      },
      [],
    );
    // const assets = new Decimal(principal).times(
    //   Decimal.pow(Decimal.add(1, Decimal.div(interest, 100)), period),
    // );
    res
      .set('Access-Control-Allow-Origin', '*')
      .send({ assets: yearlyAssets.map((v) => v.toFixed(0)) });
  } catch (e) {
    res.status(400).send(e);
  }
};
