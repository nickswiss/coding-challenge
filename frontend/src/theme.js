import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#556cd6"
    },
    secondary: {
      main: red.A400
    },
    error: {
      main: red.A400
    },
    background: {
      default: "b"
    }
  }
});

export default theme;
