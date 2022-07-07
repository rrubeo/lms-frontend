import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import jnStyles from "../../styles/utils.module.css";

const ITEM_HEIGHT = 58;
const ITEM_PADDING_TOP = 28;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class DCT_MultipleCheckList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listaElenco: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    // console.log(event.target);
    const {
      target: { value },
    } = event;
    // console.log(value);
    // console.log("preventDuplicate");
    const preventDuplicate = value.filter(
      (v, i, a) => a.findIndex((t) => t.id === v.id) === i
    );
    // console.log(preventDuplicate);
    // console.log("newList");
    const newList =
      typeof preventDuplicate === "string"
        ? preventDuplicate.split(",")
        : preventDuplicate;

    this.setState({
      listaElenco: newList,
    });

    this.props.onChange(this.props.id, newList);
  }

  handleReset() {
    // console.log("RESET MULTI");
    this.setState({
      listaElenco: [],
    });
    this.props.onChange(this.props.id, []);
  }

  render() {
    // console.log(
    //   // `<DCT_MultipleCheckList ='${this.props.id}'> (${this.state.listaElenco.length})`
    // );
    // console.log(this.state.listaElenco);
    return (
      <FormControl sx={{ m: 0, p: 0, width: this.props.size }}>
        <InputLabel
          variant="outlined"
          id={`${this.props.id}-label`}
          classes={{
            outlined: jnStyles.jnDCT_Multi_Input,
          }}
          sx={{ m: 0, p: 0 }}
        >
          {this.props.label}
        </InputLabel>
        <Select
          labelId={`${this.props.id}-label`}
          key={this.props.id}
          id={this.props.id}
          multiple
          value={this.state.listaElenco}
          onChange={this.handleChange}
          input={
            <OutlinedInput
              label={this.props.label}
              classes={{
                root: jnStyles.jnDCT_Text_Border,
                input: jnStyles.jnDCT_Text,
              }}
              sx={{ m: 0, p: 0 }}
            />
          }
          renderValue={(selected) => selected.map((x) => x.label).join(", ")}
          MenuProps={MenuProps}
          sx={{ m: 0, p: 0 }}
        >
          {this.props.list.map((name) => (
            <MenuItem key={name.id} value={name}>
              <Checkbox
                checked={
                  this.state.listaElenco.findIndex(
                    (item) => item.id === name.id
                  ) >= 0
                }
              />
              <ListItemText
                primary={name.label}
                classes={{
                  primary: jnStyles.jnO2,
                }}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

export default DCT_MultipleCheckList;
