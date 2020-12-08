import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";

export default function MyDialog(props) {
  const [selectedValue, setSelectedValue] = useState();
  const { dialogClick, onClose, title, listItem, open } = props;

  // const handleListItemClick = (value) => {
  //   onClose(value);
  // };

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
      <List>
        <ListItem button onClick={dialogClick} key={"lakslsdk"}>
          {listItem}
        </ListItem>
      </List>
    </Dialog>
  );
}

// export default function ReusableDialog(props) {
//   const { title, listItem, dialogAction } = props;
//   const [open, setOpen] = useState(false);
//   const [selectedValue, setSelectedValue] = useState();

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = (value) => {
//     setOpen(false);
//     setSelectedValue(value);
//   };

//   return (
//     <div>
//       <br />
//       <IconButton onClick={handleClickOpen} aria-label="settings">
//         <MoreVertIcon />
//       </IconButton>
//       <MyDialog
//         title={title}
//         listItem={listItem}
//         selectedValue={selectedValue}
//         open={open}
//         onClose={handleClose}
//       />
//     </div>
//   );
// }
