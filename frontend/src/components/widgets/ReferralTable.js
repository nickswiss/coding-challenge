import React from "react";
import { connect } from "react-redux";
import { retrieveLinks } from "../../actions/link";
import Table from "../common/Table";

class ReferralTable extends React.Component {
  componentDidMount() {
    this.props.getLinks();
  }

  render() {
    const { links } = this.props;
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
        <input/>
        <Table
          data={links.data}
          columns={columns}
          sortColumn={columns[0]}
          onEditClicked={() => {}}
          onDeleteClicked={() => {}}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  links: state.links
});

const mapDispatchToProps = dispatch => ({
  getLinks: () => dispatch(retrieveLinks())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReferralTable);
