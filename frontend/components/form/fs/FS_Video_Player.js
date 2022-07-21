import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ReactPlayer from "react-player";
import jnStyles from "../../../styles/utils.module.css";

class FS_Video_Player extends React.Component {
  contenuto = '';
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title ? this.props.title : ' ',
      url: this.props.url ? this.props.url : ' ',
      list: this.props.array ? this.props.array : [{name: "Nessuna lezione recente"}],
      background: this.props.background ? this.props.background : null,
      padding: this.props.type == "avatar" ? '0!important' : null
    };
  }

  render() {
    return (
      <Container disableGutters maxWidth="false">
        <Typography variant="h6" className={jnStyles.jnD1} sx={{paddingLeft: '20px'}}>
          {this.state.title}
        </Typography>
        <ReactPlayer
          url={"https://vimeo.com/"+this.state.url}
          controls={true}
          width={'100%'}
        />
      </Container>
    );
  }
}

export default FS_Video_Player;
