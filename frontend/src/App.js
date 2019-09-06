import React from "react";
import "./App.css";
import ReferralPage from "./components/pages/ReferralPage";
import { Provider } from "react-redux";
import configureStore from "./configureStore";

function App() {
  return (
    <Provider store={configureStore()}>
      <ReferralPage />
    </Provider>
  );
}

export default App;
