import Box from "@mui/material/Box";
import ActionButton from "./actionButton";

export default function ActionGrid({ params, action }) {
  // console.log(params);
  // console.log(action);
  return (
    <Box>
      {action.map((item, index) => (
        <ActionButton
          key={item.id}
          title={item.title}
          icon={item.icon}
          params={params}
          callBack={item.callBack}
          route={item.route}
        />
      ))}
    </Box>
  );
}
