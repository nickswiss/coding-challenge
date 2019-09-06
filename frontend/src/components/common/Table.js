import React from "react";

export const Table = props => {
  const { columns, data } = props;

  const tableHead = (
    <thead>
      <tr>
        {columns.map(column => {
          return <th>{column.header}</th>;
        })}
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
  );

  const tableBody = (
    <tbody>
      {data.map(d => {
        return (
          <tr>
            {columns.map(c => (
              <td>{d[c.accessor]}</td>
            ))}
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        );
      })}
      <tr></tr>
    </tbody>
  );

  return (
    <table>
      {tableHead}
      {tableBody}
    </table>
  );
};
