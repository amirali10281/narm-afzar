import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import {
  AllCenterStyle,
  fullScreenStyle,
  fullSizeStyle,
} from "../components/styles/BaseComponents";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { PATH_DASHBOARD } from "../routes/paths";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/APIClient";

interface EnterCardInfoProps {
  enter?: boolean;
}

const Wrapper = styled(Box)(({ theme }) => ({
  ...fullScreenStyle,
  ...AllCenterStyle,
  transition: "all linear 0.2s",
  backgroundImage: `url('/static/images/chatBackgroundImage.png')`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  position: "relative",
  padding: theme.spacing(8),
}));
const Card = styled(Box)(({ theme }) => ({
  ...fullSizeStyle,
  transition: "all linear 0.2s",
  backgroundColor: theme.palette.grey[900],
  position: "relative",
  borderRadius: theme.spacing(2),
  overflow: "auto",
  boxShadow: "0px 10px 100px -30px black",
  padding: theme.spacing(4),
}));

const CardInfo = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "auto auto",
  gap: theme.spacing(2),
  minHeight: "200px",
  transition: "all linear 0.2s",
  backgroundColor: theme.palette.grey[800],
  position: "relative",
  borderRadius: theme.spacing(2),
  overflow: "auto",
  boxShadow: "0px 10px 10px -30px black",
  padding: theme.spacing(4),
}));
const CardInfoBase = styled(Box)(({ theme }) => ({
  gap: theme.spacing(2),
  minHeight: "200px",
  transition: "all linear 0.2s",
  backgroundColor: theme.palette.grey[800],
  position: "relative",
  borderRadius: theme.spacing(2),
  overflow: "auto",
  boxShadow: "0px 10px 10px -30px black",
  padding: theme.spacing(4),
}));

const EnterCardInfo = styled(Box)<EnterCardInfoProps>(({ theme, enter }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  borderRadius: theme.spacing(1),
  backgroundColor: enter
    ? theme.palette.success.main
    : theme.palette.error.main,
  padding: theme.spacing(1),
}));

const EnterCardInfoWorkHours = styled(Box)<EnterCardInfoProps>(
  ({ theme, enter }) => ({
    display: "flex",
    justifyContent: "center",
    width: "100%",
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.grey[900],
    padding: theme.spacing(1),
  })
);
const StartCardInfo = styled(Box)<EnterCardInfoProps>(({ theme, enter }) => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.common.black,
  padding: theme.spacing(1),
}));
const LoginButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: "30px",
  right: "30px",
  color: theme.palette.common.white,
}));
const DirectionButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  backgroundColor: theme.palette.grey[800],
  width: "160px",
  left: "calc(50% - 80px)",
  right: "calc(50% - 80px)",
  migration: "auto",
  color: theme.palette.grey[100],
  "&:hover": {
    color: theme.palette.grey[900],
  },
}));

const UserPage = () => {
  const [text, setText] = useState("");
  const [id, setId] = useState("");
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    personal_id: "",
    feedbacks: [{ from: "", message: "" }],
    time_track: [
      {
        employee: 2,
        checkout_time: "2023-07-15T08:01:12.349Z",
        checkout_type: "E",
      },
      {
        employee: 2,
        checkout_time: "2023-07-15T08:01:12.349Z",
        checkout_type: "Q",
      },
      {
        employee: 2,
        checkout_time: "2023-07-15T08:01:12.349Z",
        checkout_type: "Q",
      },
    ],
    work_hours: [
      {
        date: "2023-07-05",
        hours_worked: 4,
      },
      {
        date: "2023-07-15",
        hours_worked: 0,
      },
    ],
    total_hours_worked: 0,
  });

  useEffect(() => {
    axiosInstance
      .get("/api/human-resource/employees/me", {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const navigate = useNavigate();
  const submit = () => {
    axiosInstance
      .post("/api/human-resource/feedback/send", {
        to_user_id: id,
        message: text,
      }, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        },
      })
      .then(() => {
        setText("");
        setId("");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Wrapper>
      <LoginButton
        onClick={() => {
          navigate(PATH_DASHBOARD.checkout);
        }}
      >
        logout
      </LoginButton>
      <Card>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
            width: "100%",
          }}
          p={2}
        >
          <Typography variant="h5">
            welcome dear {data.first_name} {data.last_name}
          </Typography>
          <DirectionButton
            variant="contained"
            onClick={() => {
              navigate(PATH_DASHBOARD.messages);
            }}
          >
            your feedbacks
          </DirectionButton>
          <Typography variant="h5" color={"gray"}>
            {data.personal_id}
          </Typography>
        </Box>
        <Stack spacing={2}>
          <CardInfo
            sx={{ maxHeight: "500px", overflow: "auto", margin: "0px" }}
          >
            <Stack gap={1} maxHeight="400px" overflow="auto">
              <StartCardInfo mb={2}>
                <Typography variant="h4" fontWeight="bold" textAlign="center">
                  enter and exit time
                </Typography>
              </StartCardInfo>
              {data.time_track.map((item) => (
                <EnterCardInfo enter={item.checkout_type === "E"}>
                  <Typography
                    variant="buttonLarge"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    {new Date(item.checkout_time).getFullYear().toString()} /
                    {new Date(item.checkout_time).getMonth() + 1 + ""} /
                    {new Date(item.checkout_time).getDate().toString()} -
                    {new Date(item.checkout_time).getHours().toString()}:
                    {new Date(item.checkout_time).getMinutes().toString()}
                  </Typography>
                </EnterCardInfo>
              ))}
            </Stack>
            <Stack gap={1} maxHeight="100%" overflow="auto">
              <StartCardInfo mb={2}>
                <Typography variant="h4" fontWeight="bold" textAlign="center">
                  total work hours
                </Typography>
              </StartCardInfo>
              {data.work_hours.map((item) => (
                <EnterCardInfoWorkHours>
                  <Typography
                    variant="buttonLarge"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    {new Date(item.date).getFullYear().toString()} /
                    {new Date(item.hours_worked).getMonth() + 1 + ""} /
                    {new Date(item.hours_worked).getDate().toString()} :{" "}
                    {Math.floor(item.hours_worked)}
                  </Typography>
                </EnterCardInfoWorkHours>
              ))}
            </Stack>
          </CardInfo>
          <CardInfoBase>
            <Stack spacing={1} width="100%">
              <StartCardInfo>
                <Typography variant="h3" fontWeight="bold">
                  salary
                </Typography>
              </StartCardInfo>
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Typography variant="h5">
                  total work hours : {data.total_hours_worked}
                </Typography>
                <Typography variant="h5">base salary : {20000}</Typography>
              </Box>
              <hr />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h5">
                  your salary : {20000 * data.total_hours_worked}
                </Typography>
              </Box>
            </Stack>
          </CardInfoBase>
        </Stack>
      </Card>
    </Wrapper>
  );
};

export default UserPage;
