import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import jnStyles from "../../../styles/utils.module.css";

const fsme_cfg = require("./config");

class SEC_StudenteLezioniSingle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(event, classeId, lessonId) {    
    const item = {
      id: this.props.id,
      classeId: classeId,
      lessonId: lessonId,
    };
    await this.props.onClick(event, item, fsme_cfg.FSME_STEP_1);
  }

  render() {
    // console.log(this.props);
    return (
      <Grid
        container
        spacing={1}
        columns={{ xs: 12, sm: 12, md: 12 }}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        mt={0}
        mb={0}
        mx={2}
        p={0}
        sx={{ width: "100%" }}
      >
        {this.props.lezioni.map((item, index) => (
          <React.Fragment key={item.idLezione}>
            <Grid item xs={12} sm={12} md={9}>
              <Typography
                key={item.idLezione}
                variant="body2"
                classes={{
                  body2: jnStyles.jnA1DescLezione,
                }}
                sx={{ m: 0, p: 0 }}
              >
                {item.lezione}
              </Typography>
            </Grid>
            <Grid item xs="auto">
              <Typography
                variant="p"
                className={jnStyles.jnA1Tempo}
                sx={{ m: 0 }}
              >
                {`Stimato ${
                  item.durataMinutiLezione ? item.durataMinutiLezione : 0
                }m`}
              </Typography>
            </Grid>
            <Grid item xs={1} sm={1} md={1} align="right">
              <Typography
                variant="h4"
                className={item.lezioneCompletata ? "icon-checkmark" : " "}
                sx={{
                  color: "#B34A9D",
                  fontSize: "20px",
                  display: "inline",
                  cursor: "pointer",
                }}
              />
              <Typography
                variant="h4"
                className="icon-arrow-right3"
                sx={{
                  color: "#000000",
                  fontSize: "20px",
                  display: "inline",
                  cursor: "pointer",
                }}
                onClick={(event) =>
                  this.handleClick(event, this.props.classeId, item.idLezione)
                }
              />
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    );
  }
}

export default SEC_StudenteLezioniSingle;
