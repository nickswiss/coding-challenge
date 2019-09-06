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


export const linkForm = (state = initialState.linkForm, action) => {
  switch (action) {
    case FIELD_VALUE_UPDATED:
      let fields = { ...state.fields };
      fields[action.fieldName] = {
        ...fields[action.fieldName],
        value: action.value
      };
      return { ...state, fields };
    default:
      return state;
  }
};
