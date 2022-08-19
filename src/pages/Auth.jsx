import { useState } from "react";
import {
  TextField,
  InputAdornment,
  Stack,
  IconButton,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

//Icons
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../helper/firebase";
import { useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";

export const Auth = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [alertContent, setAlertContent] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (value, inputType) => {
    setUserInfo({ ...userInfo, [inputType]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      isSignUp
        ? await createUserWithEmailAndPassword(
            auth,
            userInfo.email,
            userInfo.password,
            userInfo.displayName
          )
        : await signInWithEmailAndPassword(
            auth,
            userInfo.email,
            userInfo.password
          );
      navigate("/");
    } catch (error) {
      console.log("error", error);
      setAlertContent({ content: error });
    }
    setIsLoading(false);
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <form onSubmit={handleSubmit}>
      <Stack sx={{ width: "25%", margin: "40px auto 0" }} spacing={3}>
        {isSignUp && (
          <TextField
            label="Name"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            onChange={(event) =>
              handleChange(event.target.value, "displayName")
            }
          />
        )}
        <TextField
          label="Email"
          required
          type="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          onChange={(event) => handleChange(event.target.value, "email")}
        />
        <TextField
          label="Password"
          required
          type={showPassword ? "text" : "password"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VpnKeyIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          onChange={(event) => handleChange(event.target.value, "password")}
        />
        <LoadingButton loading={isLoading} type="submit" variant="contained">
          {isSignUp ? "Sign Up" : "Log In"}
        </LoadingButton>
        <Typography>
          Do{isSignUp ? "" : "n't"} you have an account ? You can{" "}
          <Typography
            variant="span"
            color="primary"
            sx={{ cursor: "pointer" }}
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {!isSignUp ? "Sign Up" : "Log In"}
          </Typography>
          .
        </Typography>
      </Stack>
      {alertContent?.content && <Alert alertContent={alertContent} />}
    </form>
  );
};
