import React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

export default function Dropdown({ label, value, setValue }) {
  const handleChange = (event) => {
    const selection = event.target.value
    setValue((value) => ({ selection, data: value.data }))
  }

  return (
    <Box sx={{ width: '180px', pr: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="simple-dropdown-label"
          id="simple-dropdown"
          value={value.selection}
          label={label}
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
