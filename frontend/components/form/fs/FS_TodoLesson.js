import * as React from "react";
import { withRouter } from "next/router";
import Stack from "@mui/material/Stack";
import DTC_DataGrid from "../../grid/DTC_DataGrid";


class FS_TodoLesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleBack(event) {
    event.preventDefault();
  }

  handleSubmit(event) {}

  handleReset(event) {}

  onChangeForm(id, data) {
    switch (id) {
      default:
        console.log(id);
        console.log(data);
        break;
    }
  }

  onDeleteRow(id, data) {
    const rowData = {
      id: pb_cfg.FRM_GSTU_STEP_0,
      key: data,
    };
    this.props.onDelete(rowData);
  }

  render() {
    return (
      <Stack direction="column" spacing={4} mt={0} mb={2} p={0}>
        <DTC_DataGrid
          id="fs_todo_lesson"
          cols={this.props.data.cols}
          rows={this.props.data.rows}
          onChange={this.onChangeForm}
          onDelete={this.onDeleteRow}
          onNextStep={this.props.onNextStep}
          action={this.props.action}
        />
      </Stack>
    );
  }
}

export default withRouter(FS_TodoLesson);
