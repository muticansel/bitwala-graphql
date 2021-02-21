import React, { forwardRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  FormLabel,
  ListItem,
  List,
  Slide,
  Button,
} from "@material-ui/core";
import Transactions from "./Transactions";
import Spinner from "../UI/Spinner";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BlockDetail = (props) => {
  const [openTransactionModal, setOpenTransactionModal] = useState(false);

  return (
    <Dialog
      onClose={props.handleClose}
      open={props.open}
      TransitionComponent={Transition}
      fullwidth="true"
      maxWidth="lg"
    >
      <DialogTitle id="simple-dialog-title" style={{ textAlign: "center" }}>
        Block Detail
      </DialogTitle>
      {props.blockDetail && (
        <List>
          <ListItem>
            <FormLabel style={{ fontWeight: "bold", marginRight: "10px" }}>
              Size
            </FormLabel>
            <FormLabel>{props.blockDetail.size}</FormLabel>
          </ListItem>
          <ListItem>
            <FormLabel style={{ fontWeight: "bold", marginRight: "10px" }}>
              Block Index
            </FormLabel>
            <FormLabel>{props.blockDetail.block_index}</FormLabel>
          </ListItem>
          <ListItem>
            <FormLabel style={{ fontWeight: "bold", marginRight: "10px" }}>
              Prev HASH
            </FormLabel>
            <FormLabel>{props.blockDetail.prev_block}</FormLabel>
          </ListItem>
          <ListItem>
            <FormLabel style={{ fontWeight: "bold", marginRight: "10px" }}>
              Height
            </FormLabel>
            <FormLabel>{props.blockDetail.height}</FormLabel>
          </ListItem>
          <ListItem>
            <FormLabel style={{ fontWeight: "bold", marginRight: "10px" }}>
              Time
            </FormLabel>
            <FormLabel>{new Date(props.blockDetail.time).toString()}</FormLabel>
          </ListItem>
          <ListItem style={{ alignItems: "center", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenTransactionModal(true)}
            >
              See Transactions
            </Button>
          </ListItem>
          <Transactions
            open={openTransactionModal}
            handleClose={() => setOpenTransactionModal(false)}
            transactions={props.blockDetail.tx}
          />
        </List>
      )}
      {!props.blockDetail && <Spinner />}
    </Dialog>
  );
};

export default BlockDetail;
