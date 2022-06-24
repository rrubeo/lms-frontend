import * as React from "react";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import jnStyles from "../styles/utils.module.css";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

class DCT_Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      isSelected: false,
      size: "0 KB",
      lastModifiedDate: "",
    };

    this.handleReset = this.handleReset.bind(this);

    this.changeHandler = this.changeHandler.bind(this);
  }

  handleReset() {
    this.setState({ selectedFile: null });
    this.setState({ isSelected: false });
    this.setState({ size: "0 KB" });
    this.setState({ lastModifiedDate: "" });

    document.getElementById("contained-button-file").value = "";
  }

  changeHandler(event) {
    console.log(event.target.files);
    console.log(event.target.files[0]);

    if (!event.target.files[0]) return;

    const numberFormatter = Intl.NumberFormat("it-IT");
    this.setState({ selectedFile: event.target.files[0] });
    this.setState({ isSelected: true });
    this.setState({
      size:
        numberFormatter.format((event.target.files[0].size / 1024).toFixed(0)) +
        " KB",
    });
    // this.setState({
    //   lastModifiedDate:
    //     "del " + event.target.files[0].lastModifiedDate.toLocaleDateString(),
    // });

    this.props.onChange(this.props.id, event.target.files[0]);
  }

  render() {
    return (
      <FormControl sx={{ m: "0px", width: this.props.size, p: "0px" }}>
        <Stack
          direction={{ xs: "column", sm: "column", md: "row" }}
          justifyContent="center"
          alignItems="center"
          spacing={{ xs: 1, sm: 1, md: 2 }}
        >
          {this.state.isSelected ? (
            <>
              <Chip
                id={`${this.props.id}-selected`}
                label={this.state.selectedFile.name}
                variant="outlined"
                classes={{
                  root: jnStyles.jnDCT_Text_Border,
                  outlined: jnStyles.jnN7,
                }}
              />
              <Chip
                id={`${this.props.id}-size`}
                label={this.state.size}
                variant="outlined"
                classes={{
                  root: jnStyles.jnDCT_Text_Border,
                  outlined: jnStyles.jnN7,
                }}
              />
              {/* <Chip
                id={`${this.props.id}-date`}
                label={this.state.lastModifiedDate}
                variant="outlined"
                classes={{
                  root: jnStyles.jnDCT_Text_Border,
                  outlined: jnStyles.jnN7,
                }}
              /> */}
            </>
          ) : (
            <Chip
              id={`${this.props.id}-empty`}
              label="Select a file to show details"
              variant="outlined"
              classes={{
                root: jnStyles.jnDCT_Text_Border,
                outlined: jnStyles.jnN7,
              }}
            />
          )}
          <label htmlFor="contained-button-file">
            <Input
              accept="application/pdf"
              id="contained-button-file"
              type="file"
              name="file"
              onChange={this.changeHandler}
            />
            <Button
              variant="contained"
              component="span"
              classes={{ root: jnStyles.jnBT }}
            >
              Seleziona
            </Button>
          </label>
        </Stack>
      </FormControl>
    );
  }
}

export default DCT_Upload;
