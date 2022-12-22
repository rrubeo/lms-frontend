import * as React from "react";
import Stack from "@mui/material/Stack";

import DCT_Dialog from "../../DCT_Dialog";
import SEC_List_Person from "./SEC_List_Person";
import SEC_StudentProfile from "./SEC_StudentProfile";
import SEC_StudentProgress from "./SEC_StudentProgress";
const fsme_cfg = require("./config");

class FRM_Studente_Aula extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      dialogTitle: "Titolo",
      dialogText: "Text",
      docentiId: "ctl_docenti",
      tutorId: "ctl_tutor",
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleDialogOk = this.handleDialogOk.bind(this);
  }

  handleOnClick(event, item) {
    if (item.id == this.state.docentiId) {
      if (this.props.data.crediti.creditiDisponibili < 1) {
        this.setState({
          dialogTitle: "Crediti non sufficienti",
          dialogText: "Richiedi crediti aggiuntivi.",
          dialogOpen: true,
        });
        return;
      }
    }
    item.startDate = new Date().toISOString().replace(/T.*$/, "");
    this.props.onClick(event, item, fsme_cfg.FSME_STEP_4);
  }

  handleDialogClose() {
    this.setState({ dialogOpen: false });
  }

  handleDialogOk() {
    this.setState({ dialogOpen: false });
  }

  render() {
    // console.log(this.props.data);
    return (
      <>
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
            <SEC_StudentProfile profilo={this.props.data.iscrizione[0]} />
            <SEC_StudentProgress
              text={this.props.data.label_avanzamento}
              avanzamento={
                this.props.data.iscrizione[0].percentualeAvanzamento
                  ? this.props.data.iscrizione[0].percentualeAvanzamento
                  : 0
              }
            />
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "column", md: "row" }}
            spacing={2}
            mt={0}
            mb={0}
            p={0}
          >
            <SEC_List_Person
              id={this.state.docentiId}
              listTitle={this.props.data.label_docenti}
              array={this.props.data.docenti}
              onClick={this.handleOnClick}
            />
            <SEC_List_Person
              id={this.state.tutorId}
              listTitle={this.props.data.label_tutor}
              array={this.props.data.tutor}
              onClick={this.handleOnClick}
            />
          </Stack>
        </Stack>
        <DCT_Dialog
          title={this.state.dialogTitle}
          text={this.state.dialogText}
          open={this.state.dialogOpen}
          onClose={this.handleDialogClose}
          onOk={this.handleDialogOk}
        />
      </>
    );
  }
}

export default FRM_Studente_Aula;
