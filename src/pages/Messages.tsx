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

const Messages = () => {
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
      .get("/api/human-resource/employees/me")
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
          navigate(PATH_DASHBOARD.splash);
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
          }}
          p={2}
        >
          <Typography variant="h5">
            welcome dear {data.first_name} {data.last_name}
          </Typography>
          <DirectionButton
            variant="contained"
            onClick={() => {
              navigate(PATH_DASHBOARD.user);
            }}
          >
            your profile
          </DirectionButton>
          <Typography variant="h5" color={"gray"}>
            {data.personal_id}
          </Typography>
        </Box>
        <Stack spacing={2}>
          <CardInfoBase>
            <Stack spacing={1} width="100%">
              <StartCardInfo>
                <Typography variant="h3" fontWeight="bold">
                  Feedback
                </Typography>
              </StartCardInfo>
              <TextField
                label="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <TextField
                label="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                multiline
              />
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={() => submit()}
              >
                submit
              </Button>
            </Stack>
          </CardInfoBase>
          <CardInfoBase>
            <Stack spacing={1} width="100%">
              <StartCardInfo>
                <Typography variant="h3" fontWeight="bold">
                  Your messages
                </Typography>
              </StartCardInfo>
              <Stack sx={{ maxHeight: "300px", overflow: "auto" }} spacing={1}>
                {data.feedbacks.map((item) => (
                  <Box
                    sx={{
                      border: "1px solid white",
                      borderRadius: "8px",
                      padding: "16px",
                    }}
                  >
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      color="#ffffff70"
                    >
                      From : {item.from}
                    </Typography>
                    <Typography variant="buttonLarge" ml={2}>
                      {item.message}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </CardInfoBase>
        </Stack>
      </Card>
    </Wrapper>
  );
};

export default Messages;
