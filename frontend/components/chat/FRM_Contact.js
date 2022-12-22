import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import jnStyles from "../../styles/utils.module.css";
class FRM_Contact extends React.Component {
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
      <Card raised sx={{ minWidth: 250, maxWidth: 250, m: 0, p: 0 }}>
        <CardContent
          sx={{
            m: 0,
            p: 0,
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            mt={2}
            mx={1}
            p={0}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Avatar
              alt={`${this.props.user.name}`}
              src={`${process.env.cloudfiles}${this.props.user.photoUrl}`}
              size="md"
            />
            <Stack
              direction="column"
              spacing={0}
              mt={0}
              mb={0}
              p={0}
              justifyContent="center"
              alignItems="flex-start"
            >
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
              <Typography
                // noWrap
                component="span"
                variant="body2"
                classes={{
                  body2: jnStyles.jnAddressRole,
                }}
              >
                {this.props.user.role}
              </Typography>
              <Typography
                // noWrap
                component="span"
                variant="body2"
                classes={{
                  body2: jnStyles.jnAddressInfo,
                }}
              >
                {this.props.user.info}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            fullWidth
            size="small"
            variant="outlined"
            onClick={(event) => this.handleClick(event, this.props.user.id)}
          >
            Messaggio
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default FRM_Contact;
