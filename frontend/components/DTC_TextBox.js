import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import jnStyles from "../styles/utils.module.css";
import { styled } from "@mui/material/styles";

class DTC_TextBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleValueChange(event) {
    const {
      target: { value },
    } = event;
    // console.log(value);
    this.setState({ value: value });
    this.props.onChange(this.props.id, value);
  }

  handleReset() {
    this.setState({ value: "" });
  }

  render() {
    // console.log(`<DTC_TextBox ='${this.props.id}'> (${this.state.value})`);
    return (
      <FormControl sx={{ m: "0px", width: this.props.size, p: "0px" }}>
        <InputLabel
          required={this.props.required}
          autoFocus={this.props.autoFocus}
          variant="outlined"
          key={`${this.props.id}-label`}
          htmlFor={`${this.props.id}-label`}
          classes={{
            outlined: jnStyles.jnDCT_Text_Input,
          }}
        >
          {this.props.label}
        </InputLabel>
        <OutlinedInput
          id={this.props.id}
          name={this.props.id}
          type={this.props.type ? this.props.type : "text"}
          value={this.state.value}
          label={this.props.label}
          onChange={this.handleValueChange}
          classes={{
            root: jnStyles.jnDCT_Text_Border,
            input: jnStyles.jnDCT_Text,
            notchedOutline: jnStyles.jnDCT_Notched,
          }}
        />
      </FormControl>
    );
  }
}

export default DTC_TextBox;
