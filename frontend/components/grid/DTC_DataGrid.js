import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  randomInt,
  randomUserName,
  randomUnitPrice,
  randomCommodity,
  randomJobTitle,
} from "@mui/x-data-grid-generator";
import Box from "@mui/material/Box";
import jnStyles from "../../styles/utils.module.css";
import ActionGrid from "./actionGrid";
import ActionButton from "./actionButton";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

const gd_cfg = require("./config");

class DTC_DataGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      currentId: "-1",
      actionList: [],
    };

    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleRowDoubleClick = this.handleRowDoubleClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleRouteClick = this.handleRouteClick.bind(this);
  }

  componentDidMount() {
    // console.log("GRID componentDidMount");
    const alist = this.props.action.map((item) => {
      switch (item.callBack) {
        case gd_cfg.GRID_DELETE_ACTION:
          item.callBack = this.handleDeleteClick;
          return item;
        case gd_cfg.GRID_ROUTE_ACTION:
          item.callBack = this.handleRouteClick;
          return item;
        case gd_cfg.GRID_ADD_ACTION:
          item.callBack = this.handleAddClick;
          return item;
      }
    });

    this.setState({ columns: [], actionList: alist });

    const buttonColumn = {
      field: "actions",
      type: "actions",
      maxWidth: 100,
      flex: 1,
      align: "center",
      renderCell: (params) => {
        // return <ActionGrid params={params} action={alist} />;
        return (
          <Box>
            {this.state.actionList.map((item) => (
              // <ActionButton
              //   key={item.id}
              //   title={item.title}
              //   icon={item.icon}
              //   params={params}
              //   callBack={item.callBack}
              //   route={item.route}
              // />
              <Tooltip
                key={item.id}
                TransitionComponent={Zoom}
                title={item.title}
                arrow
              >
                <IconButton
                  sx={{
                    justifyContent: "center",
                    px: 1.5,
                  }}
                  color="primary"
                  size="small"
                  onClick={(event) => {
                    item.callBack(params, event, item.route);
                  }}
                >
                  <span className={item.icon}></span>
                </IconButton>
              </Tooltip>
            ))}
          </Box>
        );
      },
    };

    let allColumn = this.props.cols;
    allColumn.push(buttonColumn);

    this.setState({ columns: allColumn });
  }

  componentWillUnmount() {
    // console.log("GRID componentWillUnmount");
  }

  componentDidUpdate() {
    // console.log("GRID componentDidUpdate");
    // console.log(this.props.rows);
  }

  createRandomRow(counter) {
    // console.log(counter);
    return {
      id: counter.toString(),
      col1: randomCommodity(),
      col2: randomJobTitle(),
    };
  }

  handleAddClick(params, event, route) {
    event.stopPropagation(); // don't select this row after clicking
    const newRow = this.createRandomRow(randomUnitPrice());
    params.api.updateRows([newRow]);
    const newData = params.api.state.rows.ids.map((x) => {
      return params.api.state.rows.idRowsLookup[x];
    });

    this.props.onChange(this.props.id, newData);
  }

  getAllInfo(params) {
    const api = params.api;
    const thisRow = {};
    api
      .getAllColumns()
      .filter((c) => c.field !== "__check__" && !!c)
      .forEach((c) => (thisRow[c.field] = params.row));

    return thisRow;
  }

  handleDeleteClick(params, event, route) {
    event.stopPropagation(); // don't select this row after clicking

    const thisRow = this.getAllInfo(params);
    params.api.updateRows([{ id: params.id, _action: "delete" }]);
    const newData = params.api.state.rows.ids.map((x) => {
      return params.api.state.rows.idRowsLookup[x];
    });

    if (params.id == this.state.currentId) {
      this.setState({ currentId: "-1" });
    }

    this.props.onDelete(this.props.id, params.id);
  }

  handleRouteClick(params, event, route) {
    event.stopPropagation();
    this.props.onNextStep(event, params, route);
  }

  handleRowClick(params, event) {
    event.defaultMuiPrevented = true;
    // console.log(params);
    this.setState({ currentId: params.id });
  }

  handleRowDoubleClick(params, event) {
    event.defaultMuiPrevented = true;
    // console.log(params);
    this.setState({ currentId: params.id });
  }

  render() {
    return (
      <Box component="div" sx={{ display: "inline" }}>
        <DataGrid
          autoHeight
          pagination          
          density="compact"
          rows={this.props.rows}
          columns={this.state.columns}
          getRowId={(row) => row.id}
          components={{
            Toolbar: GridToolbar,
          }}
          onRowClick={this.handleRowClick}
          onRowDoubleClick={this.handleRowDoubleClick}
          classes={{
            root: jnStyles.jnGridRoot,
            row: jnStyles.jnGridCell,
            columnHeadersInner: jnStyles.jnGridColumn,
            toolbarContainer: jnStyles.jnGridRoot,
            footerContainer: jnStyles.jnGridRoot,
          }}
        />
      </Box>
    );
  }
}

export default DTC_DataGrid;
