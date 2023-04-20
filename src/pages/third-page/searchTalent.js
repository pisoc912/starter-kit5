import { Button, TextField } from '@mui/material'
import React from 'react'

const SearchTalent = ({ handleChange }) => {
  return (
    <div>
      <TextField
        fullWidth
        type="text"
        onChange={handleChange}
        placeholder="search..."
      />
      <Button>Search</Button>
    </div>
  )
}

export default SearchTalent
