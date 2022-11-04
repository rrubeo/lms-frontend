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

import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import jnStyles from "../../../styles/utils.module.css";

const fs_cfg = require("./config");

class SEC_List_Person extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.listTitle ? this.props.listTitle : "Lista",
      list: this.props.array ? this.props.array : [{ id: 0, text: "No items" }],
    };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(event, item) {
    const data = {
      id: this.props.id,
      item: item,
    };
    // console.log(data);
    this.props.onClick(event, data);
  }

  render() {
    return (
      <>
        <FormLabel
          component="legend"
          classes={{
            root: jnStyles.jnDCT_TextSection,
          }}
          sx={{ width: "100%" }}
        >
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
            sx={{ m: 1, p: 1 }}
            dense
            component="div"
            disablePadding
            // classes={{
            //   root: jnStyles.jnDCT_Text_BorderSm,
            // }}
          >
            {this.state.list.map((item, index) => (
              <ListItem key={index} sx={{ paddingLeft: 0, paddingRight: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    alt="Profile"
                    src={fs_cfg.IMAGE_BASE_URL + item.imagePath}
                  >
                    {item.name.slice(0, 1) + item.surname.slice(0, 1)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  classes={{
                    primary: jnStyles.jnO2,
                  }}
                  primary={item.text}
                  sx={{
                    m: 0,
                    px: 5,
                  }}
                />
                <IconButton
                  id={index}
                  onClick={(event) => this.handleOnClick(event, item)}
                >
                  <span className="icon-calendar"></span>
                </IconButton>
              </ListItem>
            ))}
          </List>
        </FormLabel>
      </>
    );
  }
}

export default SEC_List_Person;
