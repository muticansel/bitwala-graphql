import React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  Paper,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const CustomTable = (props) => {
  const classes = useStyles();

  const renderData = () => {
    // Loop over data for each row data
    const tableData = props.data.map((item) => {
      return (
        <StyledTableRow key={item.hash} onClick={() => props.handleClick ? props.handleClick(item[props.clickData]) : null}>
          {props.fields.map((field, i) => {
            return <StyledTableCell key={i}>{item[field]}</StyledTableCell>;
          })}
        </StyledTableRow>
      );
    });

    return tableData;
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {props.columns.map((column) => {
              return <StyledTableCell key={column}>{column}</StyledTableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>{renderData()}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
