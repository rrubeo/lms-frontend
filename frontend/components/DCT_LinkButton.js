import * as React from "react";

import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import jnStyles from "../styles/utils.module.css";

class DCT_LinkButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: this.props.href ? this.props.href : "#",
      text: this.props.text ? this.props.text : "Button",
    };
  }

  render() {
    return (
      <Link href={this.state.link} underline="none">
        <Button
          variant="contained"
          classes={{ root: jnStyles.jnBTLink }}
          size="small"
          sx={{ p: 1 }}
        >
          {this.state.text}
        </Button>
      </Link>
    );
  }
}

export default DCT_LinkButton;
