import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import jnStyles from "../styles/utils.module.css";

class DTC_TextMultiline extends React.Component {
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

    this.setState({ value: value });
    this.props.onChange(this.props.id, value);
  }

  handleReset() {
    this.setState({ value: "" });
  }

  setText(text) {
    this.setState({ value: text });
  }

  render() {
    return (
      <FormControl sx={{ m: "0px", width: this.props.size, p: "0px" }}>
        <InputLabel
          required={this.props.required}
          autoFocus={this.props.autoFocus}
          variant="outlined"
          key={`${this.props.id}-label`}
          htmlFor={`${this.props.id}-label`}
          classes={{
            outlined: jnStyles.jnDCT_TextMultiLabel,
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
          value={this.state.value}
          label={this.props.label}
          onChange={this.handleValueChange}          
          classes={{
            multiline: jnStyles.jnDCT_TextMultiOutline,
            inputMultiline: jnStyles.jnDCT_TextMulti,
            notchedOutline: jnStyles.jnDCT_Notched,
          }}
        />
      </FormControl>
    );
  }
}

export default DTC_TextMultiline;
