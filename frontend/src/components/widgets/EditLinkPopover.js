import React from "react";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import { connect } from "react-redux";
import {
  LINK_EDIT_BUTTON_CLICKED,
  LINK_EDIT_VALUE_UPDATED
} from "../../reducers/linkEditForm";
import { updateLink } from "../../actions/link";
import EditLinkForm from "../common/EditLinkForm";

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
        <EditLinkForm
          form={props.form}
          handleValueChange={props.handleValueChange}
          onEditClicked={() => props.onEditClicked(props.link)}
          onSubmit={() =>
            props
              .updateLink(props.link.id, props.form.fields)
              .then(success => {
                if (success) {
                  handleClose();
                  return true;
                }
                return false;
              })
              .then(success => {
                if (success) {
                  props.handleUpdateComplete();
                }
              })
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
