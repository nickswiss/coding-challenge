import TextField from "@material-ui/core/TextField";
import React from "react";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import { connect } from "react-redux";
import {
  LINK_EDIT_BUTTON_CLICKED,
  LINK_EDIT_VALUE_UPDATED
} from "../../reducers/linkEditForm";
import { updateLink } from "../../actions/link";
import {Paper} from "@material-ui/core";

const LinkPopoverForm = props => {
  const { handleValueChange, form, onSubmit } = props;
  return (
    <Paper>
      <form noValidate autoComplete="off">
        <h3>Update a link!</h3>
        <TextField
          id="standard-name"
          label="Title"
          value={form.fields.title.value}
          onChange={e => {
            handleValueChange("title", e.target.value);
          }}
          margin="normal"
        />
        <Button variant="contained" onClick={onSubmit}>
          Update
        </Button>
      </form>
    </Paper>
  );
};

const EditLinkPopover = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        color={"primary"}
        variant="contained"
        onClick={e => {
          setAnchorEl(e.currentTarget);
          props.onEditClicked(props.link);
        }}
      >
        Edit
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <LinkPopoverForm
          form={props.form}
          handleValueChange={props.handleValueChange}
          onEditClicked={() => props.onEditClicked(props.link)}
          onSubmit={() =>
            props
              .updateLink(props.link.id, props.form.fields)
              .then(handleClose)
              .then(props.handleUpdateComplete)
          }
        />
      </Popover>
    </div>
  );
};

const mapStateToProps = state => ({
  form: state.linkEditForm
});

const mapDispatchToProps = dispatch => ({
  handleValueChange: (fieldName, value) =>
    dispatch({ type: LINK_EDIT_VALUE_UPDATED, fieldName, value }),
  onEditClicked: link => dispatch({ type: LINK_EDIT_BUTTON_CLICKED, link }),
  updateLink: (id, data) => dispatch(updateLink(id, data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditLinkPopover);
