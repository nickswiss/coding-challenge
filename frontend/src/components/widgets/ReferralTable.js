import React from "react";
import { connect } from "react-redux";
import Table from "../common/Table";
import {fieldValueChanged, retrieveLinks, submitLink} from "../../actions/link";

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
          onChange={e =>
            this.props.onFieldValueChange("title", e.target.value)
          }
          value={linkForm.fields.title.value}
        />
        <input
          type="submit"
          value="Create Link"
          onClick={() => this.props.submitLink(linkForm.fields.title.value)}
        />
        <Table
          data={links.data}
          columns={columns}
          sortColumn={columns[0]}
          onCellClicked={(column, data) => {
            window.location =
          }}
          onEditClicked={() => {}}
          onDeleteClicked={() => {}}
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
  onFieldValueChange: (fieldName, value) =>
    dispatch(fieldValueChanged(fieldName, value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReferralTable);
