import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Image from "next/image";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import jnStyles from "../styles/utils.module.css";
export default function Custom401() {
  const router = useRouter();

  const handleLogin = async (event) => {
    router.push("login");
  };
  return (
    <Container component="div" maxWidth="md" sx={{ my: 0, py: 0 }}>
      <Box
        component="div"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: "background.paper",
          borderRadius: "26px",
          alignItems: "center",
          boxShadow: 5,
          my: 1,
          mx: 0,
          px: 7,
          py: 2,
        }}
      >
        <main>
          <h3>401 - Unauthorized</h3>
          <Button
            id="login"
            type="button"
            variant="contained"
            sx={{ m: 5, borderRadius: 26 }}
            className={jnStyles.shadow}
            onClick={(event) => handleLogin(event)}
          >
            Login
          </Button>
          <Image
            alt="home"
            src="/images/search_bkg.png"
            layout="responsive"
            width={1200}
            height={650}
            priority
          />
        </main>
      </Box>
    </Container>
  );
}
