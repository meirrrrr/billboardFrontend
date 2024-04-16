import { Grid, Paper, Avatar, TextField, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "60px 550px",
  };

  const avatarStyle = {
    backgroundColor: "green",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userCredentials = {
      username: event.target.login.value,
      password: event.target.password.value,
    };

    try {
      const response = await axios.post(
        "http://192.168.1.214:8080/auth/sign-in",
        userCredentials
      );
      console.log(response);
      const token = response.data.token;
      console.log(token);
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);

      if (decoded.Roles[0].Role == "ADMIN") {
        navigate("/admin/managers");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <form onSubmit={handleSubmit}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <AccountCircleIcon />
            </Avatar>
            <h2>Sign In</h2>
          </Grid>
          <TextField
            name="login"
            style={{ margin: "15px auto" }}
            label="Username"
            placeholder="Enter login"
            fullWidth
            required
          />
          <TextField
            name="password"
            style={{ margin: "15px auto" }}
            label="Password"
            type="password"
            placeholder="Enter paswword"
            fullWidth
            required
          />
          <Button type="submit" color="primary" variant="contained" fullWidth>
            Login
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
