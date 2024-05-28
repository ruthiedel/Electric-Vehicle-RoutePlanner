
import  { useState } from 'react';
import { login } from '../../service/userServic';
import { useAppDispatch } from "../../redux/store/store";
import { setUser } from "../../redux/auth/auth.slice";
import { setSession } from "../../auth/auth.utils";
import { Navigate } from 'react-router-dom';
import { Box, TextField, Chip, Stack, Avatar } from '@mui/material';
import logo from '../../images/צילום מסך 2024-05-13 170152.png';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [makeAccount, setMakeAccount] = useState(false);

  const dispatch = useAppDispatch();

  const handleChange = (e: any) => {
    try{
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    }
    catch{
      alert('an error occurd')
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const authUser = await login(formData.email, formData.password);
      console.log(authUser);
      dispatch(setUser(authUser.user));
      setSession(authUser);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const HandleCreateClick = () => {
    try{
    setMakeAccount(true);
    }
    catch{
      alert('an error occurd')
    }
  };

  if (makeAccount) {
    return <Navigate to={'/signin'} />;
  }

  return (
    <Box sx={{ marginTop: '10%' }}>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '400px',
          margin: 'auto',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          backgroundColor: 'white',
        }}
      >
        <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
        </Box>
        <form onSubmit={handleSubmit}>
        <Avatar alt="logo" src={logo} style={{ width: '50%', height: '50%', left: '23%' }} />

          <TextField
            label="Email address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            sx={{ marginBottom: '20px' }}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            sx={{ marginBottom: '20px' }}
          />
          <Stack justifyContent="center" spacing={2}>
            <Chip
              label="Login"
              color="primary"
              variant="outlined"
              onClick={handleSubmit}
              sx={{
                left: '32%',
                width: '35%',
                cursor: 'pointer',
              }}
            />
            <Chip
              label="Don't have an account?"
              color="primary"
              variant="outlined"
              onClick={HandleCreateClick}
              sx={{
                left: '28%',
                width: '45%',
                cursor: 'pointer',
              }}
            />
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

