import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import jnStyles from "../../../styles/utils.module.css";

const fsme_cfg = require("./config");

class SEC_ListNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.array ? this.props.array : [{ id: 0, text: "No items" }],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(event, classeId, lessonId) {
    const item = {
      id: this.props.id,
      classeId: classeId,
      lessonId: lessonId,
    };
    await this.props.onClick(event, item, fsme_cfg.FSME_STEP_1);
  }
  render() {
    // console.log(this.state.list);
    return (
      <>
        <List
          sx={{
            m: 0,
            py: 0,
            minWidth: { xs: 1, sm: 1, md: 370 },
            minHeight: 1,
          }}
          dense
          component="div"
          disablePadding
          classes={{
            root: this.props.classes,
          }}
        >
          {this.state.list.map((item, index) => (
            <ListItem key={item.idLezione} sx={{ px: 0, pt: 0, pb: 0, m: 0 }}>
              <ListItemText
                classes={{
                  primary:
                    item.idLezione == this.props.lezioneId
                      ? jnStyles.jnListTextSelect
                      : jnStyles.jnListText,
                }}
                primary={item.lezione}
                sx={{
                  m: 0,
                  px: 0,
                  py: 0,
                }}
              />
              {item.lezioneCompletata ? (
                <ListItemIcon
                  sx={{
                    color: "#ffffff",
                    justifyContent: "right",
                    p: 0,
                  }}
                  className="icon-checkmark"
                />
              ) : (
                <></>
              )}
              <ListItemIcon
                sx={{
                  cursor: "pointer",
                  color: "#ffffff",
                  justifyContent: "right",
                  p: 0,
                }}
                className="icon-arrow-right3"
                onClick={(event) =>
                  this.handleClick(event, this.props.classeId, item.idLezione)
                }
              />
            </ListItem>
          ))}
        </List>
      </>
    );
  }
}

export default SEC_ListNav;
