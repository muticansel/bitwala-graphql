import React, { forwardRef } from "react";
import {
  Dialog,
  DialogTitle,
  Slide
} from "@material-ui/core";
import CustomTable from '../UI/Table';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const columns = ['Hash', 'Version', 'Size', 'Weight', 'Block Height']
const fields = ['hash', 'ver', 'size', 'weight', 'block_height']

const Transactions = (props) => {
  return (
    <Dialog
      onClose={props.handleClose}
      open={props.open}
      TransitionComponent={Transition}
      fullwidth="true"
      maxWidth="lg"
    >
      <DialogTitle id="simple-dialog-title" style={{ textAlign: "center" }}>
        Transactions ({props.transactions.length})
      </DialogTitle>
      {props.transactions && (
        <CustomTable columns={columns} fields={fields} data={props.transactions} />
      )}
    </Dialog>
  );
};

export default Transactions;
