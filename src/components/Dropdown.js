import React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

export default function Dropdown({ label, setData, data, filterData, type }) {
  const handleChange = (event) => {
    const selection = event.target.value
    setData((data) => ({ selection, items: data.items }))
    filterData(selection, type)
  }

  return (
    <Box sx={{ width: '180px', pr: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="simple-dropdown-label"
          id="simple-dropdown"
          value={data.selection}
          label={label}
          onChange={handleChange}
        >
          {data &&
            data.items.map((item) => (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  )
}
