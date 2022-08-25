import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const label = { inputProps: { "aria-label": "Checkbox orario" } };
const days = [
  "lunedì",
  "martedì",
  "mercoledì",
  "giovedì",
  "venerdì",
  "sabato",
  "domenica",
];

class DCT_PianoOrario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      giorni: this.props.data.rows.giorniSettimana
        ? this.props.data.rows.giorniSettimana
        : [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.getGiorno = this.getGiorno.bind(this);
  }

  handleChange(i, id) {
    console.log(i);
    console.log(id);
  }

  getOrarioLabel(g, i) {
    
  }

  getGiorno(g, i) {
    const f = g.fasceOrarie.map((f, index) => (
      <Checkbox
        key={index}
        id={`${index}`}
        {...label}
        onChange={this.handleChange(i, index)}
        sx={{
          p: 0,
          m: 0,
        }}
      />
    ));

    return (
      <Grid key={days[i]} item xs={1} sm={1} md={1} align="center">
        <Stack
          key={days[i]}
          id={`${days[i]}`}
          direction="column"
          spacing={0}
          mt={0}
          mb={0}
          p={0}
        >
          <Typography variant="h6" noWrap component="div">
            {days[i]}
          </Typography>
          {f}
        </Stack>
      </Grid>
    );
  }

  render() {
    return (
      <Grid
        container
        spacing={{ xs: "0", md: "30" }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ py: "1%", px: 0 }}
      >
        {this.state.giorni.map((g, index) => this.getGiorno(g, index))}
      </Grid>
    );
  }
}

export default DCT_PianoOrario;
