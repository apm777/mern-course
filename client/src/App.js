import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import Navbar from './components/Navbar'
import { CssBaseline, Box } from '@material-ui/core'
import Loader from './components/Loader'



function App() {
  const { token, userId, login, logout, ready } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{ token, userId, login, logout, isAuthenticated }}>
      <BrowserRouter>
        <CssBaseline />
        {isAuthenticated && <Navbar />}
        <Box m={4} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Box width="75%" display="flex" flexDirection="column">
            {routes}
          </Box>
        </Box>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
