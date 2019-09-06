import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { links } from "./reducers/links";
import { linkForm } from "./reducers/linkForm";

const configureStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const referralReducer = combineReducers({
    links,
    linkForm
  });
  return createStore(
    referralReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
};

export default configureStore;
