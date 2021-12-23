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
    width: '200px',
  },
}

export default function App() {
  const [HOME, setHOME] = useState({ selection: '', items: [] }) //home ownership type
  const [QUARTER, setQUARTER] = useState({ selection: '', items: [] })
  const [TERM, setTERM] = useState({ selection: '', items: [] })
  const [YEAR, setYEAR] = useState({ selection: '', items: [] })
  const [GRADES, setGRADES] = useState()
  const [DATA, setDATA] = useState()

  useEffect(() => {
    ;(async () => {
      if (!DATA) {
        const data = await getData()
        setDATA(Object.values(data))
      }
    })()
  }, [])

  useEffect(() => {
    if (DATA) {
      console.log(DATA)
      sortData()
    }
  }, [DATA])

  const sortData = () => {
    const homes = [],
      terms = [],
      quarters = [],
      years = [],
      grades = {}

    DATA.forEach((datum) => {
      const { homeOwnership, term, quarter, year, grade, currentBalance } = datum
      if (homeOwnership && !homes.includes(homeOwnership)) homes.push(homeOwnership)
      if (term && !terms.includes(term)) terms.push(term)
      if (quarter && !quarters.includes(quarter)) quarters.push(quarter)
      if (year && !years.includes(year)) years.push(year)
      if (grade) {
        if (!Object.keys(grades).includes(grade)) {
          grades[grade] = parseInt(currentBalance)
        } else {
          grades[grade] += parseInt(currentBalance)
        }
      }
    })
    setHOME((home) => ({ selection: home.selection, items: homes }))
    setQUARTER((quarter) => ({ selection: quarter.selection, items: quarters }))
    setTERM((term) => ({ selection: term.selection, items: terms }))
    setYEAR((year) => ({ selection: year.selection, items: years }))
    setGRADES(grades)
  }

  const aggregateGrades = () => {}

  const handleReset = () => {
    setHOME((home) => ({ selection: '', items: home.items }))
    setQUARTER((quarter) => ({ selection: '', items: quarter.items }))
    setTERM((term) => ({ selection: '', items: term.items }))
    setYEAR((year) => ({ selection: '', items: year.items }))
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        pt: '20vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '1200px' }}>
        <Box sx={{ height: '400px' }}>
          <Grid container spacing={0}>
            <Grid item xs={2}>
              <Box sx={styles.boxStyle}>Grade 1</Box>
            </Grid>
            <Grid item xs={2}>
              <Box sx={styles.boxStyle}>Grade 2</Box>
            </Grid>
            <Grid item xs={2}>
              <Box sx={styles.boxStyle}>Grade 2</Box>
            </Grid>
            <Grid item xs={2}>
              <Box sx={styles.boxStyle}>Grade 4</Box>
            </Grid>
            <Grid item xs={2}>
              <Box sx={styles.boxStyle}>Grade 5</Box>
            </Grid>
            <Grid item xs={2}>
              <Box sx={styles.boxStyle}>Grade 6</Box>
            </Grid>
            {GRADES &&
              Object.values(GRADES).map((GRADE) => (
                <Grid item xs={2}>
                  <Box sx={styles.boxStyle}>${GRADE.toFixed(2)}</Box>
                </Grid>
              ))}
            {/* <Grid item xs={2}>
              <Box sx={styles.boxStyle}>$100.000</Box>
            </Grid>
            <Grid item xs={2}>
              <Box sx={styles.boxStyle}>$100.000</Box>
            </Grid>
            <Grid item xs={2}>
              <Box sx={styles.boxStyle}>$200000000</Box>
            </Grid>
            <Grid item xs={2}>
              <Box sx={styles.boxStyle}>$122499999912419999</Box>
            </Grid>
            <Grid item xs={2}>
              <Box sx={styles.boxStyle}>$200000000</Box>
            </Grid>
            <Grid item xs={2}>
              <Box sx={styles.boxStyle}>$123499999912419999</Box>
            </Grid> */}
          </Grid>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Dropdown label="Home Ownership" data={HOME} setData={setHOME} />
            <Dropdown label="Quarter" data={QUARTER} setData={setQUARTER} />
            <Dropdown label="Term" data={TERM} setData={setTERM} />
            <Dropdown label="Year" data={YEAR} setData={setYEAR} />
          </Box>
          <Button variant="outlined" sx={{ width: '150px' }} onClick={handleReset}>
            Reset
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
