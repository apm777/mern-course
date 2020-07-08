import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'

export const CreatePage = () => {
  const [link, setLink] = useState('')

  return (
    <Box m={4} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Box width="75%" display="flex" flexDirection="column">
      
      <TextField
        label="Вставьте ссылку"
        type="text"
        variant="outlined"
        id="link"
        name="link"
        value={link}
        onChange={e => setLink(e.target.value)}
        />
      </Box>
    </Box>
  )
}
