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

const UserPage = () => {
  const [data, setData] = useState({
    first_name: "amir",
    last_name: "amir",
    personal_id: "22222222",
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
    feedbacks: [],
  });

  useEffect(() => {
    axiosInstance.get(("/api/human-resource/employees/me")).then((res) => {
      setData(res.data)
    })
  }, [])
  const navigate = useNavigate();
  return (
    <Wrapper>
      <LoginButton
        onClick={() => {
          navigate(PATH_DASHBOARD.splash);
        }}
      >
        logout
      </LoginButton>
      <Card>
        <Box sx={{ display: "flex", justifyContent: "space-between" }} p={2}>
          <Typography variant="h5">
            welcome dear {data.first_name} {data.last_name}
          </Typography>
          <Typography variant="h5" color={"gray"}>
            {data.personal_id}
          </Typography>
        </Box>
        <CardInfo>
          <Stack gap={1} maxHeight="100%" overflow="auto">
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
                  {new Date(item.checkout_time).getMonth().toString()} /
                  {new Date(item.checkout_time).getDay().toString()} -
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
                  {new Date(item.date).getMonth().toString()} /
                  {new Date(item.date).getDay().toString()} :{" "}
                  {item.hours_worked}
                </Typography>
              </EnterCardInfoWorkHours>
            ))}
          </Stack>
        </CardInfo>
      </Card>
    </Wrapper>
  );
};

export default UserPage;
