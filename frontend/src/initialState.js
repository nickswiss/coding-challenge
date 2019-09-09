export default {
  links: {
    isRequestingLinks: false,
    isDeletingLink: false,
    retrievalError: '',
    data: []
  },
  linkForm: {
    generalError: '',
    isCreatingLink: false,
    fields: {
     title: {
       value: '',
       errorMessage: ''
     }
    }
  },
  linkEditForm: {
    generalError: '',
    isEditingLink: false,
    fields: {
     title: {
       value: '',
       errorMessage: ''
     },
     clicks: {
       value: 0,
       errorMessage: ''
     },
    }
  }
};
