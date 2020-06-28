import React, { useState, useEffect, useContext, Fragment } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'
import { Button, TextField, Grid, Box } from '@material-ui/core'
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
      <Grid container direction="row" justify="center">
        <Grid item xs={10} sm={8} md={6} lg={4}>


          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" style={{ minHeight: "100vh" }} >

            <Box pb={3} color="primary.main" textAlign="center" fontWeight="fontWeightBold" fontSize={50}>Сократи ссылку</Box>
            
            <Box p={1} boxShadow={10} width={1}>
            
              <form className={classes.root} noValidate autoComplete="off">
                <Box color="text.primary" m={1} textAlign="center" fontWeight="fontWeightBold" fontSize={26} style={{ textTransform: "uppercase"}}>
                  Авторизация
                </Box>

                <Box display="flex" flexDirection="column" m={1} mt={5} mb={5}>
                  <TextField
                    label="Введите email"
                    type="text"
                    variant="outlined"
                    id="email"
                    name="email"
                    onChange={changeHandler}
                  />
                  <TextField
                    label="Введите пароль"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    id="password"
                    name="password"
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
        </Grid>
      </Grid>

      <Alert />

    </Fragment>
  )
}


