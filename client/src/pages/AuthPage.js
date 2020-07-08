import React, { useState, useEffect, useContext, Fragment } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'
import { Button, TextField, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& .MuiTextField-root': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: '100%',
    },

    '& .MuiButton-root': {
      marginRight: theme.spacing(1)
    },
  },
}));

export const AuthPage = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext)
  const { Alert, showMessage } = useMessage()
  const { loading, request, error, clearError } = useHttp()

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    showMessage(error, true)
    clearError()
  }, [error, clearError, showMessage])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      showMessage(data.message)
    } catch (e) {
    }
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId)
    } catch (e) {
    }
  }

  return (
    <Fragment>
      <Box bgcolor="#f6f7fb" display="flex" flexDirection="column" alignItems="center" justifyContent="center" style={{ minHeight: "100vh" }} >
        
        <Box bgcolor="#ffffff" p={1} boxShadow={10} width={350}>
          <Box pb={3} color="primary.main" fontWeight="fontWeightBold" fontSize={20}>Сократи ссылку</Box>
          <form className={classes.root} noValidate autoComplete="off">
            <Box color="text.primary" m={1} textAlign="center" fontWeight="fontWeightBold" fontSize={26} style={{ textTransform: "uppercase" }}>
              Вход
            </Box>

            <Box display="flex" flexDirection="column" m={1} mt={3} mb={3}>
              <TextField
                label="Введите email"
                type="text"
                variant="outlined"
                id="email"
                name="email"
                value={form.email}
                onChange={changeHandler}
              />
              <TextField
                label="Введите пароль"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                id="password"
                name="password"
                value={form.password}
                onChange={changeHandler}
              />
            </Box>

            <Box m={1} mt={3}>
              <Button
                color="primary"
                variant="contained"
                disabled={loading}
                onClick={loginHandler}
              >Войти</Button>
              <Button
                color="primary"
                variant="contained"
                onClick={registerHandler}
                disabled={loading}
              >Регистрация</Button>
            </Box>
          </form>
        </Box>
      </Box>

      <Alert />

    </Fragment>
  )
}


