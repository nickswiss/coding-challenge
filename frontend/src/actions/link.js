import {
  DELETING_LINK, LINK_DELETE_ERROR, LINK_DELETED,
  RECEIVED_LINKS,
  RECEIVING_LINKS_ERROR,
  REQUESTING_LINKS
} from "../reducers/links";
import {delLink, getLinks, patchLink, postLink, putLink} from "../api/referral";

import {
  CREATING_LINK,
  FIELD_VALUE_UPDATED,
  LINK_CREATE_ERROR,
  LINK_CREATE_VALIDATION,
  LINK_CREATED
} from "../reducers/linkForm";
import {LINK_UPDATE_ERROR, LINK_UPDATE_VALIDATION, LINK_UPDATED, UPDATING_LINK} from "../reducers/linkEditForm";

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

export const linkUpdated = data => {
  return {
    type: LINK_UPDATED,
    link: data
  };
};

export const linkDeleted = () => {
  return {
    type: LINK_DELETED
  };
};

const receiveLinkCreateValidation = validationErrors => {
  return {
    type: LINK_CREATE_VALIDATION,
    validationErrors
  };
};

const receiveLinkUpdateValidation = validationErrors => {
  return {
    type: LINK_UPDATE_VALIDATION,
    validationErrors
  };
};

const receiveLinkCreateError = err => {
  return {
    type: LINK_CREATE_ERROR,
    error: err
  };
};

const receiveLinkUpdateError = err => {
  return {
    type: LINK_UPDATE_ERROR,
    error: err
  };
};

const receiveLinkDeleteError = err => {
  return {
    type: LINK_DELETE_ERROR,
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


export const updateLink = (id, formFields) => {
  return function(dispatch) {
    dispatch({ type: UPDATING_LINK });
    const reqData = {
      title: formFields.title.value
    };
    return patchLink(id, reqData)
      .then(
        response => {
          if (response.status === 200) {
            dispatch(linkUpdated(response.data));
            return true;
          } else if (response.status === 400) {
            dispatch(receiveLinkUpdateValidation(response.data));
            return false;
          } else {
            dispatch(receiveLinkUpdateError("Unexpected error creating link"));
            return false;
          }
        },
        err =>
          dispatch(receiveLinkUpdateError("Unexpected error creating link"))
      )
  };
};

export const deleteLink = (id) => {
  return function(dispatch) {
    dispatch({ type: DELETING_LINK });
    return delLink(id)
      .then(
        response => {
          if (response.status === 204) {
            dispatch(linkDeleted());
            return true;
          } else {
            dispatch(receiveLinkDeleteError("Unexpected error creating link"));
            return false;
          }
        },
        err =>
          dispatch(receiveLinkDeleteError("Unexpected error creating link"))
      )
  };
};