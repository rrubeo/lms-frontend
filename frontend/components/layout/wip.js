import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Image from "next/image";
import Button from "@mui/material/Button";
import jnStyles from "../../styles/utils.module.css";

export default function Wip({ children }) {
  // console.log("Loader");
  // console.log(id);

  return (
    <Container
      component="span"
      maxWidth="lg"
      sx={{ my: 0, py: "2%", px: "2%" }}
      disableGutters={true}
    >
      <Box
        component="div"
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          borderRadius: "26px",
          py: 0,
          px: "4%",
          boxShadow: 5,
        }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="90vh"
      >
        <main>
          <Image
            alt="home"
            src="/images/wip.jpg"
            layout="responsive"
            width={1200}
            height={650}
            priority
          />
          <h3>{children}</h3>
        </main>
      </Box>
    </Container>
  );
}
