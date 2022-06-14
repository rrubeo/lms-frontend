import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import jnStyles from "../../styles/utils.module.css";
import { styled } from "@mui/material/styles";

const StyledAutocomplete = styled(Autocomplete)({
  "& .MuiInputLabel-root": {
    padding: 0,
    fontSize: "11pt",
    fontWeight: 800,
    transformOrigin: "10px 3px",
  },
  "& .MuiOutlinedInput-root": {
    padding: 0,
    paddingLeft: 12,
    boxShadow: "1px 1px 15px 1px rgba(0, 0, 0, 0.2)",
  },
});

class DCT_ComboBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.selection
        ? this.props.list[
            this.props.list.findIndex((item) => item.id == this.props.selection)
          ]
        : this.props.list[0],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {}

  handleInputChange(event, value) {
    // console.log("INPUT CHANGE");
  }

  handleValueChange(event, value) {
    this.setState({ value: value });
    this.props.onChange(this.props.id, value);
  }

  handleReset() {
    // console.log("RESET COMBO");
    this.setState({ value: this.props.list[0] });
  }

  render() {
    // console.log(
    //   `<DCT_ComboBox ='${this.props.id}'> (${this.state.value.id}) = ${this.state.value.label}`
    // );
    // if (this.props.selection) {
    //   console.log(this.props.list);
    //   console.log(
    //     this.props.list.findIndex((item) => item.id == this.props.selection)
    //   );
    // }

    return (
      <FormControl sx={{ m: 0, p: 0 }} classes={{ root: jnStyles.jnO2 }}>
        <StyledAutocomplete
          key={this.props.id}
          id={this.props.id}
          disableClearable
          value={this.state.value}
          onChange={this.handleValueChange}
          onInputChange={this.handleInputChange}
          options={this.props.list}
          classes={{
            inputRoot: jnStyles.jnComboInput,
            listbox: jnStyles.jnO2,
          }}
          sx={{ width: this.props.size }}
          renderInput={(params) => (
            <TextField {...params} label={this.props.label} />
          )}
        />
      </FormControl>
    );
  }
}

export default DCT_ComboBox;
