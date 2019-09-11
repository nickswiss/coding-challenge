import makeStyles from "@material-ui/core/styles/makeStyles";
import { CircularProgress, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React from "react";
import PropTypes from 'prop-types';


const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1, 1),
    padding: theme.spacing(1, 1),
    width: "300px"
  },
  button: {
    width: "100%"
  },
  form: {
    padding: theme.spacing(1, 1)
  },
  error: {
    color: "red",
    fontSize: "12px",
    marginBottom: "5px",
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: "12px"
  },
  textField: {
    width: "100%"
  },
  headerContainer: {
    height: "30px"
  },
  headerContent: {
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: "30px"
  }
}));

const EditLinkForm = props => {
  /*
    Presentation Form used when updating a link
   */
  const { handleValueChange, onSubmit, form  } = props;
  const classes = useStyles();
  const buttonContent = form.isEditingLink ? (
    <CircularProgress color="white" value={0} size={24} />
  ) : (
    "Update"
  );
  return (
    <Paper className={classes.root}>
      <form
        noValidate
        autoComplete="off"
        className={classes.form}
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <h3 className={classes.headerContent}>Update a link!</h3>
        <div>
          <p className={classes.error}>{form.fields.title.errorMessage}</p>
          <TextField
            label="Title"
            variant={"outlined"}
            value={form.fields.title.value}
            onChange={e => {
              handleValueChange("title", e.target.value);
            }}
            className={classes.textField}
            margin={"normal"}
          />
        </div>
        <div>
          <Button
            className={classes.button}
            variant="contained"
            onClick={onSubmit}
            color={"primary"}
            disabled={!form.fields.title.value}
          >
            {buttonContent}
          </Button>
        </div>
      </form>
    </Paper>
  );
};

EditLinkForm.propTypes = {
  handleValueChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  form: PropTypes.shape({
    generalError: PropTypes.string,
    isEditingLink: PropTypes.bool.isRequired,
    fields: PropTypes.shape({
      title: PropTypes.shape({
        value: PropTypes.string.isRequired,
        errorMessage: PropTypes.string.isRequired
      })
    })
  })
};

export default EditLinkForm;
