import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";

import jnStyles from "../styles/utils.module.css";

class DCT_Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClose = this.handleClose.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }

  handleClose() {
    this.props.onClose();
  }

  handleOk() {
    this.props.onOk();
  }

  render() {
    return (
      <Dialog
        onClose={this.handleClose}
        open={this.props.open}
        classes={{ paper: jnStyles.jnCheckRoot }}
      >
        <DialogTitle>{`${this.props.title}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span>{`${this.props.text}`} </span>
          </DialogContentText>
          <DialogActions>
            <Button
              // variant="contained"
              // classes={{ root: jnStyles.jnBT }}
              onClick={this.handleClose}
            >
              {this.props.closeLabel ? this.props.closeLabel : "Chiudi"}
            </Button>
            <Button
              // variant="contained"
              //   href={evento?.event?.extendedProps?.linkStanza}
              // classes={{ root: jnStyles.jnBT }}
              onClick={this.handleOk}
            >
              {this.props.okLabel ? this.props.okLabel : "OK"}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }
}

export default DCT_Dialog;
