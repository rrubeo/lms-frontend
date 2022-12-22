import * as React from "react";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import jnStyles from "../../../styles/utils.module.css";
const fsme_cfg = require("./config");

class SEC_StudentProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: this.props.profilo.nome ? this.props.profilo.nome : "Nome",
      cognome: this.props.profilo.cognome
        ? this.props.profilo.cognome
        : "Cognome",
      avatar: this.props.profilo.percorsoImmagineStudente
        ? this.props.profilo.percorsoImmagineStudente
        : "/immaginiutente/giuseppe.verdi.jpg",
    };
  }

  render() {
    // console.log(this.props);
    return (
      <Stack
        direction={{ xs: "row", sm: "row", md: "row" }}
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: 3, sm: 1, md: 2 }}
        sx={{ display: { xs: "none", sm: "flex", md: "flex", lg: "flex" } }}
      >
        <Avatar
          alt={`${this.state.nome} ${this.state.cognome}`}
          src={`${fsme_cfg.IMAGE_BASE_URL}${this.state.avatar}`}
          sx={{
            width: 80,
            height: 80,
          }}
        >
          {this.state.nome.slice(0, 1) + this.state.cognome.slice(0, 1)}
        </Avatar>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={{ xs: 0, sm: 0, md: 0 }}
        >
          <Typography
            variant="body2"
            classes={{
              body2: jnStyles.jnA1Profile,
            }}
            sx={{ m: 0, p: 0 }}
          >
            {this.state.nome} {this.state.cognome}
          </Typography>
          <Typography
            variant="body2"
            classes={{
              body2: jnStyles.jnB1Profile,
            }}
            sx={{ m: 0, p: 0 }}
          >
            {`Studente`}
          </Typography>
          <Typography
            variant="body2"
            classes={{
              body2: jnStyles.jnH3Profile,
            }}
            sx={{ m: 0, p: 0 }}
          >
            {`Crediti Residui ${this.props.profilo.creditiResidui}`}
          </Typography>
        </Stack>
      </Stack>
    );
  }
}

export default SEC_StudentProfile;
