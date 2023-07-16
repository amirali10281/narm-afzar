import {
  Box,
  Button,
  Stack,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import {
  AllCenterStyle,
  fullScreenStyle,
} from "../components/styles/BaseComponents";
import { QrReader } from "react-qr-reader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH_DASHBOARD } from "../routes/paths";
import axiosInstance from "../api/APIClient";

const Wrapper = styled(Box)(() => ({
  ...fullScreenStyle,
  ...AllCenterStyle,
  transition: "all linear 0.2s",
  backgroundImage: `url('/static/images/chatBackgroundImage.png')`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  position: "relative",
}));
const LoginButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: "30px",
  right: "30px",
  color: theme.palette.common.white,
}));

function SplashPage() {
  const [data, setData] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  const request = (res: string) => {
    if (!data && !status && !loading) {
      setLoading(true)
      setData(res);
      axiosInstance.post("/api/human-resource/employees/TimeTrack/checkout", { "personal_id": res }).then((res) => {
        setStatus("success")
      }).catch((e) => {
        setStatus("error")
      }).finally(() => {
        setTimeout(() => {
          setStatus("")
          setData("")
          setLoading(false)
        }, 5000);
      })
    }


  };
  const navigate = useNavigate();
  return (
    <Wrapper
      sx={{
        backgroundColor:
          status === "success"
            ? theme.palette.success.dark
            : status === "error"
              ? theme.palette.error.dark
              : data
                ? theme.palette.info.light
                : theme.palette.grey[900],
      }}
    >
      <LoginButton
        onClick={() => {
          navigate(PATH_DASHBOARD.login);
        }}
      >
        Login
      </LoginButton>
      <Stack
        width={"600px"}
        sx={{
          borderRadius: theme.spacing(2),
          padding: theme.spacing(5),
          transition: "all cubic-bezier(1, 0, 0, 1.2) 1s",
          backgroundColor: theme.palette.grey[900],
          boxShadow: data
            ? "0px 10px 100px -3px black"
            : "0px 10px 30px -3px black",
          transform: data ? "scale(1.1)" : "none",
        }}
      >
        <Typography variant="h2" textAlign={"center"} fontWeight={"bold"}>
          Welcome
        </Typography>
        <QrReader
          constraints={{ facingMode: "user" }}
          onResult={(result, error) => {
            if (!!result) {
              if (!data && !status && !loading) {
                request(result?.getText());
              }
            }

            if (!!error) {
              console.info(error);
            }
          }}
        />
        <Typography
          variant={"h5"}
          fontWeight="bold"
          color={
            status === "success"
              ? theme.palette.success.light
              : status === "error"
                ? theme.palette.error.light
                : data
                  ? theme.palette.info.light
                  : theme.palette.grey[300]
          }
          textAlign="center"
        >
          {status === "success"
            ? `welcome ${new Date().getHours()}:${new Date().getMinutes()}`
            : status === "error"
              ? `error ${new Date().getHours()}:${new Date().getMinutes()}`
              : !data
                ? "scan your card"
                : data}
        </Typography>
      </Stack>
    </Wrapper>
  );
}

export default SplashPage;
