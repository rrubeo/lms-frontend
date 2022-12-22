import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import jnStyles from "../../../styles/utils.module.css";

const fsme_cfg = require("./config");

class SEC_StudenteLezioniSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={3}
        mt={0}
        mb={0}
        mx={2}
        p={0}
        sx={{ width: "100%" }}
      >
        <Typography
          variant="body2"
          classes={{
            body2: jnStyles.jnA1MaterieIcon,
          }}
          sx={{ m: 0, p: 0 }}
          className={this.props.icon}
        />
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          spacing={{ xs: 0, sm: 0, md: 1 }}
          sx={{ width: "100%" }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={{ xs: 0, sm: 0, md: 0 }}
            sx={{ width: "100%" }}
          >
            <Typography
              variant="body2"
              classes={{
                body2: jnStyles.jnA1Materie,
              }}
              sx={{ m: 0, p: 0 }}
            >
              {this.props.materia}
            </Typography>
            <Typography
              variant="body2"
              classes={{
                body2: jnStyles.jnA1Materie,
              }}
              sx={{ m: 0, p: 0 }}
            >
              {parseInt(this.props.avanzamento)}%
            </Typography>
          </Stack>
          <LinearProgress
            className={jnStyles.jnAccordionProgress}
            variant="determinate"
            value={parseInt(this.props.avanzamento)}
            sx={{ width: "100%" }}
          />
        </Stack>
      </Stack>
    );
  }
}

export default SEC_StudenteLezioniSummary;
