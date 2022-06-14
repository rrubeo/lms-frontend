import toast, { Toaster } from "react-hot-toast";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import jnStyles from "../styles/utils.module.css";

const MSG_ERROR = "error";
const MSG_SUCCESS = "success";
const MSG_INFO = "info";
const MSG_WARNING = "warning";
const MSG_WIDTH = "270px";

function validationMessage(data, severity = MSG_INFO) {
  // console.log(severity);
  switch (severity) {
    case MSG_SUCCESS:
      return toast.custom(
        <Alert
          variant="standard"
          severity={MSG_SUCCESS}
          sx={{ minWidth: MSG_WIDTH }}
          classes={{ root: jnStyles.jnToast }}
        >
          <AlertTitle classes={{ root: jnStyles.jnToastTitle }}>
            SUCCESS
          </AlertTitle>
          {data}
        </Alert>
      );
    case MSG_ERROR:
      return toast.custom(
        <Alert
          variant="standard"
          severity={MSG_ERROR}
          sx={{ minWidth: MSG_WIDTH }}
          classes={{ root: jnStyles.jnToast }}
        >
          <AlertTitle classes={{ root: jnStyles.jnToastTitle }}>
            ERROR
          </AlertTitle>
          {data}
        </Alert>
      );
    case MSG_WARNING:
      return toast.custom(
        <Alert
          variant="standard"
          severity={MSG_WARNING}
          sx={{ minWidth: MSG_WIDTH }}
          classes={{ root: jnStyles.jnToast }}          
        >
          <AlertTitle classes={{ root: jnStyles.jnToastTitle }}>
            WARNING
          </AlertTitle>
          {data}
        </Alert>
      );
    case MSG_INFO:
      return toast.custom(
        <Alert
          variant="standard"
          severity={MSG_INFO}
          sx={{ minWidth: MSG_WIDTH }}
          classes={{ root: jnStyles.jnToast }}
        >
          <AlertTitle classes={{ root: jnStyles.jnToastTitle }}>
            INFO
          </AlertTitle>
          {data}
        </Alert>
      );
  }
}

module.exports = {
  validationMessage,
  MSG_SUCCESS,
  MSG_ERROR,
  MSG_INFO,
  MSG_WARNING,
};
