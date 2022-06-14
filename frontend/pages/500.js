import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Image from "next/image";

export default function Custom500() {
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
          <h3>500 - Server-side error occurred</h3>
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
