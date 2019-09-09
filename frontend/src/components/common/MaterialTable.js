import React from "react";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import EditLinkPopover from "../widgets/EditLinkPopover";
import { sortObjectsByAttribute } from "../../lib/sort";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "60%",
    minWidth: "500px",
    marginTop: theme.spacing(3),
    marginLeft: "auto",
    marginRight: "auto",
    padding: "30px",
    overflowX: "auto"
  },
  table: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  spinnerContainer: { width: 40, marginLeft: "auto", marginRight: "auto" }
}));

const MaterialTable = props => {
  const {
    columns,
    onCellClicked,
    onDeleteClicked,
    handleUpdateComplete,
    handleSort,
    order,
    orderBy,
    orderDataType,
    data,
    loading
  } = props;

  const classes = useStyles();

  if (loading) {
    return (
      <Paper className={classes.root}>
        <div className={classes.spinnerContainer}>
          <CircularProgress value={0} />
        </div>
      </Paper>
    );
  }

  const sorted = sortObjectsByAttribute(
    data,
    orderBy,
    order === "asc",
    orderDataType
  );
  const tableHead = (
    <TableHead>
      <TableRow>
        {columns.map((column, index) => {
          let content = <p>{column.header} </p>;
          return (
            <TableCell align="center" key={index}>
              <TableSortLabel
                active={orderBy === column.accessor}
                direction={order}
                onClick={() =>
                  handleSort(column.accessor, order, column.datatype)
                }
              >
                {content}
              </TableSortLabel>
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
      {sorted.map((d, index) => {
        return (
          <TableRow key={index}>
            <TableCell align="center">
              <button
                onClick={() => onCellClicked(columns.title, d)}
                style={{
                  color: "#069",
                  textDecoration: "underline",
                  height: "100%",
                  width: "100%",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                {d.title}
              </button>
            </TableCell>
            <TableCell align="center">{d.clicks}</TableCell>
            <TableCell align="center">
              <EditLinkPopover
                handleUpdateComplete={handleUpdateComplete}
                link={d}
              />
            </TableCell>
            <TableCell align="center">
              <Button
                color="secondary"
                variant="contained"
                onClick={() => onDeleteClicked(d.id)}
              >
                Delete
              </Button>
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

export default MaterialTable;
