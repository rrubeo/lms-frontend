import * as React from "react";
import BottomNavigation from '@mui/material/BottomNavigation';
import Button from '@mui/material/Button';
import jnStyles from "../../../styles/utils.module.css";

class FS_Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BottomNavigation
        sx={{justifyContent: 'right', alignItems: 'center'}}
      >
        <Button sx={{height: '35px', minWidth: '180px', marginRight: '15px'}} variant="outlined" classes={{ root: jnStyles.jnBTPink }}>Inizia esercitazione</Button>
        <Button onClick={event => this.props.onClickNext(event, this.props.array, this.props.index)} sx={{height: '35px', minWidth: '180px'}} variant="contained" classes={{ root: jnStyles.jnBT }}>Prossima lezione</Button>
      </BottomNavigation>
    );
  }
}

export default FS_Footer;
