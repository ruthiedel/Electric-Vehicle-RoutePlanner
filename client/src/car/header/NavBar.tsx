import { NavLink } from "react-router-dom";
import { PATHS } from "../router/PATH";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Avatar, Grid, IconButton } from '@mui/material';
import { removeSession } from '../auth/auth.utils';
import HomeIcon from '@mui/icons-material/Home';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import GradeIcon from '@mui/icons-material/Grade';
import logo2 from '../images/logo2.jpeg'

function App() {

  function handleLogout(event: any): void {
    removeSession()

  }

  return (
    <AppBar position="static" style={{ top: 0, width: '100%',height:'5%' }}>

      <Toolbar style={{ width: '70%', marginLeft: '20%' }}>
        <Avatar alt="logo" src={logo2} style={{ left: '-31%', width: '5%', height: '5%' }} />

        <div style={{ justifyContent: 'center' }}>
          <HomeIcon></HomeIcon>
          <Typography
            variant="h5"
            noWrap
            component={NavLink}
            to={PATHS.home}
            sx={{
              mr: 2,
              fontWeight: 200,
              fontFamily: 'roboto',
              color: 'white',
              letterSpacing: '.2rem',
              textDecoration: 'none',
            }}
          >
            Home
          </Typography>
          <ElectricCarIcon></ElectricCarIcon>
          <Typography
            variant="h5"
            noWrap
            component={NavLink}
            to={PATHS.car}
            sx={{
              mr: 2,
              fontWeight: 200,
              fontFamily: 'roboto',
              color: 'white',
              letterSpacing: '.2rem',
              textDecoration: 'none',
            }}
          >
            self-zone cars
          </Typography>
          <GradeIcon></GradeIcon>
          <Typography
            variant="h5"
            noWrap
            component={NavLink}
            to={PATHS.favorite}
            sx={{
              mr: 2,
              fontWeight: 200,
              fontFamily: 'roboto',
              color: 'white',
              letterSpacing: '.2rem',
              textDecoration: 'none',
            }}
          >
            self-zone favorites

          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"

            sx={{
              mr: 2,
              fontWeight: 200,
              fontFamily: 'roboto',
              color: 'white',
              letterSpacing: '.2rem',
              textDecoration: 'none',
            }}
          >
            <IconButton
              edge="end"
              aria-label="logout"
              aria-haspopup="true"
              color="inherit"
              onClick={handleLogout}
            >
              <ExitToAppIcon />
            </IconButton>
            Log Out
          </Typography>
        </div>
      </Toolbar>

    </AppBar>
  );
}
export default App;