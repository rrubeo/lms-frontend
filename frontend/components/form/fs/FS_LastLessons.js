import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import fsStyle from "../../../styles/Fs.module.css";
import jnStyles from "../../../styles/utils.module.css";

class FS_LastLessons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title ? this.props.title : null,
      list: this.props.array ? this.props.array : [],
      background: this.props.background ? this.props.background : null,
      elementNumber: this.props.elementNumber ? this.props.elementNumber : 0,
    };
  }

  render() {
    return (
      <Container disableGutters maxWidth="false">
        <Typography variant="h6" className={jnStyles.jnD1}>
          {this.state.title}
        </Typography>
        <List
          className={fsStyle.lessonsCard}
          sx={{ backgroundColor: this.state.background }}
          dense={true}
        >
          {this.state.list.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primaryTypographyProps={{
                  color: "#ffffff",
                  fontSize: "21pt",
                  fontWeight: "300",
                }}
                primary="Single-line item"
                secondaryTypographyProps={{
                  color: "#ffffff",
                  fontSize: "16pt",
                  fontWeight: "300",
                }}
                secondary={this.props.secondary ? "Secondary text" : null}
              />
            </ListItem>
          ))}
        </List>
      </Container>
    );
  }
}

export default FS_LastLessons;
