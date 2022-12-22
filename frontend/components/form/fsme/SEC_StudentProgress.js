import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import fsStyle from "../../../styles/Fs.module.css";
import jnStyles from "../../../styles/utils.module.css";

class SEC_StudentProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Stack
        direction={{ xs: "row", sm: "row", md: "row" }}
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: 3, sm: 1, md: 2 }}
        sx={{
          maxWidth: "240px",
          display: { xs: "none", sm: "flex", md: "flex", lg: "flex" },
        }}
      >
        <Box component="div" className={jnStyles.jnProgressBox}>
          <CircularProgress
            className={jnStyles.jnProgressEmpty}
            variant="determinate"
            size={85}
            value={100}
            thickness={6}
          />
          <CircularProgress
            className={jnStyles.jnProgressFull}
            variant="determinate"
            size={85}
            thickness={6}
            value={this.props.avanzamento}
          />
          <Typography
            variant="body2"
            classes={{
              body2: jnStyles.jnA1Progress,
            }}
            sx={{ m: 0, p: 0 }}
          >
            {`${Math.round(parseInt(this.props.avanzamento))}%`}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          classes={{
            body2: jnStyles.jnH3Profile,
          }}
          sx={{ m: 0, p: 0 }}
        >
          {this.props.text}
        </Typography>
      </Stack>
    );
  }
}
export default SEC_StudentProgress;
