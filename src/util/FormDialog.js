import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { storage } from "../firebase/config";
import TextField from "@material-ui/core/TextField";
import {useForm} from 'react-hook-form';
import Dialog from "@material-ui/core/Dialog";
import Input from "@material-ui/core/Input";
import
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export const FormDialog = () => {
  const [open, setOpen] = useState(false);
  const {register, error, reset} = useForm({
      defaultValues:{},
  });
  const [image, setImage] = useState(null);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>Make a new post to Flip Clip</DialogContentText>
          <TextField
          inputRef={register}
          />
          <Input
            name="imageUpload"
            id="imageInput"
            inputRef={register}
            type="file"
            disableUnderline={true}
            onChange={handleImageChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
