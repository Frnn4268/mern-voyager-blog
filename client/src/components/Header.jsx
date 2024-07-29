import { useContext, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CreateIcon from '@mui/icons-material/Create';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useSnackbar } from 'notistack';

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/profile`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((userInfo) => {
        setUserInfo(userInfo);
        enqueueSnackbar('Profile loaded successfully', { variant: 'success' });
      })
      .catch((error) => {
        console.error('Failed to fetch profile:', error);
        enqueueSnackbar('Failed to fetch profile', { variant: 'error' });
      });
  }, []); // Dependencias vacías para ejecutar solo una vez

  function logout() {
    fetch(`${process.env.REACT_APP_API_URL}/logout`, {
      credentials: "include",
      method: "POST",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        setUserInfo(null);
        enqueueSnackbar('Logged out successfully', { variant: 'success' });
      })
      .catch((error) => {
        console.error('Failed to logout:', error);
        enqueueSnackbar('Failed to logout', { variant: 'error' });
      });
  }

  const username = userInfo?.username;

  return (
    <AppBar position="static" style={{ width: '100%', marginTop: 0, borderRadius: 5 }} sx={{ backgroundColor: '#333', padding: '0.5rem 1rem' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component={RouterLink} to="/" style={{ textDecoration: 'none', fontWeight: 'bold', marginLeft: 0, width: 300 }}>
          Voyager Blog
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {username ? (
            <>
              <Button color="inherit" component={RouterLink} to="/create" sx={{ textTransform: 'none', width: 125, fontWeight: 'bold' }} startIcon={<CreateIcon />}>
                Create Post
              </Button>
              <Button color="inherit" component={RouterLink} to="/top-users" sx={{ textTransform: 'none', width: 125, fontWeight: 'bold' }} startIcon={<PeopleIcon />}>
                Top Users
              </Button>
              <Button color="inherit" onClick={logout} sx={{ textTransform: 'none', width: 125, fontWeight: 'bold' }} startIcon={<LogoutIcon />}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/top-users" sx={{ textTransform: 'none', width: 125, fontWeight: 'bold' }} startIcon={<PeopleIcon />}>
                Top Users
              </Button>
              <Button color="inherit" component={RouterLink} to="/login" sx={{ textTransform: 'none', width: 125, fontWeight: 'bold' }} startIcon={<LoginIcon />}>
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/register" sx={{ textTransform: 'none', width: 125, fontWeight: 'bold' }} startIcon={<PersonAddIcon />}>
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}