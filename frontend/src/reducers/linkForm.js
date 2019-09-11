import initialState from "../initialState";

/*
Used to update the input value on a particular field
{
  type: FIELD_VALUE_UPDATED,
  fieldName: '<name of form field>'
  value: '<updated value>'
}
 */
export const FIELD_VALUE_UPDATED = "FIELD_VALUE_UPDATED";

/*
Link has been successfully created by service call
{
  type: LINK_CREATED
}
 */
export const LINK_CREATED = "LINK_CREATED";

/*
Service call to create link is in progress
{
  type: CREATING_LINK
}
 */
export const CREATING_LINK = "CREATING_LINK";

/*
Validation error occurred while creating a link
{
  type: LINK_CREATE_VALIDATION,
  validationErrors: validation errors in create request
}
 */
export const LINK_CREATE_VALIDATION = "LINK_CREATE_VALIDATION";

/*
Unhandled error occurred while creating a link
{
  type: LINK_CREATE_ERROR,
  error: Message to display when occurred
}
 */
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
      const fieldEntries = Object.entries(state.fields);
      let fieldsNoErrors = {};
      for (let i = 0; i < fieldEntries.length; i++) {
        fieldsNoErrors[fieldEntries[i][0]] = {
          ...fieldEntries[i][1],
          errorMessage: "",
          value: ""
        };
      }
      return {
        ...state,
        fields: fieldsNoErrors,
        isCreatingLink: false
      };
    case LINK_CREATE_VALIDATION:
      const errors = Object.entries(action.validationErrors);
      let nextFields = { ...state.fields };
      for (let i = 0; i < errors.length; i++) {
        const key = errors[i][0];
        const validation = errors[i][1][0];
        let fieldData = nextFields[key];
        nextFields[key] = {
          ...fieldData,
          errorMessage: validation
        };
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
