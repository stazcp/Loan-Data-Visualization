import React, { useEffect, useState } from 'react'
import { getData } from '../request/api'
import { Container, Grid, Box, Button } from '@mui/material'
import Dropdown from './Dropdown'

const styles = {
  boxStyle: {
    border: '1px solid black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
    width: '250px',
  },
}

export default function App() {
  const [home, setHome] = useState()
  const [quarter, setQuarter] = useState()
  const [term, setTerm] = useState()
  const [year, setYear] = useState()

  useEffect(() => {
    ;(async () => console.log(await getData()))()
  }, [])

  return (
    <Container
      maxWidth="md"
      sx={{
        pt: '20vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '1000px', height: '400px' }}>
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
      <Box sx={{ display: 'flex' }}>
        <Dropdown label="Home Ownership" value={home} setValue={setHome} />
        <Dropdown label="Quarter" value={quarter} setValue={setQuarter} />
        <Dropdown label="Term" value={term} setValue={setTerm} />
        <Dropdown label="Year" value={year} setValue={setYear} />
        <Button variant="outlined" sx={{ width: '150px', ml: 10 }}>
          Reset
        </Button>
      </Box>
    </Container>
  )
}
