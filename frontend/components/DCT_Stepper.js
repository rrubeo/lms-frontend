import * as React from "react";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import jnStyles from "../styles/utils.module.css";
import { styled } from "@mui/material/styles";

const StyledStepper = styled(Stepper)({
  "& .MuiStepIcon-root.Mui-active": {
    color: "#B34A9D",
  },
});
class DCT_Stepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <StyledStepper
        activeStep={this.props.activeStep}
        alternativeLabel
        sx={{ width: "100%" }}
      >
        {this.props.steps.map((label) => (
          <Step key={label}>
            <StepLabel
              StepIconProps={{
                classes: {
                  root: jnStyles.jnE2,
                  active: jnStyles.jnE1,
                  completed: jnStyles.jnE2,
                },
              }}
              classes={{ label: jnStyles.jnN8 }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </StyledStepper>
    );
  }
}

export default DCT_Stepper;
