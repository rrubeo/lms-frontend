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

class FS_List_Teacher extends React.Component {
  contenuto = '';
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title ? this.props.title : ' ',
      list: this.props.array ? this.props.array : [{name: "Nessuna lezione recente"}],
    };
  }

  render() {
    return (
      <Container disableGutters maxWidth="false">
        <Typography variant="h6" className={jnStyles.jnD1}>
          {this.state.title}
        </Typography>
        <List
          dense={true}
        >
        {
          this.state.list.map((item) =>
            <ListItem sx={{padding: 0}} key={item.idMateria}>
              <ListItemAvatar>
              <Avatar
                alt="Profile"
                src= {item.pathImmagineDocenteTutor}
                >{item.nomeDocenteTutor.slice(0, 1)+item.cognomeDocenteTutor.slice(0, 1)}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.idRuolo == 5 ? item.materia+" - "+item.nomeDocenteTutor+" "+item.cognomeDocenteTutor : item.nomeDocenteTutor+" "+item.cognomeDocenteTutor}/>
            </ListItem>
          )
        }
        </List>
      </Container>
    );
  }
}

export default FS_List_Teacher;
