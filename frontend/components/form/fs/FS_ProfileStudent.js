import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import fsStyle from "../../../styles/Fs.module.css";
import jnStyles from "../../../styles/utils.module.css";

class FS_ProfileStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.profile.nome ? this.props.profile.nome : " ",
      surname: this.props.profile.cognome ? this.props.profile.cognome : " ",
      credits: this.props.profile.creditiResidui
        ? this.props.profile.creditiResidui
        : 0,
      image: this.props.profile.percorsoImmagineStudente
        ? "" + this.props.profile.percorsoImmagineStudente + ""
        : " ",
    };
  }

  render() {
    const fs_cfg = require("../../../components/form/fs/config");

    return (
      <Grid container className={fsStyle.profileStudentBalloon}>
        <Grid item className={fsStyle.profileStudentAvatarContainer}>
          <Avatar
            className={fsStyle.profileStudentAvatar}
            alt="Profile"
            src={fs_cfg.IMAGE_BASE_URL + this.state.image}
          >
            {this.state.name.slice(0, 1) + this.state.surname.slice(0, 1)}
          </Avatar>
        </Grid>
        <Grid item>
          <Typography
            sx={{ paddingBottom: "1%" }}
            className={jnStyles.jnA1}
            variant="h1"
          >
            {this.state.name + " " + this.state.surname}
          </Typography>
          <Typography
            sx={{ paddingBottom: "1%" }}
            className={jnStyles.jnB1}
            variant="h3"
          >
            Studente
          </Typography>
          <Typography className={jnStyles.jnH3} variant="p">
            {this.state.credits} crediti
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default FS_ProfileStudent;
