// ** MUI Imports
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { Auth } from 'aws-amplify'
import { useEffect } from 'react'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import DropDownUser from './DropDownUser'

const AppBarContent = props => {
  // ** Props
  const { settings, saveSettings } = props


  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <ModeToggler settings={settings} saveSettings={saveSettings} />
      <DropDownUser settings={settings} user={user} />
    </Box>
  )
}

export default AppBarContent
