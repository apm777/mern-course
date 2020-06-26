import React from 'react'
import { useCallback, useState } from 'react'
import { Snackbar, Slide } from '@material-ui/core'
import { Alert as MuiAlert } from '@material-ui/lab'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
})

export const useMessage = () => {
  const [text, setText] = useState('')
  const [type, setType] = useState('success')
  const [open, setOpen] = useState(false)

  const showMessage = useCallback((textMessage, isError = false) => {
    if (isError) {
      setType('error')
    } else {
      setType('success')
    }

    if (textMessage) {
      setText(textMessage)
      setOpen(true)
    }
  }, [])

  const handleCloseMessage = useCallback((event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }, [])
  
  const Alert = () => {
    return (
      <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseMessage} TransitionComponent={Transition}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseMessage} severity={type}>
          {text}
        </MuiAlert>
      </Snackbar>
    )
  }

  return { Alert, showMessage }

}