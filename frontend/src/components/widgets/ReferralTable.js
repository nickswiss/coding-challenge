import React from "react";
import { connect } from "react-redux";
import {
  deleteLink,
  fieldValueChanged,
  retrieveLinks,
  submitLink
} from "../../actions/link";
import { clickLink } from "../../api/referral";
import { getApiDomain } from "../../api/config";
import MaterialTable from "../common/MaterialTable";

class ReferralTable extends React.Component {
  componentDidMount() {
    this.props.getLinks();
  }

  render() {
    const { links, linkForm } = this.props;
    const columns = [
      {
        header: "Title",
        accessor: "title",
        datatype: "string"
      },
      {
        header: "Clicks",
        accessor: "clicks",
        datatype: "int"
      }
    ];

    return (
      <div>
        <div>
          <p>{linkForm.fields.title.errorMessage}</p>
        </div>
        <input
          onChange={e => this.props.onFieldValueChange("title", e.target.value)}
          value={linkForm.fields.title.value}
        />
        <input
          type="submit"
          value="Create Link"
          onClick={() => this.props.submitLink(linkForm.fields.title.value)}
        />
        <MaterialTable
          data={links.data}
          columns={columns}
          sortColumn={columns[0]}
          onCellClicked={(column, data) => {
            clickLink(data.id).then(resp => {
              window.location.href = `${getApiDomain()}${resp.data.redirect}`;
            });
          }}
          onEditClicked={() => {}}
          onDeleteClicked={id => {
            this.props.onDeleteLink(id).then(this.props.getLinks);
          }}
          handleUpdateComplete={() => {
            this.props.getLinks();
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  links: state.links,
  linkForm: state.linkForm
});

const mapDispatchToProps = dispatch => ({
  getLinks: () => dispatch(retrieveLinks()),
  submitLink: value => dispatch(submitLink(value)),
  onDeleteLink: id => dispatch(deleteLink(id)),
  onFieldValueChange: (fieldName, value) =>
    dispatch(fieldValueChanged(fieldName, value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReferralTable);
