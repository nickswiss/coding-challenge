/*
Initial state of the redux store, referenced by reducers initial state
 */
export default {
  links: {
    isRequestingLinks: false,
    isDeletingLink: false,
    deletingId: -1,
    sortOrder: "asc",
    sortBy: "title",
    sortType: "string",
    retrievalError: "",
    data: []
  },
  linkForm: {
    generalError: "",
    isCreatingLink: false,
    fields: {
      title: {
        value: "",
        errorMessage: ""
      }
    }
  },
  linkEditForm: {
    generalError: "",
    isEditingLink: false,
    fields: {
      title: {
        value: "",
        errorMessage: ""
      }
    }
  }
};
