import React from 'react';
import { Container, Grid } from '@material-ui/core';

const Loader = () => (
  <>
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50 }}
        alignItems="center"
        justify="center"
      >
        <Grid
          container
          alignItems="center"
          justify="center"
        >
          <div className="lds-ellipsis">
            <div />
            <div />
            <div />
            <div />
          </div>
        </Grid>
      </Grid>
    </Container>
  </>
);

export default Loader;
