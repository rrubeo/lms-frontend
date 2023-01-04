const TALK_JS_APP_ID = process.env.TALK_JS_APP_ID;
const CHAT_STEP_0 = "network";
const FRM_CHAT_STEP_0 = "FRM_Network";

const CHAT_STEP_0_API = `${process.env.server}/chat`;
const CHAT_STEP_1_API = `${process.env.server}/chat/conversation`;
const CHAT_STEP_2_API = `${process.env.server}/chat/readall`;

const dummyUsers = [
  {
    id: "2",
    name: "Kelvin Samson",
    email: "kelvin@sample.com",
    photoUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "Member",
    info: "Product Designer at Facebook   sd ADSAS Dsads dD",
    welcomeMessage: "Hey there! Love to chat :-)",
  },
  {
    id: "3",
    name: "Annabel Stone",
    email: "annie@sample.com",
    photoUrl: "https://randomuser.me/api/portraits/women/65.jpg",
    role: "Member",
    info: "Digital Marketer at Microsoft",
    welcomeMessage: "Hey there! Love to chat :-)",
  },
  {
    id: "4",
    name: "Grace Loveday",
    email: "grace@sample.com",
    photoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    role: "Member",
    info: "Product Designer at Google",
    welcomeMessage: "Hey there! Love to chat :-)",
  },
  {
    id: "5",
    name: "Angela Jobs",
    email: "angela@sample.com",
    photoUrl:
      "https://pbs.twimg.com/profile_images/834493671785525249/XdLjsJX_.jpg",
    role: "Member",
    info: "Software Engineer at TalkJS",
    welcomeMessage: "Hey there! Love to chat :-)",
  },
  {
    id: "6",
    name: "Kelvin Samson",
    email: "kelvin@sample.com",
    photoUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "Member",
    info: "Product Designer at Facebook",
    welcomeMessage: "Hey there! Love to chat :-)",
  },
  {
    id: "7",
    name: "Annabel Stone",
    email: "annie@sample.com",
    photoUrl: "https://randomuser.me/api/portraits/women/65.jpg",
    role: "Member",
    info: "Digital Marketer at Microsoft",
    welcomeMessage: "Hey there! Love to chat :-)",
  },
  {
    id: "8",
    name: "Grace Loveday",
    email: "grace@sample.com",
    photoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    role: "Member",
    info: "Product Designer at Google",
    welcomeMessage: "Hey there! Love to chat :-)",
  },
  {
    id: "9",
    name: "Angela Jobs",
    email: "angela@sample.com",
    photoUrl:
      "https://pbs.twimg.com/profile_images/834493671785525249/XdLjsJX_.jpg",
    role: "Member",
    info: "Software Engineer at TalkJS",
    welcomeMessage: "Hey there! Love to chat :-)",
  },
];

function getApiUrl(query) {
  const page = query.param[0];
  let apiUrl = "";
  switch (page) {
    case CHAT_STEP_0:
      apiUrl = CHAT_STEP_0_API;
      break;
  }

  let param = "";
  for (let i = 1; i < query.param.length; i++) {
    param = param + "/" + query.param[i];
  }

  apiUrl = apiUrl + param;

  return apiUrl;
}

module.exports = {
  TALK_JS_APP_ID,
  getApiUrl,
  CHAT_STEP_0,
  FRM_CHAT_STEP_0,
  dummyUsers,
  CHAT_STEP_1_API,
  CHAT_STEP_2_API,
};
