import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

export default function ActionButton({ title, icon, params, callBack, route }) {
  return (
    <Tooltip TransitionComponent={Zoom} title={title} arrow>
      <IconButton
        sx={{
          justifyContent: "center",
          px: 1.5,
        }}
        color="primary"
        size="small"
        onClick={(event) => {
          callBack(params, event, route);
        }}
      >
        <span className={icon}></span>
      </IconButton>
    </Tooltip>
  );
}
