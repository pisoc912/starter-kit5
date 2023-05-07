import { Button, TextField } from '@mui/material'
import React from 'react'

const SearchTalent = ({ handleChange, search }) => {
  return (
    <div>
      <TextField
        fullWidth
        type="text"
        onChange={handleChange}
        placeholder="search..."
      />
      <Button onClick={search}>Search</Button>
    </div>
  )
}

export default SearchTalent
