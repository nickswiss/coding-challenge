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
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
    width: "60%",
    minWidth: "500px",
    marginTop: theme.spacing(3),
    marginLeft: "auto",
    marginRight: "auto",
    padding: "30px",
    overflow: "auto"
  },
  table: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  linkButton: {
    color: "#069",
    textDecoration: "underline",
    height: "100%",
    width: "100%",
    border: "none",
    cursor: "pointer",
    textAlign: "left"
  },
  spinnerContainer: { width: 40, marginLeft: "auto", marginRight: "auto" }
}));

const MaterialEditDeleteTable = props => {
  /*
    Generic table with edit and delete columns and hooks
   */
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
    loading,
    isDeletingLink,
    deletingId
  } = props;

  const classes = useStyles();

  if (loading) {
    return (
      <Paper className={classes.root}>
        <div className={classes.spinnerContainer}>
          <CircularProgress color="primary" value={0} />
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
          const content = <p>{column.header} </p>;
          return (
            <TableCell align="left" key={index}>
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
        const deleteButtonContent = isDeletingLink && d.id === deletingId ? (
          <CircularProgress color="white" value={0} size={24} />
        ) : (
          "Delete"
        );
        const deleteButton = (
          <TableCell align="center">
            <Button
              className={classes.button}
              color="secondary"
              variant="contained"
              onClick={() => onDeleteClicked(d.id)}
              disabled={!!isDeletingLink}
            >
              {deleteButtonContent}
            </Button>
          </TableCell>
        );
        return (
          <TableRow key={index}>
            {columns.map((c, i) => {
              if (c.clickable) {
                return (
                  <TableCell align="left" key={i}>
                    <button
                      className={classes.linkButton}
                      onClick={() => onCellClicked(c, d)}
                    >
                      {d[c.accessor]}
                    </button>
                  </TableCell>
                );
              } else {
                return (
                  <TableCell align="left" key={i}>
                    {d[c.accessor]}
                  </TableCell>
                );
              }
            })}
            <TableCell align="center">
              <EditLinkPopover
                handleUpdateComplete={handleUpdateComplete}
                link={d}
              />
            </TableCell>
            {deleteButton}
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

MaterialEditDeleteTable.propTypes = {
  onCellClicked: PropTypes.func.isRequired,
  onDeleteClicked: PropTypes.func.isRequired,
  handleUpdateComplete: PropTypes.func.isRequired,
  handleSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]),
  orderBy: PropTypes.oneOf(["title", "clicks"]),
  orderDataType: PropTypes.oneOf(["string", "int", "decimal", "number"]),
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
      datatype: PropTypes.string.isRequired
    })
  ).isRequired
};

export default MaterialEditDeleteTable;
