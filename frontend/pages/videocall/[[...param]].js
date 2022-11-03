import React from "react";
import useSWR, { useSWRConfig, SWRConfig } from "swr";
import Loader from "../../components/layout/loader";
import Wip from "../../components/layout/wip";
import DCT_Layout from "../../components/layout/DCT_Layout";
import Container from "@mui/material/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";
import jnStyles from "../../styles/utils.module.css";
import Grid from "@mui/material/Grid";
import useUser from "../../lib/useUser";
import { PAGE_401 } from "../../lib/redirect";

import {
  defaultLogin,
  sessionOptions,
  getAuthSession,
  MSG_SUCCESS,
  MSG_ERROR,
  MSG_INFO,
  forceNavigateUtil,
} from "../../lib";

import { withIronSessionSsr } from "iron-session/next";

import { JaaSMeeting } from '@jitsi/react-sdk';

const utils = require("../../lib/utils");
const call_cfg = require("../../components/form/videocall/config");
const JAAS_ID = process.env.JAAS_ID;
const JAAS_PK = process.env.JAAS_PRIVATE_KEY;
const JAAS_APP_KEY = process.env.JAAS_APP_KEY

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
  query,
}) {
  //console.dir(query);
  let fallback = {
    authenticated: false,
    userInfo: defaultLogin,
  };

  const authSession = await getAuthSession(req);
  if (!authSession) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return {
      props: {
        fallback: fallback,
      },
    };
  }

  // var roomIdParam = "0";
  // if (typeof query.param !== undefined){
  //   // roomIdParam =  query.param[0]
  //   console.log("OK");
  // };


  // console.log(roomIdParam);

  fallback.pageName = "home";
  fallback.authenticated = true;
  fallback.userInfo = authSession;
  fallback.pageQuery = query;
  fallback.apiUrl =
    call_cfg.CALL_API +
    "?roomId=" + 
    query.param[0];


  return {
    props: {
      fallback: fallback,
    },
  };
},
sessionOptions);

function Main() {
  const { user } = useUser({
    redirectTo: PAGE_401,
  });
  //Recupera info utente
  const { fallback, mutate } = useSWRConfig();
  const { userInfo, pageName, apiUrl, pageQuery, subIndex } = fallback;

  let { data, error } = useSWR(apiUrl, utils.getData);

  if (error) return <div>{error.message}</div>;
  if (!data) return <Loader id="tu" />;
  if (data.status != 200) return <Wip>{data.message}</Wip>;

  const reloadData = async () => {
    const options = {
      revalidate: true,
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    };
    await mutate(apiUrl, utils.getData(apiUrl), options);
  };
  
  console.log(apiUrl);
  console.log(data);
  console.log(fallback.pageQuery);

  var jsonwebtoken = require('jsonwebtoken');
  var roomId = data.appuntamento.appuRoomID;

  const generate = (privateKey, { id, name, email, avatar, appId, kid }) => {
    // console.log(privateKey);
    const now = new Date()
    const jwt = jsonwebtoken.sign({
      aud: 'jitsi',
      context: {
        user: {
          id,
          name,
          avatar,
          email: email,
          moderator: 'false'
        },
        features: {
          livestreaming: 'false',
          recording: 'false',
          transcription: 'false',
          "outbound-call": 'false'
        }
      },
      iss: 'chat',
      room: '*',
      sub: appId,
      exp: Math.round(now.setHours(now.getHours() + 3) / 1000),
      nbf: (Math.round((new Date).getTime() / 1000) - 10)
    }, privateKey, { algorithm: 'RS256', header: { kid } })
    return jwt;
  }

  const token = generate(JAAS_PK, {
    id: roomId,
    name: userInfo.login,
    email: "email",
    avatar: "avatar",
    appId: JAAS_ID, 
    kid: JAAS_APP_KEY
  });

  console.log(token);

  const validRoomId = data.appuntamento.appuId != null;
  var activeRoom =false;
  var validUser = false;
  if (validRoomId){
    activeRoom = (new Date() >=new Date(data.appuntamento.appuDataInizioAppuntamento) && new Date()<=new Date(data.appuntamento.appuDataFineAppuntamento));
  }
  if (activeRoom){
    validUser = (userInfo.login.toUpperCase() === data.appuntamento.appuFkUtntRichiedente.toUpperCase() || userInfo.login.toUpperCase() === data.appuntamento.appuFkUtntRichiesta.toUpperCase())
  }

  console.log(validRoomId);
  console.log(activeRoom);
  console.log(validUser);

  return (
    <DCT_Layout id="Layout" data={data} user={user}>
      <Container disableGutters maxWidth="false">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h3" className={jnStyles.jnA1}>
              
                 {validRoomId && activeRoom && validUser ? data.appuntamento.appuTitolo : ''}
              
            </Typography>
          </Grid>
      </Container>
      <Container disableGutters maxWidth="false">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            {validRoomId && activeRoom && validUser ? (
            <JaaSMeeting
              getIFrameRef = { iframeRef => { iframeRef.style.height = '700px'; } }
              appId = { JAAS_ID }
              roomName = {data.appuntamento.appuTitolo}
              jwt = { token }
              configOverwrite = {{
                  disableThirdPartyRequests: true,
                  disableLocalVideoFlip: true,
                  backgroundAlpha: 0.5,
                  prejoinPageEnabled: true,
                  disableModeratorIndicator: true,
                  enableEmailInStats: false
                
              }}
              interfaceConfigOverwrite = {{
                  VIDEO_LAYOUT_FIT: 'nocrop',
                  MOBILE_APP_PROMO: false,
                  TILE_VIEW_MAX_COLUMNS: 4,
                  ADD_PEOPLE_ENABLED: false,
                  IDE_INVITE_MORE_HEADER: false,
                  TOOLBAR_BUTTONS: [
                        'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                        'fodeviceselection', 'hangup', 'profile', 'chat', 
                        'etherpad', 'settings', 'raisehand',
                        'videoquality', 'stats', 'shortcuts',
                        'tileview'
                    ]
              
              }}

              
              // spinner = { SpinnerView }
              moderator= {false}
            />) : (
              <Typography variant="h3" className={jnStyles.jnA1}>
              
                {!validRoomId ? 'Videocall non valida' : ''}
                <><br></br></>
                {validRoomId && !activeRoom ? 'Fuori orario appuntamento' : ''}
                <><br></br></>
                {validRoomId && activeRoom && !validUser ? 'Utente non abilitato' : ''}

            </Typography>
            )}
          </Grid>      
      </Container>
    
    </DCT_Layout>
  );
}

export default function Home({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Main />
    </SWRConfig>
  );
}
