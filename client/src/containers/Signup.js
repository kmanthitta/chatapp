import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { fonts } from "../common/utils";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pwd, setPwd] = useState();
  const [confPwd, setConfPwd] = useState();
  const [error, setError] = useState({});
  const navigate = useNavigate();

  sessionStorage.removeItem("chattyUserId");

  const handleRegister = () => {
    if (validate()) {
      let data = { name, email, pwd };
      axios
        .post("https://chatapp-ochre-tau.vercel.app/api/v1/register", data)
        .then((res) => {
          sessionStorage.setItem("chattyUserId", res.data.id);
          navigate("/");
        })
        .catch((error) => console.log(error));
    }
  };

  const validate = () => {
    let errors = {};
    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
      errors.email = "Invalid email";
    }
    if (pwd !== confPwd) {
      errors.pwd = "Passwords are not identical";
    }
    setError(errors);
    return Object.keys(errors).length === 0;
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
        marginTop="1vw"
      >
        <Typography color="#fff" fontSize={fonts.font_26}>
          Sign Up
        </Typography>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          inputProps={{ style: { color: "#fff", fontSize: fonts.font_22 } }}
          InputLabelProps={{ style: { fontSize: fonts.font_22 } }}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="someone@something.com"
          inputProps={{ style: { color: "#fff", fontSize: fonts.font_22 } }}
          InputLabelProps={{ style: { fontSize: fonts.font_22 } }}
          helperText={error.email}
          FormHelperTextProps={{
            style: {
              color: "#d32f2f",
              fontWeight: 600,
              fontSize: fonts.font_18,
            },
          }}
        />
        <TextField
          label="Password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          inputProps={{ style: { color: "#fff", fontSize: fonts.font_22 } }}
          InputLabelProps={{ style: { fontSize: fonts.font_22 } }}
          type="password"
          helperText={error.pwd}
          FormHelperTextProps={{
            style: {
              color: "#d32f2f",
              fontWeight: 600,
              fontSize: fonts.font_18,
            },
          }}
        />
        <TextField
          label="Confirm password"
          value={confPwd}
          onChange={(e) => setConfPwd(e.target.value)}
          inputProps={{ style: { color: "#fff", fontSize: fonts.font_22 } }}
          InputLabelProps={{ style: { fontSize: fonts.font_22 } }}
          type="password"
        />
        <Typography color="#fff" textAlign="center" fontSize={fonts.font_18}>
          <Link style={{ color: "#2f80edff" }} to="/login">
            Go back to login page
          </Link>
        </Typography>
        <Button
          style={{ fontSize: fonts.font_20 }}
          variant="contained"
          onClick={handleRegister}
        >
          Sign up
        </Button>
      </Box>
    </Box>
  );
};

export default Signup;
