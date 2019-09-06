import {RECEIVED_LINKS, RECEIVING_LINKS_ERROR, REQUESTING_LINKS} from "../reducers/links";
import {getLinks} from "../api/referral";

const receiveLinks = (data) => ({
  type: RECEIVED_LINKS,
  links: data
});

const receiveGeneralError = (err) => ({
  type: RECEIVING_LINKS_ERROR,
  error: err
});

export const retrieveLinks = () => {
  return function(dispatch) {
    dispatch({type: REQUESTING_LINKS});
    return getLinks().then(response => {
      if (response.status === 200) {
        dispatch(receiveLinks(response.data));
      } else {
        dispatch(receiveGeneralError("Unexpected error retrieving links"))
      }
    }, err => dispatch(receiveGeneralError("Unexpected error retrieving links")));
  };
};