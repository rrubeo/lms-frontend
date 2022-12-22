import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import jnStyles from "../../../styles/utils.module.css";

class SEC_List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.listTitle ? this.props.listTitle : "Lista",
      list: this.props.array ? this.props.array : [{ id: 0, text: "No items" }],
    };
  }

  render() {
    return (
      <List
        sx={{
          m: 0,
          p: 0,
          minHeight: "150px",
          minWidth: { xs: 1, sm: 1, md: 370 },
          display: { xs: "none", sm: "block", md: "block", lg: "block" },
        }}
        dense
        component="div"
        disablePadding
        classes={{
          root: this.props.classes,
        }}
      >
        {this.state.list.map((item, index) => (
          <ListItem key={item.id} sx={{ p: 0, m: 0 }}>
            <ListItemText
              classes={{
                primary: jnStyles.jnListTextHome,
              }}
              primary={item.text}
              sx={{
                m: 0,
                px: 0,
                py: 0,
              }}
            />
          </ListItem>
        ))}
      </List>
    );
  }
}

export default SEC_List;
