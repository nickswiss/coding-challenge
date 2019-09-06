import {
  CREATING_LINK,
  FIELD_VALUE_UPDATED,
  LINK_CREATE_ERROR,
  LINK_CREATE_VALIDATION,
  LINK_CREATED
} from "../reducers/linkForm";
import { REQUESTING_LINKS } from "../reducers/links";
import { getLinks, postLink } from "../api/referral";

export const fieldValueChanged = (fieldName, value) => {
  return {
    type: FIELD_VALUE_UPDATED,
    fieldName,
    value
  };
};

export const linkCreated = data => {
  return {
    type: LINK_CREATED,
    link: data
  };
};

const receiveLinkValidation = validationErrors => {
  return {
    type: LINK_CREATE_VALIDATION,
    validationErrors
  };
};

const receiveGeneralError = err => {
  return {
    type: LINK_CREATE_ERROR,
    error: err
  };
};

export const submitLink = value => {
  return function(dispatch) {
    dispatch({ type: CREATING_LINK });
    return postLink({ title: value, clicks: 0}).then(
      response => {
        if (response.status === 201) {
          dispatch(linkCreated(response.data));
        } else if (response.status === 400) {
          dispatch(receiveLinkValidation(response.data));
        } else {
          dispatch(receiveGeneralError("Unexpected error creating link"));
        }
      },
      err => dispatch(receiveGeneralError("Unexpected error creating link"))
    );
  };
};
