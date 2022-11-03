import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import DTC_TextBox from "../../DTC_TextBox";
import jnStyles from "../../../styles/utils.module.css";

class SEC_Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentoId: "tx_cf",
      commentoValue: "...",
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleElimina = this.handleElimina.bind(this);
    this.handleConferma = this.handleConferma.bind(this);
    this.handleCommento = this.handleCommento.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.setText = this.setText.bind(this);

    this.changeCommentoId = React.createRef();
  }

  componentDidMount() {
    // console.log("componentDidMount");
    // console.log(this.changeCommentoId.current);
    // console.log(this);

    try {
      this.changeCommentoId.current.setText(this.state.commentoValue);
    } catch (error) {}
  }
  async onChangeForm(id, data) {
    switch (id) {
      case this.state.commentoId:
        this.setState({ commentoValue: data });
        break;
    }
  }

  handleClose() {
    // console.log(this.changeCommentoId);
    this.props.onClose();
  }

  handleCommento(event) {
    const data = {
      id: this.props.id,
      idAppuntamento: this.props.info?.event?.extendedProps?.idAppuntamento,
      conferma: true,
      commento: this.state.commentoValue,
    };
    this.props.onSubmit(event, data);
  }

  handleElimina(event) {
    const data = {
      id: this.props.id,
      idAppuntamento: this.props.info?.event?.extendedProps?.idAppuntamento,
      conferma: false,
      commento: this.props.info?.event?.extendedProps?.commento,
    };
    this.props.onSubmit(event, data);
  }

  handleConferma(event) {
    // console.log(this.props.info?.event?.extendedProps);
    const data = {
      id: this.props.id,
      idAppuntamento: this.props.info?.event?.extendedProps?.idAppuntamento,
      conferma: true,
      commento: this.props.info?.event?.extendedProps?.commento,
    };
    this.props.onSubmit(event, data);
  }

  setText(text) {
    if (!text || text == null) {
      text = "";
    }
    // console.log("setText", text);
    this.setState({ commentoValue: text });
    // this.changeCommentoId.current.setText(text);
    // console.log(this.changeCommentoId);
  }

  render() {
    // console.log("commentoValue", this.state.commentoValue);
    return (
      <Dialog
        onClose={this.handleClose}
        open={this.props.open}
        classes={{ paper: jnStyles.jnCheckRoot }}
      >
        <DialogTitle>{`${
          this.props.title ? this.props.title : ""
        }`}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ pb: "3%" }} id="alert-dialog-description">
            <span>{`${this.props.text ? this.props.text : ""}`}</span>
          </DialogContentText>
          {this.props.btCommenta == true ? (
            <DTC_TextBox
              id={this.state.commentoId}
              label="Commento"
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeCommentoId}
            />
          ) : (
            <></>
          )}
          <DialogActions>
            <Button onClick={this.handleClose}>
              {this.props.closeLabel ? this.props.closeLabel : "Chiudi"}
            </Button>
            {this.props.btCommenta == true ? (
              <Button onClick={this.handleCommento}>
                {this.props.commentaLabel
                  ? this.props.commentaLabel
                  : "Commento"}
              </Button>
            ) : (
              <></>
            )}
            {this.props.btConferma == true ? (
              <Button onClick={this.handleConferma}>
                {this.props.confermaLabel
                  ? this.props.confermaLabel
                  : "Conferma"}
              </Button>
            ) : (
              <></>
            )}
            {this.props.btElimina == true ? (
              <Button onClick={this.handleElimina}>
                {this.props.eliminaLabel ? this.props.eliminaLabel : "Elimina"}
              </Button>
            ) : (
              <></>
            )}
            {this.props.btPartecipa == true ? (
              <Button href={`${process.env.frontend}/videocall${this.props.linkPartecipa}`}>
                {this.props.partecipaLabel
                  ? this.props.partecipaLabel
                  : "Partecipa"}
              </Button>
            ) : (
              <></>
            )}
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }
}

export default SEC_Dialog;
