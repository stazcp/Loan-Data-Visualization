import React, { useEffect, useState } from 'react'
import { getData } from '../request/api'
import { Container, Grid, Box, Button } from '@mui/material'
import Dropdown from './Dropdown'
import Charts from './Charts'

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
  const [filters, setFilters] = useState([])

  useEffect(() => {
    init()
  }, [])

  // applies filters after being set
  useEffect(() => {
    if (filters.length) applyFilters()
  }, [filters])

  const init = async () => {
    if (!DATA) {
      let data = await getData()
      if (data) {
        data = Object.values(data)
        setDATA(data)
        sortData(data)
      }
    }
  }

  // initial data sorting and aggregation
  const sortData = (data) => {
    const homes = [],
      terms = [],
      quarters = [],
      years = [],
      grades = {}

    data.forEach((datum) => {
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

  // re-aggregate data according to filters
  const reAggregateData = (data) => {
    const grades = {}
    data.forEach((datum) => {
      const { currentBalance, grade } = datum
      if (grade) {
        if (!Object.keys(grades).includes(grade)) {
          grades[grade] = parseInt(currentBalance)
        } else {
          grades[grade] += parseInt(currentBalance)
        }
      }
    })
    setGRADES(grades)
  }

  const filterData = (selection, type) => {
    setFilters((filters) => [...filters, type])
  }

  // performing SQL with JS
  const applyFilters = () => {
    let newData = DATA
    filters.forEach((f) => {
      switch (f) {
        case 'homeOwnership':
          newData = newData.filter((datum) => {
            if (datum[f] === HOME.selection) return datum
          })
          break
        case 'quarter':
          newData = newData.filter((datum) => {
            if (datum[f] === QUARTER.selection) return datum
          })
          break
        case 'term':
          newData = newData.filter((datum) => {
            if (datum[f] === TERM.selection) return datum
          })
          break
        default:
          newData = newData.filter((datum) => {
            if (datum[f] === YEAR.selection) return datum
          })
      }
    })
    reAggregateData(newData)
  }

  const reset = () => {
    setHOME((home) => ({ selection: '', items: home.items }))
    setQUARTER((quarter) => ({ selection: '', items: quarter.items }))
    setTERM((term) => ({ selection: '', items: term.items }))
    setYEAR((year) => ({ selection: '', items: year.items }))
    reAggregateData(DATA)
    setFilters([])
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        pt: '20vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pb: 4,
      }}
    >
      {GRADES && <Charts data={GRADES} />}
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
                <Grid item xs={2} key={GRADE}>
                  <Box sx={styles.boxStyle}>${GRADE.toFixed(2)}</Box>
                </Grid>
              ))}
          </Grid>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Dropdown
              label="Home Ownership"
              data={HOME}
              setData={setHOME}
              filterData={filterData}
              type="homeOwnership"
            />
            <Dropdown
              label="Quarter"
              data={QUARTER}
              setData={setQUARTER}
              filterData={filterData}
              type="quarter"
            />
            <Dropdown
              label="Term"
              data={TERM}
              setData={setTERM}
              filterData={filterData}
              type="term"
            />
            <Dropdown
              label="Year"
              data={YEAR}
              setData={setYEAR}
              filterData={filterData}
              type="year"
            />
          </Box>
          <Button variant="outlined" sx={{ width: '150px' }} onClick={reset}>
            Reset
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
