import React, { useEffect } from 'react'
import { getData } from '../request/api'
import { Container, Grid, Box } from '@mui/material'

const styles = {
  boxStyle: {
    border: '1px solid black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
    width: '200px',
  },
}

export default function App() {
  useEffect(() => {
    ;(async () => console.log(await getData()))()
  }, [])

  return (
    <Container maxWidth="md" sx={{ pt: 5 }}>
      <Box sx={{ width: '800px', height: '400px' }}>
        <Grid container spacing={0}>
          <Grid item xs={3}>
            <Box sx={styles.boxStyle}>Grade 1</Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={styles.boxStyle}>Grade 2</Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={styles.boxStyle}>Grade 3</Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={styles.boxStyle}>Grade 4</Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={styles.boxStyle}>$100.000</Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={styles.boxStyle}>$100.000</Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={styles.boxStyle}>$300000000</Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={styles.boxStyle}>$123499999912419999</Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
