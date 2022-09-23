import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import fsStyle from "../../../styles/Fs.module.css";
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
      <>
        <Typography
          elevation={1}
          align="center"
          noWrap={true}
          variant="body2"
          classes={{
            body2: jnStyles.jnA1,
          }}
        >
          {this.state.title}
        </Typography>
        <List
          sx={{ m: 1, p: 1, bgcolor: "#B34A9D" }}
          dense
          component="div"
          disablePadding
          classes={{
            root: jnStyles.jnDCT_Text_BorderSm,
          }}
        >
          {this.state.list.map((item, index) => (
            <ListItem key={item.id} sx={{ paddingLeft: 0, paddingRight: 0 }}>
              <ListItemText
                classes={{
                  primary: jnStyles.jnO2sm,
                }}
                primary={item.text}
                sx={{
                  m: 0,
                  px: 5,
                }}
              />
            </ListItem>
          ))}
        </List>
      </>
    );
  }
}

export default SEC_List;
