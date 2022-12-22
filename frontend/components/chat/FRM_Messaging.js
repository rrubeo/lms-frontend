// import * as React from "react";
// import Talk from "talkjs";

// import jnStyles from "../../styles/utils.module.css";

// const chat_cfg = require("./config");

// class FRM_Messaging extends React.Component {
//   constructor(props) {
//     super(props);
//     this.inbox = undefined;
//     let currentUser = {
//       id: this.props.userData.id,
//       name: this.props.userData.name,
//       email: this.props.userData.email,
//       description: this.props.userData.description,
//       role: this.props.userData.role,
//       photoUrl: this.props.userData.photoUrl,
//     };
//     // const currentTalkjsUser = localStorage.getItem("currentTalkjsUser");
//     // if (currentTalkjsUser) {
//     //   currentUser = JSON.parse(currentTalkjsUser);
//     // }

//     this.state = {
//       currentUser,
//     };
//   }
//   componentDidMount() {
//     Talk.ready
//       .then(() => {
//         const me = new Talk.User(this.state.currentUser);

//         if (!window.talkSession) {
//           window.talkSession = new Talk.Session({
//             appId: chat_cfg.TALK_JS_APP_ID,
//             me: me,
//           });
//         }

//         this.inbox = window.talkSession.createInbox();
//         this.inbox.mount(this.container);
//       })
//       .catch((e) => console.error(e));
//   }

//   render() {
//     return (
//       <div
//         style={{ height:"600px", width: "100%" ,padding:"12px"}}
//         className="inbox-container"
//         ref={(c) => (this.container = c)}
//       >
//         Loading...
//       </div>
//     );
//   }
// }

// export default FRM_Messaging;
