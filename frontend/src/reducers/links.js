import initialState from "../initialState";
import { LINK_CREATED } from "./linkForm";
export const REQUESTING_LINKS = "REQUESTING_LINKS";
export const RECEIVED_LINKS = "RECEIVED_LINKS";

/*
Used when an unexpected error occurred retrieving list of links
Format:
{
  type: RECEIVING_LINKS_ERROR,
  error: '<message to display>
}
 */
export const RECEIVING_LINKS_ERROR = "RECEIVING_LINKS_ERROR";

/*
Delete link service call is in progress
{
  type: DELETING_LINK
}
 */
export const DELETING_LINK = "DELETING_LINK";

/*
Link was successfully deleted from service call
Format:
{
  type: LINK_DELETED
}
 */
export const LINK_DELETED = "LINK_DELETED";

/*
Unhandled error while deleting links
Format:
{
  type: LINK_DELETE_ERROR,
  error: '<message to display>
}
 */
export const LINK_DELETE_ERROR = "LINK_DELETE_ERROR";

/*
Client side sort has changed attribute and/or direction
Format:
{
  type: SORT_CHANGED,
  sortOrder: which order to sort 'asc' or 'desc'
  sortBy: which attribute to sort the list by
  sortType: the data type of the element being sorted
}
 */
export const SORT_CHANGED = "SORT_CHANGED";

export const links = (state = initialState.links, action) => {
  switch (action.type) {
    case SORT_CHANGED:
      return {
        ...state,
        sortOrder: action.sortOrder,
        sortBy: action.sortBy,
        sortType: action.sortType
      };
    case RECEIVING_LINKS_ERROR:
      return {
        ...state,
        isRequestingLinks: false,
        retrievalError: action.error
      };
    case RECEIVED_LINKS:
      return {
        ...state,
        isRequestingLinks: false,
        retrievalError: "",
        data: action.links
      };
    case REQUESTING_LINKS:
      return {
        ...state,
        isRequestingLinks: true,
        retrievalError: ""
      };
    case LINK_CREATED:
      let current_links = state.data.concat();
      current_links.push(action.link);
      return {
        ...state,
        data: current_links
      };
    case DELETING_LINK:
      return {
        ...state,
        isDeletingLink: true,
        deletingId: action.id
      };
    case LINK_DELETED:
      return {
        ...state,
        isDeletingLink: false,
        deletingId: -1
      };
    case LINK_DELETE_ERROR:
      return {
        ...state,
        isDeletingLink: false,
        deletingId: -1
      };
    default:
      return state;
  }
};
