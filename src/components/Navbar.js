import React, {useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import logo from '../assets/dj.png'
import Link from '@material-ui/core/Link';
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from 'axios'





const useStyles = makeStyles((theme) => ({
   font:{
    fontSize:10,
    marginLeft:2,
    marginLeft: theme.spacing(-1),
   },
   small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  root: {
    flexGrow: 1,
    
    overflow:'hidden'
  },
  nav:{
    backgroundColor:'#3196E2',
  },
  menuButton: {
    marginRight: theme.spacing(),
  },
  title: {
    flexGrow: 1,
  },
  
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
   
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    }
}

  
}));


export default function NavBar({isLogged}) {
  const [navRender, setRender] = React.useState(false);
  const {setLogged, currentUser } = useContext(AuthContext);
  let history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  const handleClose = (path) => {
      setAnchorEl(null);
      if (path==='/logout'){
        postLogout()
      }
      history.push(path)
    };
  const open = Boolean(anchorEl);
 
  const matches = useMediaQuery('(min-width:750px)');

  const postLogout = async () =>{
    handleClose()
    await axios.post("https://rd-restful-blog.herokuapp.com/auth/logout/")
    setLogged(false)
    localStorage.setItem("Token", "")
    localStorage.setItem("currentUser", "")
    localStorage.setItem("isLoggedIn", false)
    setRender(true)
    history.push('/')
    
    
    };
   

  useEffect(() =>{
    localStorage.getItem("Token")
  }, [navRender])
  

  return (
    <div className={classes.root}>
   
      <AppBar className={classes.nav} position="static">
        <Toolbar>
          <Link href="/" >
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <Avatar alt="Remy Sharp" src={logo} className={classes.small} />
          </IconButton>
          </Link>
          <Typography variant="h6" className={classes.title}>
          Blog
          </Typography>
          <Typography>{currentUser ? `Hello ${currentUser}`:null}</Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
              {
                ! localStorage.getItem("Token") ?
                <>
                  <Link href="/login" color="inherit" style={{textDecoration:'none'}}>
                  <Button color="inherit" className={matches ? null :classes.font}> Login</Button>
                  </Link>
                  <Link href="/register" color="inherit" style={{textDecoration:'none'}}>
                  <Button color="inherit" className={matches ? null :classes.font}>Register</Button>
                  </Link>
                </>:
                null
              }

          {
            localStorage.getItem("Token") ?
            <>
                <Typography>{localStorage.getItem("currentUser")}</Typography>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                      <Link href="/create" color="inherit" style={{textDecoration:'none'}}>
                        <MenuItem onClick={handleClose}>New Post</MenuItem>
                      </Link>  
                      <Link href="/profile" color="inherit" style={{textDecoration:'none'}}>
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                      </Link>
                                  
                      <Button color="secondary" style={{marginLeft:7, fontWeight:'bold'}} onClick={() => postLogout()}>Logout</Button>
                        
                      
                  </Menu>
              </>
                  : null
                }
        </Toolbar>
      </AppBar>
    </div>
  );
}