import { Box, Button, Grid, TextField, Typography } from '@core/components';
import React, { useState } from 'react';

export const InterestPage: React.FunctionComponent = () => {
  const [principal, setPrincipal] = useState<string>('1000000');
  const [interest, setInterest] = useState<string>('5');
  const [period, setPeriod] = useState<string>('10');
  const [assets, setAssets] = useState<string[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:5001/react-firebase-sample-1225/asia-northeast1/calculateCompoundInterest?principal=${Number(
          principal,
        )}&interest=${Number(interest)}&period=${Number(period)}`,
      );
      setAssets((await res.json())?.assets);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box padding={2}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <TextField
              id="principal"
              label="Principal"
              variant="outlined"
              value={principal}
              onChange={(
                event: React.ChangeEvent<
                  HTMLTextAreaElement | HTMLInputElement
                >,
              ) => {
                setPrincipal(event.target.value);
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              id="interest"
              label="Interest"
              variant="outlined"
              value={interest}
              onChange={(
                event: React.ChangeEvent<
                  HTMLTextAreaElement | HTMLInputElement
                >,
              ) => {
                setInterest(event.target.value);
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              id="period"
              label="Investment Period"
              variant="outlined"
              value={period}
              onChange={(
                event: React.ChangeEvent<
                  HTMLTextAreaElement | HTMLInputElement
                >,
              ) => {
                setPeriod(event.target.value);
              }}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="outlined" color="primary">
              Submit
            </Button>
          </Grid>
          <Grid item>
            {assets.map((v, i) => (
              <div key={i}>
                <Typography>
                  {i} years later: {v}
                </Typography>
              </div>
            ))}
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
