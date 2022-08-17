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
      value: this.props.list[0],
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
    // console.log("COMBO VALUE CHANGE");
    // console.log(this.props.id);
    // console.log(value);
    this.setState({ value: value });
    this.props.onChange(this.props.id, value);
  }

  handleReset() {
    // console.log("RESET COMBO");
    this.setState({ value: this.props.list[0] });
  }

  setText(text) {
    // this.setState({ value: text });
    let selezione = this.props.list.findIndex((item) => item.label == text);
    if (selezione == -1) selezione = 0;
    this.setState({ value: this.props.list[selezione] });
    this.props.onChange(this.props.id, this.props.list[selezione]);
    // console.log("selezione", selezione);
  }

  setIndex(index) {
    // this.setState({ value: text });
    let selezione = this.props.list.findIndex((item) => item.id == index);
    if (selezione == -1) selezione = 0;
    this.setState({ value: this.props.list[selezione] });
    this.props.onChange(this.props.id, this.props.list[selezione]);
    // console.log("selezione", selezione);
  }

  render() {
    return (
      <FormControl
        sx={{ m: 0, p: 0, width: this.props.size }}
        classes={{ root: jnStyles.jnO2 }}
      >
        <StyledAutocomplete
          autoComplete={false}
          key={this.props.id}
          id={this.props.id}
          disableClearable
          onChange={this.handleValueChange}
          onInputChange={this.handleInputChange}
          options={this.props.list}
          value={this.state.value}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          classes={{
            inputRoot: jnStyles.jnComboInput,
            listbox: jnStyles.jnO2,
          }}
          // sx={{ width: this.props.size }}
          renderInput={(params) => (
            <TextField {...params} label={this.props.label} />
          )}
        />
      </FormControl>
    );
  }
}

export default DCT_ComboBox;
