import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import { useHttp } from '../hooks/http.hook'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'

export const CreatePage = () => {
  const history=useHistory()
  const auth = useContext(AuthContext)
  const { request } = useHttp()
  const [link, setLink] = useState('')

  const pressHandler = async event => {
      if (event.key === 'Enter') {
        try {
          const data = await request('/api/link/generate', 'POST', { from: link }, { Authorization: `Bearer ${auth.token}`})
          history.push(`/detail/${data.link._id}`)

        } catch (e) { }
      }
  }

  return (
    <Box m={4} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Box width="75%" display="flex" flexDirection="column">

        <TextField
          required
          label="Вставьте ссылку"
          type="text"
          id="link"
          name="link"
          value={link}
          onChange={e => setLink(e.target.value)}
          onKeyPress={pressHandler}
        />
      </Box>
    </Box>
  )
}
