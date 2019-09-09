import React from "react";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import EditLinkPopover from "../widgets/EditLinkPopover";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    minWidth: 450,
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
}));

const MaterialTable = props => {
  const {
    columns,
    onCellClicked,
    onDeleteClicked,
    handleUpdateComplete,
    data
  } = props;
  const classes = useStyles();
  const tableHead = (
    <TableHead>
      <TableRow>
        {columns.map((column, index) => {
          let content = <p>{column.header} </p>;
          return (
            <TableCell align="center" key={index} onClick={() => this.onHeaderClick(column)}>
              {content}
            </TableCell>
          );
        })}
        <TableCell align="center">Edit</TableCell>
        <TableCell align="center">Delete</TableCell>
      </TableRow>
    </TableHead>
  );

  const tableBody = (
    <TableBody>
      {data.map((d, index) => {
        return (
          <TableRow key={index}>
            {columns.map((c, i) => (
              <TableCell align="center" key={i} onClick={() => onCellClicked(c, d)}>
                {d[c.accessor]}
              </TableCell>
            ))}
            <TableCell align="center">
              <EditLinkPopover
                handleUpdateComplete={handleUpdateComplete}
                link={d}
              />
            </TableCell>
            <TableCell align="center">
              <Button color="secondary" variant='contained' onClick={() => onDeleteClicked(d.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        {tableHead}
        {tableBody}
      </Table>
    </Paper>
  );
};

export default MaterialTable
