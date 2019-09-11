import {
  DELETING_LINK,
  LINK_DELETE_ERROR,
  LINK_DELETED,
  RECEIVED_LINKS,
  RECEIVING_LINKS_ERROR,
  REQUESTING_LINKS
} from "../reducers/links";
import { delLink, getLinks, patchLink, postLink } from "../api/referral";

import {
  CREATING_LINK,
  FIELD_VALUE_UPDATED,
  LINK_CREATE_ERROR,
  LINK_CREATE_VALIDATION,
  LINK_CREATED
} from "../reducers/linkForm";
import {
  LINK_UPDATE_ERROR,
  LINK_UPDATE_VALIDATION,
  LINK_UPDATED,
  UPDATING_LINK
} from "../reducers/linkEditForm";

/*
 Links are received from service call
 */
const receiveLinks = data => ({
  type: RECEIVED_LINKS,
  links: data
});

/*
 Error receiving links from service call
 */
const receiveLinksError = err => ({
  type: RECEIVING_LINKS_ERROR,
  error: err
});

export const fieldValueChanged = (fieldName, value) => {
  /*
  Generic action for updating the link create form
   */
  return {
    type: FIELD_VALUE_UPDATED,
    fieldName,
    value
  };
};

export const retrieveLinks = () => {
  /*
   Async action creator which handles request response actions for
   */
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

export const linkCreated = data => {
  /*
   Link has been successfully created
   */
  return {
    type: LINK_CREATED,
    link: data
  };
};

const receiveLinkCreateValidation = validationErrors => {
  /*
   Validation errors occurred on create service request
   */
  return {
    type: LINK_CREATE_VALIDATION,
    validationErrors
  };
};

const receiveLinkCreateError = err => {
  /*
   Received unhandled error in create service request
   */
  return {
    type: LINK_CREATE_ERROR,
    error: err
  };
};

export const submitLink = value => {
  /*
   Async action creator for creating a link
   */
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

export const linkUpdated = data => {
  /*
   Link was updated successfully in service call
   */
  return {
    type: LINK_UPDATED,
    link: data
  };
};

const receiveLinkUpdateValidation = validationErrors => {
  /*
   Validation error occurred when updating link
   */
  return {
    type: LINK_UPDATE_VALIDATION,
    validationErrors
  };
};

const receiveLinkUpdateError = err => {
  /*
  Unhandled error occurred when updating a link
   */
  return {
    type: LINK_UPDATE_ERROR,
    error: err
  };
};

export const updateLink = (id, formFields) => {
  /*
  Async action creator for update link service call
   */
  return function(dispatch) {
    dispatch({ type: UPDATING_LINK });
    const reqData = {
      title: formFields.title.value
    };
    return patchLink(id, reqData).then(
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
      err => dispatch(receiveLinkUpdateError("Unexpected error creating link"))
    );
  };
};

export const linkDeleted = () => {
  /*
  Successfully deleted link
   */
  return {
    type: LINK_DELETED
  };
};

const receiveLinkDeleteError = err => {
  /*
  Error occurred while deleting a link
   */
  return {
    type: LINK_DELETE_ERROR,
    error: err
  };
};

export const deleteLink = id => {
  /*
  Async action creator for delete link service call
   */
  return function(dispatch) {
    dispatch({ type: DELETING_LINK, id: id});
    return delLink(id).then(
      response => {
        if (response.status === 204) {
          dispatch(linkDeleted());
          return true;
        } else {
          dispatch(receiveLinkDeleteError("Unexpected error creating link"));
          return false;
        }
      },
      err => dispatch(receiveLinkDeleteError("Unexpected error creating link"))
    );
  };
};
