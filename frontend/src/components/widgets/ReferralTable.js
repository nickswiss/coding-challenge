import React from "react";
import { connect } from "react-redux";
import { retrieveLinks } from "../../actions/link";
import {Table} from "../common/Table"
import "react-table/react-table.css";

class ReferralTable extends React.Component {
  componentDidMount() {
    this.props.getLinks();
  }

  render() {
    const { links } = this.props;

    return (
      <div>
        <Table
          data={links.data}
          columns={[
            {
              header: "Title",
              accessor: 'title'
            },
            {
              header: "Clicks",
              accessor: 'clicks'
            },

          ]}
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
