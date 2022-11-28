import * as React from "react";
import Button from "@mui/material/Button";
import jnStyles from "../../../styles/utils.module.css";

const AxiosMgr = require("../../../lib/fAxios");
const FormData = require("form-data");
class SEC_MathLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.data.length > 0 ? this.props.data[0].mail : "email",
      firstname:
        this.props.data.length > 0 ? this.props.data[0].nome : "firstname",
      lastname:
        this.props.data.length > 0 ? this.props.data[0].cognome : "lastname",
      username:
        this.props.data.length > 0
          ? this.props.data[0].userName.toLowerCase()
          : "username",
      token: this.props.userInfo.token,
      userId: this.props.userInfo.login,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    const siteUrl = "https://courses.youcanmath.com/sync-janus.php";

    const formData = new FormData();
    formData.append("email", "stud1@istjanus.it");
    formData.append("firstname", "studente");
    formData.append("lastname", "uno");
    formData.append("username", "studente1");
    formData.append(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InJvbW9sbyIsIm5iZiI6MTY2OTYzNDQzMCwiZXhwIjoxNjY5NjcwNDMwLCJpYXQiOjE2Njk2MzQ0MzB9.urqEuNi5fSTBY9UGwBGtZWaBcahP2I3-Y_eUHal_AyI"
    );
    formData.append("userId", "romolo");
    console.log(formData.get("token"));
    const res = await AxiosMgr.formDataAxios(siteUrl, formData);
    console.log(res);
  }

  render() {
    // console.log(this.props);
    return (
      <>
        <div>
          <form
            action="https://courses.youcanmath.com/sync-janus.php"
            method="post"
            target="_self"
          >
            <input
              type={this.props.type}
              id="email"
              name="email"
              defaultValue={this.state.email}
            />
            <input
              type={this.props.type}
              id="firstname"
              name="firstname"
              defaultValue={this.state.firstname}
            />
            <input
              type={this.props.type}
              id="lastname"
              name="lastname"
              defaultValue={this.state.lastname}
            />
            <input
              type={this.props.type}
              id="username"
              name="username"
              defaultValue={this.state.username}
            />
            <input
              type={this.props.type}
              id="token"
              name="token"
              defaultValue={this.state.token}
            />
            <input
              type={this.props.type}
              id="userId"
              name="userId"
              defaultValue={this.state.userId}
            />
            <Button
              type="submit"
              variant="contained"
              classes={{ root: jnStyles.jnBT }}
            >
              Lezioni di matematica
            </Button>
          </form>
        </div>
        {/* <Button variant="contained" onClick={this.handleSubmit}>
          LEZIONI DI MATEMATICA
        </Button> */}
      </>
    );
  }
}

export default SEC_MathLogin;
