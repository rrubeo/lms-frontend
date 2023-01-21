import * as React from "react";
import { withRouter } from "next/router";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";

import DTC_TextMultiline from "../../DTC_TextMultiline";
import DTC_DataGrid from "../../grid/DTC_DataGrid";

import jnStyles from "../../../styles/utils.module.css";

class FRM_Moni_Notify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkStudentiId: "lbox_ruoli",
      checkStudentiValue: [],
      notificaId: "tx_domanda",
      notificaValue: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.changeChildNotificaId = React.createRef();
    this.changeChildGridId = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      id: this.props.id,
      notifica: this.state.notificaValue,
      notifyList: this.state.checkStudentiValue,
    };
    this.props.onSubmit(event, data);
  }

  handleReset(event) {
    this.changeChildNotificaId.current.handleReset();
    this.onChangeForm(this.state.notificaId, "");
  }

  onChangeForm(id, data) {
    switch (id) {
      case this.state.notificaId:
        this.setState({ notificaValue: data });
        break;
      case this.state.checkStudentiId:
        this.setState({ checkStudentiValue: data });
        break;
      default:
        console.log(id);
        console.log(data);
        break;
    }
  }

  render() {
    // console.log(this.props.data);
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          border: 1,
          borderRadius: "26px",
          width: "100%",
          py: "2%",
          px: "2%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            border: 1,
            borderRadius: "26px",
            width: "100%",
            mt: { xs: 2, sm: 2, md: 0 },
            py: "2%",
            px: "2%",
          }}
        >
          <DTC_TextMultiline
            required
            id={this.state.notificaId}
            label={this.props.data.notifica_label}
            onChange={this.onChangeForm}
            size={1}
            ref={this.changeChildNotificaId}
          />
          <Button
            variant="contained"
            classes={{ root: jnStyles.jnBT }}
            onClick={this.handleSubmit}
            sx={{ mt: 2 }}
          >
            Invia
          </Button>
          <Button
            variant="contained"
            classes={{ root: jnStyles.jnBT }}
            onClick={this.handleReset}
            sx={{ mt: 2 }}
          >
            Reset
          </Button>
          <DTC_DataGrid
            checkSelection={true}
            id={this.state.checkStudentiId}
            cols={this.props.data.cols}
            rows={this.props.data.rows}
            onChange={this.onChangeForm}
            onDelete={this.onDeleteRow}
            onNextStep={this.props.onNextStep}
            action={this.props.action}
            actionWidth={0}
            ref={this.changeChildGridId}
          />
          {/* <DCT_CheckList
            id={this.state.checkStudentiId}
            label={this.props.data.studenti_label}
            list={this.props.data.studenti}
            ref={this.changeChildCheckStudentiId}
            onChange={this.onChangeForm}
            size="65vh"
          /> */}
        </Box>
      </Box>
    );
  }
}

export default withRouter(FRM_Moni_Notify);
