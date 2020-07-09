import React from 'react'
import './Loader.css'
import { Box } from '@material-ui/core'

function Loader() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Box>
  )
}

export default Loader
