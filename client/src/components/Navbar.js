import React, { useContext, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { NavLink, useHistory } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { AuthContext } from '../context/AuthContext'
import { Button, Menu, MenuItem, Typography } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  myMuiList: {
    display: 'inline-flex',
  },
  astyle: {
    textDecoration: 'none',
    color: theme.palette.common.white,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));


function Navbar() {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up(theme.breakpoints.values.sm-5));
  const classes = useStyles();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const logoutHandler = (event) => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    console.log(matches)
    setMobileMoreAnchorEl(null);
  }, [matches])


  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}

    >
      <MenuItem onClick={() => { history.push('/create') }}>
        <p>Создать</p>
      </MenuItem>
      <MenuItem onClick={() => { history.push('/links') }}>
        <p>Список ссылок</p>
      </MenuItem>
      <MenuItem onClick={logoutHandler}>
        <p>Выйти</p>
      </MenuItem>
    </Menu>
  )



  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Сокращение ссылок
          </Typography>
          {auth && (
            <>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <Button color="inherit"><NavLink className={classes.astyle} to="/create">Создать</NavLink></Button>
                <Button color="inherit"><NavLink className={classes.astyle} to="/links">Ссылки</NavLink></Button>
                <Button color="inherit" component="a" href="/" onClick={logoutHandler}>Выйти</Button>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  )
}

export default Navbar
