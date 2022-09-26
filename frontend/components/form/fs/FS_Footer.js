import * as React from "react";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import fsStyle from "../../../styles/Fs.module.css";

class FS_Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BottomNavigation
        classes={{ root: fsStyle.footerContainer}}
        showLabels
      >
        {/* <BottomNavigationAction sx={{height: '35px', minWidth: '180px', marginRight: '15px'}} classes={{ root: fsStyle.footerButton, label: fsStyle.footerLabel }} label="Inizia esercitazione"/> */}
        {/* <BottomNavigationAction onClick={event => this.props.onClickNext(this.props.array, this.props.index)} sx={{height: '35px', minWidth: '180px'}} classes={{ root: fsStyle.footerButtonFull, label: fsStyle.footerLabel }} label="Lezioni di matematica"/> */}
        {/* <BottomNavigationAction onClick={event => window.open("https://courses.youcanmath.com/login/index.php", '_blank').focus() } sx={{height: '35px', minWidth: '180px'}} classes={{ root: fsStyle.footerButtonFull, label: fsStyle.footerLabel }} label="Lezioni di matematica"/> */}
      </BottomNavigation>
    );
  }
}

export default FS_Footer;
