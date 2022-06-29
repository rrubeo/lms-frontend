import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import fsStyle from "../../../styles/Fs.module.css";
import jnStyles from "../../../styles/utils.module.css";

class FS_ProfileStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: 60,
      title: this.props.title,
    };
  }

  render() {
    return (
      <Box className={fsStyle.progressContentContainer}>
        <Box className={fsStyle.progressContainer}>
          <CircularProgress
            className={fsStyle.progressEmpty}
            variant="determinate"
            size={150}
            value={100}
          />
          <CircularProgress
            className={fsStyle.progressFull}
            variant="determinate"
            size={150}
            value={this.state.percentage}
          />
          <Box className={fsStyle.progressPercentage}>
            <Typography className={jnStyles.jnC1} variant="h6">
              {`${Math.round(parseInt(this.props.percentage))}%`}
            </Typography>
          </Box>
        </Box>
        <Box className={fsStyle.progressTitleContainer}>
          <Typography className={jnStyles.jnD6}>{this.state.title}</Typography>
        </Box>
      </Box>
    );
  }
}

export default FS_ProfileStudent;
