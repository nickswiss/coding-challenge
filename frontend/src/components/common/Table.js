import React from "react";
import { sortObjectsByAttribute } from "../../lib/sort";
import { FaSortUp, FaSortDown } from "react-icons/fa";

const SortIcon = ({ ascending }) => {
  if (ascending === true) {
    return <FaSortDown />;
  } else {
    return <FaSortUp />;
  }
};

class Table extends React.Component {
  state = {
    sortColumn: null,
    sortAscending: true
  };

  onHeaderClick = column => {
    if (column === this.state.sortColumn) {
      // Same column clicked
      this.setState({ sortAscending: !this.state.sortAscending });
    }
    this.setState({ sortColumn: column });
  };

  sortDataByColumn = (data, column, ascending) => {
    return sortObjectsByAttribute(
      data,
      column.accessor,
      ascending,
      column.datatype
    );
  };

  render() {
    const { columns, onEditClicked, onDeleteClicked } = this.props;
    let { sortColumn, sortAscending } = this.state;
    if (!sortColumn) {
      sortColumn = columns[0];
    }
    const data = this.sortDataByColumn(
      this.props.data,
      sortColumn,
      sortAscending
    );
    const tableHead = (
      <thead>
        <tr>
          {columns.map((column, index) => {
            let content;
            if (column === sortColumn) {
              content = <p>{column.header} <SortIcon ascending={sortAscending}/></p>
            } else {
              content = <p>{column.header} </p>
            }
            return (
              <th key={index} onClick={() => this.onHeaderClick(column)}>{content}</th>
            );
          })}
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
    );

    const tableBody = (
      <tbody>
        {data.map((d, index) => {
          return (
            <tr key={index}>
              {columns.map((c, i) => (
                <td key={i}>{d[c.accessor]}</td>
              ))}
              <td onClick={() => onEditClicked(d.id)}>Edit</td>
              <td onClick={() => onDeleteClicked(d.id)}>Delete</td>
            </tr>
          );
        })}
      </tbody>
    );

    return (
      <table>
        {tableHead}
        {tableBody}
      </table>
    );
  }
}

export default Table;
