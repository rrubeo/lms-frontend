import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import jnStyles from "../../styles/utils.module.css";

class DCT_CheckList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listaElenco: this.props.list,
      checked: [0],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleAddAll = this.handleAddAll.bind(this);
  }

  handleChange(event) {}

  handleToggle(event, value) {
    event.preventDefault();
    const currentIndex = this.state.checked.indexOf(value);
    const newChecked = [...this.state.checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    this.setState({
      checked: newChecked,
    });

    this.props.onChange(this.props.id, newChecked);
  }

  handleReset() {
    this.setState({
      checked: [0],
    });
    this.props.onChange(this.props.id, [0]);
  }

  handleAddAll() {
    // console.log("ADD ALL");
    const newChecked = this.state.listaElenco.map((item) => {
      return item.id;
    });
    // console.log(newChecked);
    this.setState({
      checked: newChecked,
    });

    this.props.onChange(this.props.id, newChecked);
  }

  render() {
    // console.log(
    //   `<DCT_CheckList ='${this.props.id}'> (${this.state.listaElenco.length})`
    // );
    return (
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          overflow: "auto",
          maxHeight: 300,
        }}
      >
        {this.state.listaElenco.map((value) => {
          const labelId = `checkbox-list-label-${value.id}`;
          return (
            <ListItem key={value.id} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={(event) => this.handleToggle(event, value.id)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={this.state.checked.indexOf(value.id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={value.label}
                  classes={{
                    primary: jnStyles.jnO2,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    );
  }
}

export default DCT_CheckList;
