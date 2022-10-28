import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Image } from '@nextui-org/react';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box from "@mui/material/Box";
import fsStyle from "../../../styles/Fs.module.css";
import jnStyles from "../../../styles/utils.module.css";

class FS_List extends React.Component {
  contenuto = "";
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title ? this.props.title : " ",
      list: this.props.array
        ? this.props.array
        : [{ name: "Nessuna lezione recente" }],
      background: this.props.background ? this.props.background : null,
      padding: this.props.type == "avatar" ? "0!important" : null,
      arg: this.props.arg ? this.props.arg : null,
      width: this.props.width ? this.props.width : 1,
      showImage: this.props.showImage ? this.props.showImage : false,
      imageLink: this.props.imageLink ? this.props.imageLink : ""
    };
  }

  handleListItemClick = function (item) {
    console.log(item)
    window.location.href = item.linkUrl
  };

  handleListItemCalendarClick = function (item) {
    console.log(item)
    //TODO: fare controllo crediti utente tramite API
    // 
    window.location.href = this.state.imageLink+"&username="+item.username
  };

  render() {
    const queryParams = new URLSearchParams(window.location.search);
    const lessonId = queryParams.get("lezione");

    function getPrimaryPropsCSS(itemId) {
      if (lessonId == itemId) {
        return {
          display: "inline-block",
          color: "#ffffff",
          fontSize: "14pt",
          fontWeight: "500",
        };
      } else {
        return {
          display: "inline-block",
          color: "#ffffff",
          fontSize: "13pt",
          fontWeight: "300",
        };
      }
    }

    return (
      // <Container disableGutters>
      <Box
        component="div"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          width: { xs: 1, sm: 1, md: 1, lg: this.state.width },
        }}
      >
        <Typography variant="h6" className={jnStyles.jnD1}>
          {this.state.title}
        </Typography>
        <List
          className={fsStyle.lessonsCard}
          sx={{
            backgroundColor: this.state.background,
            paddingLeft: this.state.padding,
            paddingRight: this.state.padding,
            minHeight: this.props.height,
            maxHeight: this.props.height,
          }}
          dense={true}
        >
          {this.props.type == "text"
            ? this.state.list.map((item) => (

              <ListItem
                  key={item.id}
                  sx={{ paddingLeft: 0, paddingRight: 0 }}

                  onClick={() => this.handleListItemClick(item)}
                >              

                  <ListItemText
                    primaryTypographyProps={getPrimaryPropsCSS(item.id)}
                    primary={item.name ? item.name : "Single-line item"}
                  />                               
                  {this.props.clickable ? (
                    <ListItemIcon
                      sx={{
                        cursor: "pointer",
                        color: "#ffffff",
                        justifyContent: "right",
                      }}
                      className="icon-arrow-right3"
                      onClick={(event) =>
                        this.props.onClickFunction(
                          this.props.clickable,
                          this.state.arg,
                          item.id
                        )
                      }
                    />
                  ) : (
                    <ListItemIcon />
                  )}
                </ListItem>
              ))
            : this.state.list.map((item) => (
                <ListItem
                  sx={{ padding: "0", marginBottom: "3%" }}
                  key={item.id}
                >
                  <ListItemAvatar>
                    <Avatar alt="Profile" src={item.imagePath}>
                      {item.name.slice(0, 1) + item.surname.slice(0, 1)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      item.roleId == 5
                        ? item.subject + " - " + item.name + " " + item.surname
                        : item.name + " " + item.surname
                    }
                  />
                  {this.state.showImage ? (
                    <Image 
                      priority="true"
                      src="/images/janus_calendar.png"
                      alt="Prenota appuntamento"
                      width="30px"
                      height="30px"
                      layout="intrinsic"
                      onClick={() => this.handleListItemCalendarClick(item)}
                      style={{cursor: 'pointer'}}
                    />
                  ): (
                    <Image />
                  )}

                </ListItem>
              ))}
        </List>
      </Box>
      // {/* </Container> */}
    );
  }
}

export default FS_List;
