import * as React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Divider from "@mui/material/Divider";

import DCT_LinkButton from "../../DCT_LinkButton";
import DCT_PianoOrario from "../../DCT_PianoOrario";

import jnStyles from "../../../styles/utils.module.css";

const do_cfg = require("./config");

class FRM_Docenti_Orario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pianoId: "gridPianoOrario",
      pianoValue: Array(7)
        .fill()
        .map(() => Array(12).fill(false)),
    };

    this.dafaultValue = this.dafaultValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);

    this.changeChildPianoId = React.createRef();
  }

  dafaultValue() {
    this.changeChildPianoId.current.handleReset();

    let newChecked = Array(7)
      .fill()
      .map(() => Array(12).fill(false));

    this.setState({
      pianoValue: newChecked,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      id: this.props.id,
      orario: this.state.pianoValue,
    };
    // console.log(data);
    await this.props.onSubmit(event, data);
  }

  handleReset(event) {
    this.dafaultValue();
  }

  onChangeForm(id, data) {
    // console.log("onChangeForm");
    // console.log(data);
    switch (id) {
      case this.state.pianoId:
        this.setState({ pianoValue: data });
        break;
      default:
        console.log(id);
        console.log(data);
        break;
    }
  }

  render() {
    const linkBack = `/doce/${do_cfg.DOCE_STEP_0}`;
    return (
      <>
        {this.props.data.back_visible ? (
          <DCT_LinkButton href={linkBack} text={this.props.data.back_label} />
        ) : (
          <></>
        )}
        <Divider sx={{ pt: "1%" }} light />
        <Box
          component="form"
          id={this.props.id}
          onSubmit={this.handleSubmit}
          onReset={this.handleReset}
          sx={{ display: "inline", py: "2%", px: "2%" }}
        >
          <Stack
            direction="column"
            spacing={4}
            mt={0}
            mb={2}
            p={0}
            justifyContent="flex-start"
            alignItems="center"
          >
            <DCT_PianoOrario
              id={this.state.pianoId}
              data={this.props.data}
              size={450}
              width={1}
              onChange={this.onChangeForm}
              ref={this.changeChildPianoId}
            />
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
              classes={{ root: jnStyles.jnBT }}
            >
              <Button
                type="submit"
                variant="contained"
                classes={{ root: jnStyles.jnBT }}
              >
                Salva
              </Button>
              <Button
                type="reset"
                variant="contained"
                classes={{ root: jnStyles.jnBT }}
              >
                Reset
              </Button>
            </ButtonGroup>
          </Stack>
        </Box>
      </>
    );
  }
}

export default FRM_Docenti_Orario;
