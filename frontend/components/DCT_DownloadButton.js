import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import PictureAsPdf from "@mui/icons-material/PictureAsPdf";
import IconButton from "@mui/material/IconButton";
class DCT_DownloadButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(event, path, mode) {
    window.open(path, "page");
  }

  render() {
    return (
      <IconButton
        id={this.props.id}
        onClick={(event) =>
          this.handleOnClick(event, this.props.src, this.props.mode)
        }
      >
        <span className={this.props.img}></span>
      </IconButton>
    );
  }
}

export default DCT_DownloadButton;
