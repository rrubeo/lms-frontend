import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import jnStyles from "../styles/utils.module.css";

const label = { inputProps: { "aria-label": "Checkbox orario" } };

class DCT_PianoOrario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      giorni: this.props.data.rows ? this.props.data.rows : [],
      days: this.props.data.days
        ? this.props.data.days
        : [
            "lunedì",
            "martedì",
            "mercoledì",
            "giovedì",
            "venerdì",
            "sabato",
            "domenica",
          ],
      orari: this.props.data.orari
        ? this.props.data.orari
        : [
            "9-10",
            "10-11",
            "11-12",
            "12-13",
            "13-14",
            "14-15",
            "15-16",
            "16-17",
            "17-18",
            "18-19",
            "19-20",
            "20-21",
          ],
      fasceOrarie: 12,
      checked: Array(7)
        .fill()
        .map(() => Array(12).fill(false)),
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.getGiorno = this.getGiorno.bind(this);
    this.getOrari = this.getOrari.bind(this);
  }

  componentDidMount() {
    // console.log("componentDidMount");
    // console.log(this.props.data.rows);
    let newChecked = [...this.state.checked];
    for (let m of this.props.data.rows) {
      // console.log(m.faor);
      for (let i = 1; i < this.state.fasceOrarie + 1; i++) {
        newChecked[m.gisE_ID - 1][i - 1] =
          m.faor[0]["v" + i] == 1 ? true : false;
      }
    }
    this.setState({
      checked: newChecked,
    });
  }

  handleReset(event) {
    let newChecked = Array(7)
      .fill()
      .map(() => Array(12).fill(false));

    this.setState({
      checked: newChecked,
    });
  }

  handleToggle(event, gise, index) {
    event.preventDefault();
    // console.log(this.state.checked);
    const giorno = gise - 1;
    const ora = index - 1;
    // console.log("handleToggle " + gise + " " + index);
    // console.log(
    //   "handleToggle " + this.state.days[giorno] + " " + this.state.orari[ora]
    // );

    let newChecked = [...this.state.checked];
    newChecked[gise - 1][index - 1] = !newChecked[gise - 1][index - 1];

    this.setState({
      checked: newChecked,
    });

    this.props.onChange(this.props.id, newChecked);
  }

  getOrari() {
    let f = [];
    const keyDay = "orario";

    const titleLabel = (
      <Typography
        key="orarioTitle"
        noWrap
        component="span"
        variant="body2"
        classes={{
          body2: jnStyles.jnO2greyBread,
        }}
      >
        Orario
      </Typography>
    );
    f.push(titleLabel);
    for (let i = 0; i < this.state.fasceOrarie; i++) {
      const timeLabel = (
        <Typography
          key={"orario" + i}
          noWrap
          component="span"
          variant="body2"
          classes={{
            body2: jnStyles.jnO2greyBread,
          }}
        >
          {this.state.orari[i]}
        </Typography>
      );
      f.push(timeLabel);
    }

    return (
      <Grid key={keyDay} item xs={1} sm={1} md={1} align="center">
        <Stack
          key={keyDay}
          id={`${keyDay}`}
          direction="column"
          spacing={0}
          mt={0}
          mb={0}
          p={0}
        >
          {f}
        </Stack>
      </Grid>
    );
  }

  getGiorno(g, dayIndex) {
    // console.log("Giorno", g);
    const giseId = g["gisE_ID"];
    // console.log("gisE_ID", giseId);
    const weekDayIndex = Number.parseInt(giseId) - 1;
    const keyDay = dayIndex;
    let f = [];
    const titleLabel = (
      <Typography
        key={giseId + "_0"}
        id={`${giseId + "_0"}`}
        noWrap
        component="span"
        variant="body2"
        classes={{
          body2: jnStyles.jnO2greyBread,
        }}
      >
        {this.state.days[dayIndex]}
      </Typography>
    );
    f.push(titleLabel);
    for (let i = 1; i < this.state.fasceOrarie + 1; i++) {
      let disp = g.faor[0];
      if (disp.hasOwnProperty("v" + i.toString())) {
        // console.log("ORA ", disp["v" + i]);
        const keyfinal = giseId + "_" + i;
        const timeCheck = (
          <Checkbox
            disableRipple
            key={keyfinal}
            id={`${keyfinal}`}
            {...label}
            onClick={(event) => this.handleToggle(event, giseId, i)}
            checked={this.state.checked[weekDayIndex][i - 1]}
            sx={{
              px: 1,
              py: 0.32,
              m: 0,
            }}
            size="medium"
            classes={{
              root: jnStyles.jnCheckRoot,
              checked: jnStyles.jnChecked,
            }}
            color="primary"
          />
        );
        f.push(timeCheck);
      }
    }

    return (
      <Grid key={keyDay} item xs={1} sm={1} md={1} align="center">
        <Stack
          key={keyDay}
          id={`${keyDay}`}
          direction="column"
          spacing={0}
          mt={0}
          mb={0}
          p={0}
        >
          {f}
        </Stack>
      </Grid>
    );
  }

  render() {
    // console.log(this.state.giorni);
    return (
      <FormControl
        sx={{
          m: 0,
          p: 0,
          maxHeight: this.props.size,
          overflow: "auto",
          width: this.props.width ? this.props.width : 1,
          // bgcolor: "#B34A9D",
        }}
        // classes={{ root: jnStyles.jnDCT_Text_Border }}
      >
        <Grid
          container
          spacing={{ xs: "0", md: "0" }}
          columns={{ xs: 4, sm: 8, md: 8 }}
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          sx={{ py: "1%", px: 0 }}
        >
          {this.getOrari()}
          {this.state.giorni.map((g, index) => this.getGiorno(g, index))}
        </Grid>
      </FormControl>
    );
  }
}

export default DCT_PianoOrario;
