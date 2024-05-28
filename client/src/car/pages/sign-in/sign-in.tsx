import  { useState } from 'react';
import { useAppDispatch } from "../../redux/store/store"
import { setUser } from "../../redux/auth/auth.slice"
import { setSession } from "../../auth/auth.utils"
import { addUser as addUserApi } from '../../service/userServic'
import { Button, TextField, Container, Grid } from "@mui/material";
import logo from '../../images/צילום מסך 2024-05-13 170152.png'

export default function SignIn() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const dispatch = useAppDispatch()

  const handleChange = (e: any) => {
    try {

      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    } catch {
      alert('an error occurd')
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try{
    if (formData.confirmPassword == formData.password) {

      const value: any = await addUserApi({ name: formData.name, password: formData.password, email: formData.email })
      console.log("value from signin", value)
      dispatch(setUser(value.user))
      setSession(value)
    }
    console.log(formData);
  }
  catch{
    alert('an error occurd')
  }
  };

  return (
    <Container maxWidth="lg" style={{ margin: '0%', width: '100%', height: '100%', padding: '0px' }}>
      <Grid container spacing={3}>
        <Grid item md={8}>
          <img
            src={logo}
            alt="תיאור תמונה"
            className="img-fluid"
            style={{ height: "100%", width: "200%" }}
          />
        </Grid>
        <Grid item md={4} style={{ marginTop: '15%' }}>
          <form onSubmit={handleSubmit} style={{ marginLeft: '20%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );

};

