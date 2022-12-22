import * as React from "react";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import jnStyles from "../../../styles/utils.module.css";

const fsme_cfg = require("./config");

class SEC_LezioneTitolo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Stack
        direction={{ xs: "column", sm: "column", md: "column" }}
        justifyContent={{
          xs: "center",
          sm: "space-between",
          md: "space-between",
        }}
        alignItems={{ xs: "flex-start", sm: "flex-start", md: "stretch" }}
        spacing={{ xs: 1, sm: 1, md: 1 }}
        sx={{
          width: "100%",
          p: 2,
        }}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Typography
            variant="body2"
            classes={{
              body2: jnStyles.jnA1MaterieIcon,
            }}
            sx={{ m: 0, p: 0 }}
            className={this.props.image}
          />
          <Typography
            elevation={1}
            align="left"
            noWrap={true}
            variant="body2"
            classes={{
              body2: jnStyles.jnA1Materie,
            }}
          >
            {this.props.materia}
          </Typography>
        </Stack>
        <Typography
          elevation={1}
          align="left"
          noWrap={false}
          variant="body2"
          classes={{
            body2: jnStyles.jnA1Title,
          }}
        >
          {this.props.argomento}
        </Typography>
        <Typography
          elevation={1}
          align="left"
          noWrap={false}
          variant="body2"
          classes={{
            body2: jnStyles.jnA1DescLezione,
          }}
        >
          {this.props.lezione}
        </Typography>
      </Stack>
    );
  }
}

export default SEC_LezioneTitolo;
