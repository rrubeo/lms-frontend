import * as React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import jnStyles from "../styles/utils.module.css";

class DCT_Breadcrumbs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listaBread: this.props.list ? this.props.list : [],
      page: this.props.page ? this.props.page : [],
      pageId: this.props.pageId ? this.props.pageId : [],
      path: this.props.path ? this.props.path : "",
      navigable: false,
      listaNav: [],
    };
    this.navBread = this.navBread.bind(this);
  }

  navBread() {
    console.log("listaBread", this.state.listaBread.length);
    console.log(this.state.listaBread);
    console.log("page", this.state.page.length);
    console.log(this.state.page);
    console.log("pageId", this.state.pageId.length);
    console.log(this.state.pageId);

    const listaNav = this.state.listaBread.map((item, index) => {
      let pathOver = "";
      for (let i = 0; i <= index; i++) {
        pathOver += "/" + this.state.pageId[i];
      }

      item.page = this.state.path + "/" + this.state.page[index] + pathOver;
      return item;
    });
    console.log(listaNav);
  }

  render() {
    // this.navBread();
    return (
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mt: 0, mb: 2 }}
        separator={<NavigateNextIcon fontSize="small" />}
      >
        {this.state.navigable
          ? this.state.listaBread.map((item, index) => (
              <Link
                className={jnStyles.jnO2grey}
                underline="hover"
                key="1"
                href={item.page}
              >
                {item.text}
              </Link>
            ))
          : this.state.listaBread.map((item, index) => (
              <Typography
                key={item.key}
                variant="body2"
                classes={{
                  body2: jnStyles.jnO2grey,
                }}
                sx={{ m: 0, p: 0 }}
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
