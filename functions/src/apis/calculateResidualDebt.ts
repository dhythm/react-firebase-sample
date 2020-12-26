import { Decimal } from 'decimal.js';
import { https, Response } from 'firebase-functions';

export const calculateResidualDebtApi = async (
  req: https.Request,
  res: Response<any>,
) => {
  const { query } = req;
  const { debt, repayment, interest, period } = query as any;

  try {
    if (isNaN(debt) || isNaN(repayment) || isNaN(interest) || isNaN(period)) {
      throw new Error('[Bad request] Invalid parameters');
    }
    const residualDebts = [...Array(Number(period)).keys()].reduce((acc: Decimal[], curr) => {
      if (curr === 0) return [new Decimal(debt), (new Decimal(debt).minus(repayment)).times(Decimal.add(1, Decimal.div(interest, 100)))]
      const residualDebt = (new Decimal(acc[curr]).minus(repayment)).times(Decimal.add(1, Decimal.div(interest, 100)))
      return [...acc, residualDebt.cmp(0) > 0 ? residualDebt : new Decimal(0)]
    }, [])
    res.set('Access-Control-Allow-Origin', '*').send({ debts: residualDebts.map(v => v.toFixed(0)) });
  } catch (e) {
    res.status(400).send('Error');
  }
};
