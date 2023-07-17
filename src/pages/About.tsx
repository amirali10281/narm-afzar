import { Box, Button, Typography, styled } from "@mui/material";
import { AllCenterStyle, fullScreenStyle, fullSizeStyle } from "../components/styles/BaseComponents";
import { PATH_DASHBOARD } from "../routes/paths";
import { useNavigate } from "react-router-dom";

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
    maxWidth: '600px',
    width: '80%',
    transition: "all linear 0.2s",
    backgroundColor: theme.palette.grey[900],
    position: "relative",
    borderRadius: theme.spacing(2),
    overflow: "auto",
    boxShadow: "0px 10px 100px -30px black",
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
const A = styled('a')(({ theme }) => ({
    color: theme.palette.info.main
}))

const DirectionButton = styled(Button)(({ theme }) => ({
    position: "absolute",
    backgroundColor: theme.palette.grey[800],
    width: "80%",
    left: "10%",
    right: "10%",
    bottom: '30px',
    migration: "auto",
    color: theme.palette.grey[100],
    "&:hover": {
        color: theme.palette.grey[900],
    },
}));
const About = () => {
    const navigate = useNavigate()
    return (
        <Wrapper>
            <Card>
                <Typography variant="h2" fontWeight="bold" textAlign="center">
                    Project of SE
                </Typography>

                <Typography variant="h4" fontWeight="bold" >
                    Creators :
                </Typography>
                <Typography variant="body1" ml={2}>
                    Frontend By <A href="https://github.com/amirali10281">AmirAli Amini</A>
                </Typography>
                <Typography variant="body1" ml={2}>
                    Backend By <A href="https://github.com/amir-entezari">AmirHossein Entezari</A>
                </Typography>
                <Typography variant="body1" ml={2} mb={4}>
                    With help Mohsen Tahmasbi
                </Typography>

                <CardInfoBase>
                    <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
                        How to work with the project:
                    </Typography>
                    <Typography variant="body1" ml={2}>

                        On <A href="https://hrm.amirentezari.ir/checkout">hrm.amirentezari.ir/checkout</A> , you can scan your qr code to checkout your enter or exit. On top of the page, you can login to see your information like checkouts, workhours, wage and etc. on hrm.amirentezari.ir/splash, on top of the page, you can send feedback to others and see feedbacks that others sent to you.
                        In addition, a full admin panel is available on hrm-api.amirentezari.ir/admin that you can do anything you want.
                    </Typography>
                </CardInfoBase>
                <DirectionButton onClick={() => { navigate(PATH_DASHBOARD.checkout) }}>Back</DirectionButton>
            </Card>
        </Wrapper>
    )
}


export default About
