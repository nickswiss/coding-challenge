import {
  RECEIVED_LINKS,
  RECEIVING_LINKS_ERROR,
  REQUESTING_LINKS
} from "../reducers/links";
import { getLinks, postLink } from "../api/referral";

import {
  CREATING_LINK,
  FIELD_VALUE_UPDATED,
  LINK_CREATE_ERROR,
  LINK_CREATE_VALIDATION,
  LINK_CREATED
} from "../reducers/linkForm";

const receiveLinks = data => ({
  type: RECEIVED_LINKS,
  links: data
});

const receiveLinksError = err => ({
  type: RECEIVING_LINKS_ERROR,
  error: err
});

export const linkCreated = data => {
  return {
    type: LINK_CREATED,
    link: data
  };
};

const receiveLinkCreateValidation = validationErrors => {
  return {
    type: LINK_CREATE_VALIDATION,
    validationErrors
  };
};

const receiveLinkCreateError = err => {
  return {
    type: LINK_CREATE_ERROR,
    error: err
  };
};

export const fieldValueChanged = (fieldName, value) => {
  return {
    type: FIELD_VALUE_UPDATED,
    fieldName,
    value
  };
};

export const retrieveLinks = () => {
  return function(dispatch) {
    dispatch({ type: REQUESTING_LINKS });
    return getLinks().then(
      response => {
        if (response.status === 200) {
          dispatch(receiveLinks(response.data));
        } else {
          dispatch(receiveLinksError("Unexpected error retrieving links"));
        }
      },
      err => dispatch(receiveLinksError("Unexpected error retrieving links"))
    );
  };
};

export const submitLink = value => {
  return function(dispatch) {
    dispatch({ type: CREATING_LINK });
    return postLink({ title: value, clicks: 0 })
      .then(
        response => {
          if (response.status === 201) {
            dispatch(linkCreated(response.data));
            return true;
          } else if (response.status === 400) {
            dispatch(receiveLinkCreateValidation(response.data));
            return false;
          } else {
            dispatch(receiveLinkCreateError("Unexpected error creating link"));
            return false;
          }
        },
        err =>
          dispatch(receiveLinkCreateError("Unexpected error creating link"))
      )
      .then(refresh => {
        if (refresh) {
          dispatch(retrieveLinks());
        }
      });
  };
};
