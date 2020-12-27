import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@core/components';
import Decimal from 'decimal.js';
import React, { useEffect, useState } from 'react';

export const DebtPage: React.FunctionComponent = () => {
  const [debt, setDebt] = useState(19200000);
  const [rent, setRent] = useState(69300 / 0.9);
  const [fee, setFee] = useState(14858);
  const [repayment, setRepayment] = useState(0);
  const [interest, setInterest] = useState(1.9);
  const [period, setPeriod] = useState(35);
  const [investmentYield, setInvestmentYield] = useState(5);
  const [guaranteeFeeRate, setGuaranteeFeeRate] = useState(10);
  const [debts, setDebts] = useState<string[]>([]);

  useEffect(() => {
    const _f = async () => {
      try {
        const res = await fetch(
          `http://localhost:5001/react-firebase-sample-1225/asia-northeast1/calculateRepaymentPerMonth?debt=${Number(
            debt,
          )}&interest=${Number(interest)}&period=${Number(period)}`,
        );
        setRepayment((await res.json())?.amount);
        console.log((await res.json())?.amount);
      } catch (e) {
        console.error(e);
      }
    };
    _f();
  }, [debt, interest, period]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:5001/react-firebase-sample-1225/asia-northeast1/calculateResidualDebt?debt=${Number(
          debt,
        )}&repayment=${new Decimal(repayment)
          .mul(12)
          .toFixed(0)}&interest=${Number(interest)}&period=${Number(period)}`,
      );
      setDebts((await res.json())?.debts);
    } catch (e) {
      console.error(e);
    }
  };

  const income = Decimal.mul(
    rent,
    Decimal.sub(1, Decimal.div(guaranteeFeeRate, 100)),
  );
  return (
    <Box padding={2}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={2} direction="column">
          <Grid item container spacing={2}>
            <Grid item>
              <TextField
                id="debt"
                label="Debt"
                variant="outlined"
                value={debt}
                onChange={(event) => {
                  !isNaN(Number(event.target.value)) &&
                    setDebt(Number(event.target.value));
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                id="interest"
                label="Interest"
                variant="outlined"
                value={interest}
                onChange={(event) => {
                  !isNaN(Number(event.target.value)) &&
                    setInterest(Number(event.target.value));
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                id="period"
                label="Repayment Period"
                variant="outlined"
                value={period}
                onChange={(event) => {
                  !isNaN(Number(event.target.value)) &&
                    setPeriod(Number(event.target.value));
                }}
              />
            </Grid>
          </Grid>

          <Grid item container spacing={2} alignItems="center">
            <Grid item>
              <TextField
                id="rent"
                label="Rent"
                variant="outlined"
                value={rent}
                onChange={(event) => {
                  !isNaN(Number(event.target.value)) &&
                    setRent(Number(event.target.value));
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                id="fee"
                label="Fee"
                variant="outlined"
                value={fee}
                onChange={(event) => {
                  !isNaN(Number(event.target.value)) &&
                    setFee(Number(event.target.value));
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                id="repayment"
                label="Repayment"
                variant="outlined"
                value={repayment}
                onChange={(event) => {
                  !isNaN(Number(event.target.value)) &&
                    setRepayment(Number(event.target.value));
                }}
              />
            </Grid>
          </Grid>

          <Grid item container spacing={2} alignItems="center">
            <Grid item>
              <TextField
                disabled
                id="income"
                label="Income"
                variant="outlined"
                value={income}
              />
            </Grid>
            <Grid item>
              <TextField
                disabled
                id="balanceOfPayments"
                label="Balance Of Payment"
                variant="outlined"
                value={income.minus(repayment).minus(fee).toFixed()}
              />
            </Grid>
          </Grid>

          <Grid item container spacing={2}>
            <Grid item>
              <TextField
                id="guaranteeFeeRate"
                label="Rate of Guarantee fee"
                variant="outlined"
                value={guaranteeFeeRate}
                onChange={(event) => {
                  !isNaN(Number(event.target.value)) &&
                    setGuaranteeFeeRate(Number(event.target.value));
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                id="targetYield"
                label="Target Yield"
                variant="outlined"
                value={investmentYield}
                onChange={(event) => {
                  console.log(Number(event.target.value));
                  !isNaN(Number(event.target.value)) &&
                    setInvestmentYield(Number(event.target.value));
                }}
              />
            </Grid>
          </Grid>
          <Grid item>
            <Button type="submit" variant="outlined" color="primary">
              Submit
            </Button>
          </Grid>
          <Grid item>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Years later</TableCell>
                    <TableCell align="right">Residual Debt</TableCell>
                    <TableCell align="right">Yield</TableCell>
                    <TableCell align="right">
                      Target rent ({investmentYield}%)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {debts.map((v, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {i}
                      </TableCell>
                      <TableCell align="right">{v}</TableCell>
                      <TableCell align="right">
                        {income.mul(12).div(v).mul(100).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        {Decimal.mul(investmentYield, v)
                          .div(12 * 100)
                          .div(Decimal.sub(100, guaranteeFeeRate))
                          .mul(100)
                          .toFixed(0)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
