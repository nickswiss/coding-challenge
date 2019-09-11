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
import { SORT_CHANGED } from "../../reducers/links";
import LinkForm from "../common/LinkForm";
import MaterialEditDeleteTable from "../common/MaterialEditDeleteTable";

class ReferralApp extends React.Component {
  /*
  Creates links and displays links in a table
  Currently supports:
    client-side sort
    create
    edit link
    delete link
   */
  componentDidMount() {
    this.props.getLinks();
  }

  handleSort = (accessor, currentOrder, dataType) => {
    let nextOrder;
    if (currentOrder === "asc") {
      nextOrder = "desc";
    } else {
      nextOrder = "asc";
    }
    this.props.onSortChange(accessor, nextOrder, dataType);
  };

  render() {
    const { links, linkForm } = this.props;
    const columns = [
      {
        header: "Title",
        accessor: "title",
        datatype: "string",
        clickable: true,
      },
      {
        header: "Clicks",
        accessor: "clicks",
        datatype: "int",
        clickable: false
      }
    ];

    return (
      <div>
        <LinkForm
          linkForm={linkForm}
          onFieldValueChange={(fieldName, value) =>
            this.props.onFieldValueChange(fieldName, value)
          }
          onLinkSubmit={value => this.props.submitLink(value)}
        />
        <MaterialEditDeleteTable
          data={links.data}
          columns={columns}
          orderBy={links.sortBy}
          order={links.sortOrder}
          orderDataType={links.sortType}
          loading={links.isRequestingLinks}
          onCellClicked={(column, data) => {
            clickLink(data.id).then(resp => {
              window.location.href = `${getApiDomain()}${resp.data.redirect}`;
            });
          }}
          onDeleteClicked={id => {
            this.props.onDeleteLink(id).then(this.props.getLinks);
          }}
          handleSort={this.handleSort}
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
    dispatch(fieldValueChanged(fieldName, value)),
  onSortChange: (orderBy, order, dataType) =>
    dispatch({
      type: SORT_CHANGED,
      sortOrder: order,
      sortBy: orderBy,
      sortType: dataType
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReferralApp);
