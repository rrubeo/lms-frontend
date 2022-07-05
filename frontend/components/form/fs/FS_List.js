import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from "@mui/material/ListItemText";
import Avatar from '@mui/material/Avatar';
import fsStyle from "../../../styles/Fs.module.css";
import jnStyles from "../../../styles/utils.module.css";

class FS_LastLessons extends React.Component {
  contenuto = '';
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
    if (this.props.type == 'text'){
      this.contenuto = this.state.list.map((item) =>
        <ListItem key={item.id}>
          <ListItemText
            primaryTypographyProps={{
              color: "#ffffff",
              fontSize: "21pt",
              fontWeight: "300",
            }}
            primary={item.name ? item.name : "Single-line item"}
            secondaryTypographyProps={{
              color: "#ffffff",
              fontSize: "16pt",
              fontWeight: "300",
            }}
            secondary={item.name ? item.name : "Secondary text"}
          />
        </ListItem>
      );
    } else {
      this.contenuto = this.state.list.map((item) =>
        <ListItem key={item.id}>
          <ListItemAvatar>
            <Avatar
              alt={`Avatar n°${item.id}`}
            />
          </ListItemAvatar>
          <ListItemText primary={`Line item ${item.id}`} />
        </ListItem>
      );
    }
    

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
          {this.contenuto}
        </List>
      </Container>
    );
  }
}

export default FS_LastLessons;
