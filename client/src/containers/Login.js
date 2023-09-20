import { Box, Button, TextField, Typography } from "@mui/material";
import { fonts } from "../common/utils";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState();
  const [pwd, setPwd] = useState();
  const navigate = useNavigate();

  sessionStorage.removeItem("chattyUserId");

  const handleLogin = () => {
    let data = { email, pwd };
    axios
      .post("api/v1/login", data)
      .then((res) => {
        sessionStorage.setItem("chattyUserId", res.data.id);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      bgcolor="#23262fff"
    >
      <Box
        bgcolor="#3b3e46ff"
        padding="2vw"
        borderRadius="0.7vw"
        display="flex"
        flexDirection="column"
        gap="2vw"
        height="fit-content"
        marginTop="4vw"
      >
        <Typography color="#fff" fontSize={fonts.font_26}>
          Login
        </Typography>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="someone@something.com"
          inputProps={{ style: { color: "#fff", fontSize: fonts.font_22 } }}
          InputLabelProps={{ style: { fontSize: fonts.font_22 } }}
        />
        <TextField
          label="Password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          inputProps={{ style: { color: "#fff", fontSize: fonts.font_22 } }}
          InputLabelProps={{ style: { fontSize: fonts.font_22 } }}
          type="password"
        />
        <Typography color="#fff" textAlign="center" fontSize={fonts.font_18}>
          Don't have an account?{" "}
          <Link style={{ color: "#2f80edff" }} to="/signup">
            Sign up
          </Link>
        </Typography>
        <Button
          style={{ fontSize: fonts.font_20 }}
          variant="contained"
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
