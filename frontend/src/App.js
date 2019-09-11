import React from "react";
import "./App.css";
import ReferralPage from "./components/pages/ReferralPage";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={configureStore()}>
        <ReferralPage />
      </Provider>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
