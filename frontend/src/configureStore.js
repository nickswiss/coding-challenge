import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { links } from "./reducers/links";
import { linkForm } from "./reducers/linkForm";
import { linkEditForm } from "./reducers/linkEditForm";

const configureStore = () => {
  /*
  Configures the redux store with enhancers and reducers
  Returns:
    configuredStore: store initialized with reducers nad enhancers
   */
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const referralReducer = combineReducers({
    links,
    linkForm,
    linkEditForm
  });
  return createStore(referralReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
