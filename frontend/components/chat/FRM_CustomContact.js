import * as React from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import jnStyles from "../../styles/utils.module.css";
class FRM_CustomContact extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, userId) {
    // console.log(userId);
    this.props.onClick(userId);
  }

  render() {
    return (
      <Box
        sx={{
          border: 1,
          bgcolor: "#ffffff",
          borderRadius: "16px",
          borderColor: "#B34A9D",
          boxShadow: 3,
          display: "flex",
          flexWrap: "wrap",
          // flexGrow: 1,
          alignItems: "center",
          alignContent: "center",
          justifyContent: "space-between",
          m: 1,
          p: 1,
          minWidth: 290,
        }}
      >
        <Avatar
          alt={`${this.props.user.name}`}
          src={`${process.env.cloudfiles}${this.props.user.photoUrl}`}
          size="md"
        />

        <Typography
          // noWrap
          component="span"
          variant="body2"
          classes={{
            body2: jnStyles.jnAddressName,
          }}
        >
          {this.props.user.name}
        </Typography>
        <Fab
          component="div"
          size="small"
          sx={{ p: 0, m: 0, bgcolor: "#B34A9D", color: "#FFFFFF" }}
          onClick={(event) => this.handleClick(event, this.props.user.id)}
        >
          <ChatOutlinedIcon />
        </Fab>
      </Box>
    );
  }
}

export default FRM_CustomContact;
