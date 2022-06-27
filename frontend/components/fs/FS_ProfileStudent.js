import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import fsStyle from '../../styles/Fs.module.css';


class FS_ProfileStudent extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <Grid container className={fsStyle.profileStudentBalloon}>
          <Grid item className={fsStyle.profileStudentAvatarContainer}>
            <Avatar className={fsStyle.profileStudentAvatar} alt='Jack Sparrow' src='https://images.pexels.com/photos/6386956/pexels-photo-6386956.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'></Avatar>
          </Grid>
          <Grid item>
            <Typography className={fsStyle.profileStudentName} variant='h3'>Alessio Cecchetti</Typography>  
            <Typography className={fsStyle.profileStudentRole} variant='h4'>Studente</Typography>  
            <Typography className={fsStyle.profileStudentCredit} variant='p'>40 crediti</Typography>  
          </Grid>
        </Grid>
      );
    }
  }
  
  export default FS_ProfileStudent;