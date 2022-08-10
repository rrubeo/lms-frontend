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

    this.getActiveAction = this.getActiveAction.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleRowDoubleClick = this.handleRowDoubleClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleRouteClick = this.handleRouteClick.bind(this);
  }

  getActiveAction(cfgAction) {
    // console.log("getActiveAction");
    // console.log(cfgAction);
    const btList = cfgAction.map((elem) => {
      // console.log("TYPE:", typeof elem.callBack);
      if (typeof elem.callBack === "string") {
        switch (elem.callBack) {
          case gd_cfg.GRID_DELETE_ACTION:
            elem.callBack = this.handleDeleteClick;
            return elem;
          case gd_cfg.GRID_ROUTE_ACTION:
            elem.callBack = this.handleRouteClick;
            return elem;
          case gd_cfg.GRID_ADD_ACTION:
            elem.callBack = this.handleAddClick;
            return elem;
        }
      } else {
        // console.log("Already");
        return elem;
      }
    });
    // console.log("getActiveAction");
    // console.log(btList);
    return btList;
  }

  componentDidMount() {
    const alist = this.getActiveAction(this.props.action);

    const buttonColumn = {
      field: "actions",
      type: "actions",
      maxWidth: this.props.actionWidth ? this.props.actionWidth : 100,
      flex: 1,
      align: "center",
      renderCell: (params) => {
        return (
          <Box>
            {alist.map((item) => (
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
    // console.log(allColumn);
    // console.log(buttonColumn);

    const a = allColumn.concat(buttonColumn);
    // console.log(a);
    // allColumn.push(buttonColumn);

    this.setState({ columns: a });
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
    this.setState({ currentId: params.id });

    if (this.props.onSelect) {
      this.props.onSelect(params.id, params);
    }
  }

  handleRowDoubleClick(params, event) {
    event.defaultMuiPrevented = true;
    // console.log(params);
    this.setState({ currentId: params.id });
  }

  render() {
    return (
      <Box component="div" sx={{ display: "inline", overflow: "hidden" }}>
        <DataGrid
          scrollbarSize={1000}
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
            footerContainer: jnStyles.jnGridFooter,
            virtualScroller: jnStyles.jnGridVirtual,
          }}
        />
      </Box>
    );
  }
}

export default DTC_DataGrid;
