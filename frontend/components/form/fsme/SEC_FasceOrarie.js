import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import jnStyles from "../../../styles/utils.module.css";

class SEC_FasceOrarie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.listTitle ? this.props.listTitle : "Lista",
      selezione: {},
      objFasce: {},
      objGiorni: {},
    };

    this.dafaultValue = this.dafaultValue.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.getToolTipFascia = this.getToolTipFascia.bind(this);
    this.getStyleFascia = this.getStyleFascia.bind(this);
  }

  componentDidMount() {
    this.dafaultValue();
  }

  async dafaultValue() {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    let newObjGiorno = {};
    let newObjFasce = {};

    this.props.array.map((item, index) => {
      const dataEvento = new Date(item.giorno).toLocaleDateString(
        "it-IT",
        options
      );
      newObjGiorno[item.giorno] = {
        data: dataEvento,
        numerogiornosettimana: item.numerogiornosettimana,
        giornosettimana: item.giornosettimana,
        giornoDisponibile: item.giornoDisponibile,
      };

      if (!newObjFasce.hasOwnProperty(item.giorno)) {
        newObjFasce[item.giorno] = { fascia: Array(12).fill("") };
      }

      let arrFascia = newObjFasce[item.giorno].fascia;
      arrFascia[item.ordineFascia - 1] = {
        giorno: item.giorno,
        oraInizioFascia: item.oraInizioFascia,
        oraFineFascia: item.oraFineFascia,
        dataOraInizioAppuntamento: item.dataOraInizioAppuntamento,
        dataOraFineAppuntamento: item.dataOraFineAppuntamento,
        usernameDocente: item.usernameDocente
          ? item.usernameDocente
          : item.usernameTutor,
        userNameStudente: item.userNameStudente,
        idIscrizioneStudente: item.idIscrizioneStudente,
        fasciaOraria: item.fasciaOraria,
        fasciaDisponibile: item.fasciaDisponibile,
        statoAppuntamento: item.statoAppuntamento,
        fasciaOrariaPrenotata:
          item.idIscrizioneStudenteAppuntamento == item.idIscrizioneStudente,
        idStatoAppuntamento: item.idStatoAppuntamento,
      };
    });

    // console.log(newObjGiorno);
    // console.log(newObjFasce);

    this.setState({
      objFasce: newObjFasce,
      objGiorni: newObjGiorno,
    });
  }

  async handleReset(event) {
    this.setState({ selezione: {} });
    this.props.onClick(this.props.id, {});
    this.dafaultValue();
  }

  handleOnClick(event, item) {
    if (this.state.selezione.giorno == item.giorno) {
      this.setState({ selezione: {} });
      this.props.onClick(this.props.id, {});
      return;
    }
    if (item.fasciaDisponibile == 0) return;
    this.setState({ selezione: item });
    this.props.onClick(this.props.id, item);
    this.dafaultValue();
  }

  getToolTipFascia(item) {
    if (!item.fasciaOraria) {
      return "-";
    }
    if (item.fasciaDisponibile == 0 && item.fasciaOrariaPrenotata) {
      if (item.idStatoAppuntamento == 2) {
        return "Prenotazione: CONFERMATA";
      }
      return "Prenotazione: IN ATTESA DI COFERMA";
    }
    if (item.fasciaDisponibile == 0) {
      return "Non disponibile";
    }
    return "Disponibile";
  }

  getStyleFascia(item) {
    if (!item.fasciaOraria) {
      return jnStyles.jnO2fasciaNo;
    }
    if (item.fasciaDisponibile == 0 && item.fasciaOrariaPrenotata) {
      if (item.idStatoAppuntamento == 2) {
        return jnStyles.jnO2fasciaConfermato;
      }
      return jnStyles.jnO2fasciaPrenotata;
    }
    if (item.fasciaDisponibile == 0) {
      return jnStyles.jnO2fasciaNo;
    }

    if (
      this.state.selezione.giorno == item.giorno &&
      this.state.selezione.oraInizioFascia == item.oraInizioFascia
    ) {
      return jnStyles.jnO2fasciaSelected;
    }

    return jnStyles.jnO2fasciaSi;
  }

  getFasce(index) {
    return (
      <>
        {this.state.objFasce[index].fascia.map((x, i) => (
          <Tooltip
            key={`${index}_${i}`}
            TransitionComponent={Zoom}
            title={this.getToolTipFascia(x)}
            placement="bottom"
            classes={{
              tooltip: jnStyles.jnO2toolTip,
            }}
          >
            <IconButton
              key={`${index}_${i}`}
              id={`${index}_${i}`}
              onClick={(event) => this.handleOnClick(event, x)}
              sx={{
                m: 0,
                p: 0,
              }}
            >
              <div className={this.getStyleFascia(x)}>{x.fasciaOraria}</div>
            </IconButton>
          </Tooltip>
        ))}
      </>
    );
  }

  render() {
    return (
      <>
        <FormControl
          sx={{
            m: 0,
            p: 0,
            maxHeight: this.props.size,
            overflow: "auto",
            width: this.props.width ? this.props.width : 1,
          }}
        >
          <Stack
            direction="column"
            spacing={0}
            mt={0}
            mb={0}
            p={0}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              width: "100%",
            }}
          >
            <Typography
              elevation={1}
              align="center"
              noWrap={true}
              variant="body2"
              classes={{
                body2: jnStyles.jnA1,
              }}
            >
              {this.state.title}
            </Typography>
            <List
              align="center"
              sx={{ width: "100%", m: 1, p: 1, maxWidth: 750, minWidth: 750 }}
              dense
              component="div"
              disablePadding
            >
              {Object.entries(this.state.objGiorni).map((value, key) => (
                <ListItem
                  disablePadding
                  key={key}
                  sx={{ paddingLeft: 0, paddingRight: 0 }}
                >
                  <ListItemButton>
                    <ListItemText
                      classes={{
                        primary: jnStyles.jnO2,
                      }}
                      primary={value[1].data}
                      secondary={value[1].giornosettimana}
                      sx={{
                        m: 0,
                        p: 0,
                      }}
                    />
                    {this.getFasce(value[0])}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Stack>
        </FormControl>
      </>
    );
  }
}

export default SEC_FasceOrarie;
