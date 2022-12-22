import * as React from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SEC_StudenteLezioniSingle from "./SEC_StudenteLezioniSingle";
import Divider from "@mui/material/Divider";
import jnStyles from "../../../styles/utils.module.css";

const fsme_cfg = require("./config");

class SEC_StudenteLezioniDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // console.log(this.props);
    return (
      <Container
        disableGutters
        maxWidth="false"
        sx={{ width: "100%", maxHeight: 450, overflow: "auto" }}
        classes={{
          root: jnStyles.jnListLezioni,
        }}
      >
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
          my={2}
          mx={2}
          p={0}
        >
          {this.props.lezioni.map((item, index) => (
            <React.Fragment key={item.lezioniStudenteClasse.id}>
              <Typography
                variant="body2"
                classes={{
                  body2: jnStyles.jnA1DescArgomento,
                }}
                sx={{ m: 0, p: 0 }}
              >
                {item.lezioniStudenteClasse.descr}
              </Typography>
              <SEC_StudenteLezioniSingle
                id={item.lezioniStudenteClasse.id}
                classeId={item.lezioniStudenteClasse.id}
                lezioni={item.lezioniStudenteLezione1}
                onClick={this.props.onClick}
              />
              <Divider sx={{ pt: "2px", color: "primary.main" }} />
            </React.Fragment>
          ))}
        </Stack>
      </Container>
    );
  }
}

export default SEC_StudenteLezioniDetail;
