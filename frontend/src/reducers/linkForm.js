import initialState from "../initialState";

/*
FIELD_VALUE_UPDATED:
Used to update the input value on a particular field
{
  type: FIELD_VALUE_UPDATED,
  fieldName: '<name of form field>'
  value: '<updated value>'
}
 */
export const FIELD_VALUE_UPDATED = "FIELD_VALUE_UPDATED";
export const LINK_CREATED = "LINK_CREATED";
export const CREATING_LINK = "CREATING_LINK";
export const LINK_CREATE_VALIDATION = "LINK_CREATE_VALIDATION";
export const LINK_CREATE_ERROR = "LINK_CREATE_ERROR";


export const linkForm = (state = initialState.linkForm, action) => {
  switch (action.type) {
    case FIELD_VALUE_UPDATED:
      let fields = { ...state.fields };
      fields[action.fieldName] = {
        ...fields[action.fieldName],
        value: action.value
      };
      return { ...state, fields };
    case CREATING_LINK:
      return {
        ...state,
        isCreatingLink: true
      };
    case LINK_CREATED:
      return {
        ...state,
        isCreatingLink: false
      };
    case LINK_CREATE_VALIDATION:
      const errors = Object.entries(action.validationErrors);
      let nextFields = {...state.fields};
      for (let i = 0; i < errors.length; i++) {
        const key = errors[i][0];
        const validation = errors[i][1];
        let fieldData = nextFields[key];
        nextFields[key] = {
          ...fieldData,
          errorMessage: validation
        }
      }
      return {
        ...state,
        isCreatingLink: false,
        fields: nextFields
      };
    case LINK_CREATE_ERROR:
      return {
        ...state,
        isCreatingLink: false,
        generalError: action.error
      };

    default:
      return state;
  }
};
