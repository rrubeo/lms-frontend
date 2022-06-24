import * as React from "react";

import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import jnStyles from "../styles/utils.module.css";

class DCT_Breadcrumbs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { listaBread: this.props.list ? this.props.list : [] };
  }

  render() {
    console
      .log
      // `<DCT_Breadcrumbs ='${this.props.id}'> (${this.state.listaBread.length})`
      ();
    return (
      <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 0, mb: 2 }}>
        {this.state.listaBread.map((item, index) => (
          <Typography
            key={item.key}
            variant="body2"
            classes={{
              body2: jnStyles.jnO2,
            }}
            color="text.primary"
          >
            {item.text}
          </Typography>
        ))}
      </Breadcrumbs>
    );
  }
}

export default DCT_Breadcrumbs;
