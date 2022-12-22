import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import jnStyles from "../../../styles/utils.module.css";

import SEC_List from "./SEC_List";
import SEC_StudentProfile from "./SEC_StudentProfile";
import SEC_StudentProgress from "./SEC_StudentProgress";
import SEC_MathLogin from "./SEC_MathLogin";
import SEC_StudenteLezioni from "./SEC_StudenteLezioni";
const fsme_cfg = require("./config");

class FRM_Studente_Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // console.log(this.props.data);
    return (
      <Stack
        direction="column"
        spacing={{ xs: 0, sm: 0, md: 2 }}
        mt={0}
        mb={0}
        p={0}
      >
        <Stack
          direction={{ xs: "column", sm: "row", md: "row" }}
          justifyContent={{
            xs: "space-evenly",
            sm: "space-between",
            md: "space-between",
          }}
          alignItems={{ xs: "flex-start", sm: "flex-start", md: "stretch" }}
          spacing={{ xs: 2, sm: 0, md: 0 }}
        >
          <SEC_StudentProfile profilo={this.props.data.profilo} />
          <SEC_StudentProgress
            text={this.props.data.label_avanzamento}
            avanzamento={
              this.props.data.profilo.percentualeAvanzamento
                ? this.props.data.profilo.percentualeAvanzamento
                : 0
            }
          />
        </Stack>
        <Stack
          direction={{
            xs: "column-reverse",
            sm: "column-reverse",
            md: "column-reverse",
            lg: "row",
          }}
          justifyContent={{
            xs: "space-evenly",
            sm: "space-evenly",
            md: "space-between",
          }}
          alignItems={{
            xs: "center",
            sm: "center",
            md: "center",
            lg: "flex-start",
          }}
          spacing={2}
          mt={0}
          mb={0}
          p={0}
        >
          <Stack
            direction="column"
            spacing={1}
            mt={0}
            mb={0}
            p={0}
            justifyContent="flex-start"
            alignItems="stretch"
            sx={{ width: 1, maxWidth: { xs: 1, sm: 1, md: 1, lg: 470 } }}
          >
            <Typography
              elevation={0}
              align="left"
              noWrap={true}
              variant="body2"
              classes={{
                body2: jnStyles.jnA1Title,
              }}
              sx={{
                display: { xs: "none", sm: "flex", md: "flex", lg: "flex" },
              }}
            >
              {this.props.data.label_corsi}
            </Typography>
            <SEC_List
              listTitle={this.props.data.label_corsi}
              array={this.props.data.iscrizione}
              classes={jnStyles.jnListCorsi}
            />
            <Typography
              elevation={1}
              align="left"
              noWrap={true}
              variant="body2"
              classes={{
                body2: jnStyles.jnA1Title,
              }}
              sx={{
                display: { xs: "none", sm: "flex", md: "flex", lg: "flex" },
              }}
            >
              {this.props.data.label_ultime}
            </Typography>
            <SEC_List
              listTitle={this.props.data.label_ultime}
              array={this.props.data.lezioniViste}
              classes={jnStyles.jnListUltimeLezioni}
            />
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <SEC_MathLogin
                userInfo={this.props.userInfo}
                type="hidden"
                data={this.props.data.persona}
              />
              <Button
                variant="contained"
                classes={{ root: jnStyles.jnBT }}
                href={
                  process.env.cloudfiles +
                  "/" +
                  this.props.data.persona[0].userName +
                  ".pdf"
                }
                target={"_blank"}
              >
                Calendario
              </Button>
            </Stack>
          </Stack>
          <SEC_StudenteLezioni
            materie={this.props.data.materie}
            onClick={this.props.onClick}
          />
        </Stack>
      </Stack>
    );
  }
}

export default FRM_Studente_Home;
