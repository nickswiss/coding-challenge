import initialState from "../initialState";
export const LINK_EDIT_VALUE_UPDATED =  "LINK_EDIT_VALUE_UPDATED";
export const LINK_EDIT_BUTTON_CLICKED = "LINK_EDIT_BUTTON_CLICKED";

export const UPDATING_LINK = "UPDATING_LINK";
export const LINK_UPDATED = "LINK_UPDATED";
export const LINK_UPDATE_VALIDATION = "LINK_UPDATE_VALIDATION";
export const LINK_UPDATE_ERROR = "LINK_UPDATE_ERROR";


export const linkEditForm = (state = initialState.linkEditForm, action) => {
  switch (action.type) {
    case LINK_EDIT_VALUE_UPDATED:
      let fields = { ...state.fields };
      fields[action.fieldName] = {
        ...fields[action.fieldName],
        value: action.value
      };
      return { ...state, fields };
    case LINK_EDIT_BUTTON_CLICKED:
      let formFields = { ...state.fields };
      const link = action.link;
      formFields.title = {...formFields.title, value: link.title};
      formFields.clicks = {...formFields.clicks, value: link.clicks};
      return {...state, fields: formFields};
    default:
      return state;
  }
};