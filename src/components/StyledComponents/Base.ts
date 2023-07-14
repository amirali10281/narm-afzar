import { Box, styled } from "@mui/material"

export const SideBox = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[900],
  padding: theme.spacing(6),
  borderRadius: theme.spacing(2),
  position: "relative",
  boxSizing: "border-box",
  width: "490px",
  height: "100%",
}))
