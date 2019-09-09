import makeStyles from "@material-ui/core/styles/makeStyles";
import {Button, CircularProgress, TextField} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import React from "react";

const useStyles = makeStyles(theme => ({
  root: {
    width: "60%",
    minWidth: "450px",
    marginTop: "10px",
    margin: "0 auto",
    paddingTop: "10px",
    paddingBottom: "10px"
  },
  button: {
    width: "100%",
    marginTop: "10px",
    marginBottom: "10px"
  },
  error: {
    color: "red",
    marginBottom: 5,
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: "12px",
    fontSize: "12px"
  },
  textField: {
    width: "100%"
  },
  form: {
    width: "60%",
    margin: "0 auto"
  },
  formHeading: {
    textAlign: "center",
    verticalAlign: "middle",
    marginTop: "0px",
    lineHeight: "1.2em"
  }
}));

const LinkForm = props => {
  const { linkForm, onFieldValueChange, onLinkSubmit } = props;
  const classes = useStyles();
  const buttonContent = linkForm.isCreatingLink ? (
    <CircularProgress
      color="white"
      value={0}
      size={24}
    />
  ) : (
    "Submit"
  );
  return (
    <Paper className={classes.root}>
      <form
        className={classes.form}
        onSubmit={e => {
          e.preventDefault();
          onLinkSubmit(linkForm.fields.title.value);
        }}
      >
        <h3 className={classes.formHeading}>Create a Link!</h3>
        <div>
          <p className={classes.error}>{linkForm.fields.title.errorMessage}</p>
        </div>
        <div className={classes.container}>
          <TextField
            error={!!linkForm.fields.title.errorMessage}
            className={classes.textField}
            label="Title"
            variant={"outlined"}
            onChange={e => onFieldValueChange("title", e.target.value)}
            value={linkForm.fields.title.value}
          />
        </div>

        <Button
          className={classes.button}
          color={"primary"}
          variant="contained"
          onClick={() => onLinkSubmit(linkForm.fields.title.value)}
        >
          {buttonContent}
        </Button>
      </form>
    </Paper>
  );
};

export default LinkForm
