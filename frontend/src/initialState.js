export default {
  links: {
    isRequestingLinks: false,
    isDeletingLink: false,
    sortOrder: 'asc',
    sortBy: 'title',
    sortType: 'string',
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
