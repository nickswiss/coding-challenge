import initialState from "../initialState";
export const LINK_EDIT_VALUE_UPDATED = "LINK_EDIT_VALUE_UPDATED";
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
    case UPDATING_LINK:
      return {
        ...state,
        isEditingLink: true
      };
    case LINK_UPDATED:
      const fieldEntries = Object.entries(state.fields);
      let fieldsNoErrors = {};
      for (let i = 0; i < fieldEntries.length; i++) {
        fieldsNoErrors[fieldEntries[i][0]] = {
          ...fieldEntries[i][1],
          errorMessage: ""
        };
      }
      return {
        ...state,
        fields: fieldsNoErrors,
        isEditingLink: false
      };
    case LINK_UPDATE_VALIDATION:
      // TODO: DRY with create
      const errors = Object.entries(action.validationErrors);
      let nextFields = { ...state.fields };
      for (let i = 0; i < errors.length; i++) {
        const key = errors[i][0];
        const validation = errors[i][1];
        let fieldData = nextFields[key];
        nextFields[key] = {
          ...fieldData,
          errorMessage: validation,
          isEditingLink: false
        };
      }
      return { ...state, isEditingLink: false, fields: nextFields };
    case LINK_EDIT_BUTTON_CLICKED:
      let formFields = { ...state.fields };
      const link = action.link;
      formFields.title = { ...formFields.title, value: link.title };
      formFields.clicks = { ...formFields.clicks, value: link.clicks };
      return { ...state, fields: formFields };
    default:
      return state;
  }
};