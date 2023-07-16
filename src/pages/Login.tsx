import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  styled,
  Dialog as MUIDialog,
  Stack,
} from "@mui/material";
import { PATH_DASHBOARD } from "../routes/paths";
import BaseInput from "../components/BaseInput";
import BaseButton from "../components/BaseButton";
import axiosInstance from "../api/APIClient";

const Page = styled(Box)(() => ({
  height: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
  backgroundImage: "url('/static/images/mainBackground.png')",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const Dialog = styled(MUIDialog)(({ theme, maxWidth }) => ({
  ".MuiDialog-container": {
    backdropFilter: "blur(14px)",
  },
  "&.MuiDialog-root": {
    position: "absolute ",
    overFlow: "hidden",
  },
  "& .MuiDialog-paper": {
    backgroundColor: theme.palette.grey[900],
    borderRadius: theme.spacing(1),
    height: maxWidth === "sm" ? "300px" : "660px",
    boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.16);",
    backgroundImage: "none",
  },
}));

const DialogContent = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "348px auto",
  height: "100%",
  width: "100%",
  padding: "none",
  root: {
    padding: "none",
  },
}));

const FieldsSide = styled(Box)(() => ({
  position: "relative",
  height: "100%",
  width: "100%",
  padding: "48px",
  paddingTop: "104px",
  boxSizing: "border-box",
}));

interface ContentSideProps {
  isRTL?: boolean;
}
const ContentSide = styled(Box)<ContentSideProps>(({ theme, isRTL }) => ({
  position: "relative",
  height: "100%",
  width: "100%",
  borderRadius: "40px 8px 8px 40px",
  gridTemplateRows: "220px auto",
  backgroundColor: theme.palette.grey[700],
  backgroundImage: isRTL
    ? "url('/static/images/loginBackground.webp')"
    : "url('/static/images/loginBackground.webp')",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundPosition: "center",
}));

function Login() {
  const [username, setUsername] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(true);

  const navigate = useNavigate();

  const login = () => {
    axiosInstance
      .post("/api/human-resource/user/login", { username, password })
      .then((res) => {
        let data = res.data;
        localStorage.setItem("token", data);
      })
      .then(() => {
        navigate(PATH_DASHBOARD.user);
      });
  };

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  return (
    <Page>
      <Dialog
        fullWidth
        maxWidth="lg"
        disablePortal
        open
        BackdropProps={{
          style: {
            backgroundColor: "transparent",
            position: "absolute",
          },
        }}
      >
        <DialogContent>
          <FieldsSide>
            <Stack spacing={3}>
              <Stack spacing={1}>
                <Typography variant="subtitle2">user name</Typography>
                <BaseInput
                  noPadding
                  fullWidth
                  value={username}
                  handleChange={(newUserName) =>
                    setUsername(newUserName.target.value)
                  }
                  startIcon="gg:profile"
                />
              </Stack>
              <Stack spacing={1}>
                <Typography variant="subtitle2">password</Typography>
                <BaseInput
                  noPadding
                  fullWidth
                  value={password}
                  handleChange={(newPassword) =>
                    setPassword(newPassword.target.value)
                  }
                  startIcon="ri:key-2-line"
                  endIcon="mdi:eye-off-outline"
                  hidePassword={showPassword}
                  onClickEndIcon={() => setShowPassword(!showPassword)}
                />
              </Stack>
            </Stack>
            <Stack
              sx={{
                position: "absolute",
                bottom: "68px",
                left: "48px",
                right: "48px",
              }}
            >
              <BaseButton
                onClick={() => login()}
                disabled={username === "" || password === ""}
              >
                <Typography variant="subtitle2">ورود</Typography>
              </BaseButton>
            </Stack>
          </FieldsSide>
          <ContentSide />
        </DialogContent>
      </Dialog>
    </Page>
  );
}

export default Login;
