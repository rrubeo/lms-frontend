import * as React from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import jnStyles from "../styles/utils.module.css";
import { styled } from "@mui/material/styles";

class DTC_TextInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  render() {
    // console.log(`<DTC_TextBox ='${this.props.id}'> (${this.state.value})`);
    return (
      <FormControl sx={{ m: "0px", width: this.props.size, p: "0px" }}>
        <InputLabel
          variant="outlined"
          key={`${this.props.id}-label`}
          htmlFor={`${this.props.id}-label`}
          classes={{
            outlined: jnStyles.jnDCT_TextInfoLabel,
          }}
          shrink={true}
        >
          {this.props.label}
        </InputLabel>
        <OutlinedInput
          multiline
          notched={true}
          id={this.props.id}
          name={this.props.id}
          type="text"
          label={this.props.label}
          inputProps={{
            readOnly: true,
          }}
          value={this.props.value}
          classes={{
            multiline: jnStyles.jnDCT_TextInfoOutline,
            inputMultiline: jnStyles.jnDCT_TextInfo,
            notchedOutline: jnStyles.jnDCT_Notched,
          }}
        />
      </FormControl>
    );
  }
}

export default DTC_TextInfo;
