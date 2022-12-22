// import * as React from "react";
// import Talk from "talkjs";
// import Grid from "@mui/material/Grid";
// import Stack from "@mui/material/Stack";
// import FormLabel from "@mui/material/FormLabel";
// import FRM_Messaging from "./FRM_Messaging";
// import FRM_Contact from "./FRM_Contact";
// import jnStyles from "../../styles/utils.module.css";

// const chat_cfg = require("./config");

// class FRM_Network extends React.Component {
//   constructor(props) {
//     super(props);
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

//     this.handleClick = this.handleClick.bind(this);
//   }

//   handleClick(userId) {
//     /* Retrieve the two users that will participate in the conversation */
//     const { currentUser } = this.state;
//     const user = this.props.data.contatti.find((user) => user.id === userId);

//     /* Session initialization code */
//     Talk.ready
//       .then(() => {
//         /* Create the two users that will participate in the conversation */
//         const me = new Talk.User(currentUser);
//         const other = new Talk.User(user);

//         /* Create a talk session if this does not exist. Remember to replace tthe APP ID with the one on your dashboard */
//         if (!window.talkSession) {
//           window.talkSession = new Talk.Session({
//             appId: chat_cfg.TALK_JS_APP_ID,
//             me: me,
//           });
//         }

//         /* Get a conversation ID or create one */
//         const conversationId = Talk.oneOnOneId(me, other);
//         const conversation =
//           window.talkSession.getOrCreateConversation(conversationId);

//         /* Set participants of the conversations */
//         conversation.setParticipant(me);
//         conversation.setParticipant(other);

//         /* Create and mount chatbox in container */
//         // this.chatbox = window.talkSession.createChatbox(conversation);
//         // this.chatbox.mount(this.container);
//         this.chatbox = window.talkSession.createPopup();
//         this.chatbox.select(conversation);
//         this.chatbox.mount({ show: true });
//       })
//       .catch((e) => console.error(e));
//   }

//   render() {
//     const { currentUser } = this.state;
//     // console.log(currentUser);
//     console.log(this.props);
//     return (
//       <>
//         <Stack
//           direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
//           spacing={2}
//           mt={0}
//           mb={0}
//           p={0}
//           justifyContent="center"
//           alignItems="flex-start"
//         >
//           <FormLabel
//             component="legend"
//             classes={{
//               root: jnStyles.jnDCT_ChatContainer,
//             }}
//             sx={{
//               width: "100%",
//               overflow: "auto",
//               p: 0,
//               maxHeight: this.props.size,
//             }}
//           >
//             Contatti
//             <Grid
//               container
//               spacing={{ xs: "2", md: "8" }}
//               columns={{ xs: 1, sm: 1, md: 12 }}
//               justifyContent={{ xs: "center", md: "center" }}
//               direction="row"
//               alignItems="flex-start"
//             >
//               {this.props.data.contatti.map((user) => (
//                 <Grid item xs="auto">
//                   <FRM_Contact user={user} onClick={this.handleClick} />
//                 </Grid>
//               ))}
//             </Grid>
//           </FormLabel>
//           <FormLabel
//             component="legend"
//             classes={{
//               root: jnStyles.jnDCT_ChatContainer,
//             }}
//             sx={{
//               width: "100%",
//               overflow: "auto",
//               p: 0,
//             }}
//           >
//             Conversazioni
//             <FRM_Messaging userData={this.props.userData} />
//           </FormLabel>
//         </Stack>
//         {/* <div
//           className={jnStyles.jnChatboxContainer}
//           ref={(c) => (this.container = c)}
//         >
//           <div id="talkjs-container" style={{ height: "300px" }}>
//             <i></i>
//           </div>
//         </div> */}
//       </>
//     );
//   }
// }

// export default FRM_Network;
