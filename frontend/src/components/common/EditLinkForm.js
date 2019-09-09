import makeStyles from "@material-ui/core/styles/makeStyles";
import {CircularProgress, Paper} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React from "react";

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
  const { handleValueChange, form, onSubmit } = props;
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
          >
            {buttonContent}
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default EditLinkForm