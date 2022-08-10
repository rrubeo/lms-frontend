import * as React from "react";
import FormControl from "@mui/material/FormControl";
import jnStyles from "../styles/utils.module.css";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";

class DTC_DatePick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Date(),
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleValueChange(newValue) {
    // console.log(newValue);
    const str_date = newValue.format("YYYY-MM-DD");
    this.setState({ value: newValue });
    this.props.onChange(this.props.id, str_date);
  }

  handleReset() {
    this.setState({ value: new Date() });
  }

  setText(text) {
    // console.log(text);
    let ms = Date.parse(text);
    // console.log(new Date(ms));
    this.setState({ value: ms });
  }

  render() {
    return (
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <FormControl sx={{ m: "0px", width: this.props.size, p: "0px" }}>
          <DatePicker
            id={this.props.id}
            disableFuture
            openTo="year"
            views={["year", "month", "day"]}
            label={this.props.label}
            inputFormat="DD/MM/yyyy"
            value={this.state.value}
            onChange={this.handleValueChange}
            renderInput={(params) => (
              <TextField
                variant="outlined"
                required
                InputLabelProps={{
                  shrink: true,
                  classes: {
                    root: jnStyles.jnDCT_Date_Label,
                  },
                }}
                {...params}
                inputProps={{
                  ...params.inputProps,
                  placeholder: "dd/mm/aaaa",
                }}
              />
            )}
            InputProps={{
              classes: {
                root: jnStyles.jnDCT_Date_Border,
                input: jnStyles.jnDCT_Date_Text,
                notchedOutline: jnStyles.jnDCT_Notched,
              },
            }}
          />
        </FormControl>
      </LocalizationProvider>
    );
  }
}

export default DTC_DatePick;
