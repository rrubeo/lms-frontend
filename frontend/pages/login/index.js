import * as React from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import jnStyles from "../../styles/utils.module.css";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import DCT_Login from "../../components/login/DCT_Login";
import DTC_TextBox from "../../components/DTC_TextBox";
import { fetchJson, FetchError, validationMessage, MSG_ERROR } from "../../lib";
import useUser from "../../lib/useUser";
import { PAGE_HOME } from "../../lib/redirect";

export default function Login(props) {
  const { mutateUser } = useUser({
    redirectTo: PAGE_HOME,
    redirectIfFound: true,
  });

  const onChangeForm = (id, data) => {};

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // const values = [...data.entries()];
    // console.log(values);

    let credential = {
      username: data.get("userName"),
      password: data.get("password"),
    };

    try {
      mutateUser(
        await fetchJson("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credential),
        }),
        false
      );
    } catch (error) {
      if (error instanceof FetchError) {
        validationMessage(error.data.message, MSG_ERROR);
      } else {
        validationMessage(error.message, MSG_ERROR);
        console.error("An unexpected error happened:", error);
      }
    }
  };
  return (
    <>
      <DCT_Login>
        <Box
          sx={{
            marginTop: { xs: 0, md: 0 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            layout="fixed"
            src="/images/janus_logo_login.png"
            height={58}
            width={300}
            priority
          />
          <Card
            id="logindata"
            component="form"
            onSubmit={handleSubmit}
            sx={{
              // minWidth: 275,
              // maxWidth: 355,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 10,
              boxShadow: 10,
              mt: 5,
              zIndex: "tooltip",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Stack
                direction={{ xs: "column", sm: "column" }}
                spacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h5"
                  component="div"
                  classes={{
                    h5: jnStyles.jnF1,
                  }}
                  sx={{
                    mt: 2,
                  }}
                >
                  Accedi all'area riservata
                </Typography>
                <DTC_TextBox
                  required
                  autoFocus
                  id="userName"
                  label="Username"
                  size={{ xs: 100, sm: 150, md: 270 }}
                  onChange={onChangeForm}
                  // ref={this.changeChildLezioneId}
                />
                <DTC_TextBox
                  required
                  id="password"
                  label="Password"
                  size={{ xs: 100, sm: 150, md: 270 }}
                  onChange={onChangeForm}
                  // ref={this.changeChildLezioneId}
                />
              </Stack>
            </CardContent>
            <CardActions
              sx={{
                m: 0,
                mb: 4,
                p: 0,
                alignItems: "center",
              }}
            >
              <Stack
                component="div"
                direction={{ xs: "column", sm: "column" }}
                spacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{
                  minWidth: { xs: 120, sm: 170, md: 290 },
                  maxWidth: { xs: 120, sm: 170, md: 290 },
                  m: 0,
                  mt: 5,
                  p: 1.5,
                  alignItems: "center",
                }}
              >
                <Button
                  id="submit"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ borderRadius: 26 }}
                  className={jnStyles.shadow}
                  size="small"
                >
                  Accedi
                </Button>
                <Link href="#" variant="body2" className={jnStyles.jnN7}>
                  Reset password
                </Link>
              </Stack>
            </CardActions>
          </Card>
        </Box>
      </DCT_Login>
    </>
  );
}
