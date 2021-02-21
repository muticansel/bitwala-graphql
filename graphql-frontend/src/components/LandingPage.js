import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@material-ui/core";
import BlockDetail from "./BlockDetail";

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

const LandingPage = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataLength, setDataLength] = useState(0);
  const [blocks, setBlocks] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentHash, setCurrentHash] = useState(null);
  const [blockDetail, setBlockDetail] = useState(null);
  const classes = useStyles();

  // Old componentDidMount()
  useEffect(() => {
    console.log(props)
    // Fetch data here because
    const getData = async () => {
      // const response = await fetch("http://localhost:4000/blocks");
      // const data = await response.json();
      setBlocks(props.data.getBlocks);
      setDataLength(props.data.getBlocks.length); // set dataLength
    };

    getData();
  }, []);

  useEffect(() => {
    // Filters the data according to the 'page' and 'rowsPerPage'
    const filterData = () => {
      const startIndex = rowsPerPage * page;
      const filteredData = blocks.slice(startIndex, startIndex + rowsPerPage);
      setFilteredData(filteredData);
    };

    filterData();
  }, [blocks, page, rowsPerPage]);

  // When a row is selected
  useEffect(() => {
    const getHashDetail = async () => {
      setOpenModal(true);
      const response = await fetch(
        `http://localhost:5000/blocks/${currentHash}`
      );
      const data = await response.json();
      setBlockDetail(data);
    };
    if (currentHash) getHashDetail();
  }, [currentHash]);

  // Sets the 'page' and the data
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Sets the 'rowsPerPage'
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Closes the modal of block detail
  const closeModal = () => {
    setOpenModal(false);
    setBlockDetail(null);
  };

  // Gets
  const getBlockDetail = (blockHash) => {
    setCurrentHash(blockHash);
  };

  // Creates rows
  const renderData = () => {
    const filteredBlocks = filteredData.map((row) => {
      return (
        <StyledTableRow key={row.hash} onClick={() => getBlockDetail(row.hash)}>
          <StyledTableCell component="th" scope="row">
            {row.hash}
          </StyledTableCell>
          <StyledTableCell>{new Date(row.time).toString()}</StyledTableCell>
          <StyledTableCell>{row.height}</StyledTableCell>
        </StyledTableRow>
      );
    });

    return filteredBlocks
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Block Hash</StyledTableCell>
            <StyledTableCell>Time</StyledTableCell>
            <StyledTableCell>Height</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderData()}</TableBody>
      </Table>
      <TablePagination
        component="div"
        count={dataLength}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <BlockDetail
        open={openModal}
        handleClose={closeModal}
        blockDetail={blockDetail}
      />
    </TableContainer>
  );
};

export default LandingPage;
