import React, { useState } from "react";
import {
  Button,
  TextField,
  Card,
  Typography,
  CardActionArea,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { connect } from "react-redux";

import { fetchVoterInfo, addVoter, updateVoter, deleteVoter } from "../action";
import ButtonAppBar from "../navbar";

import CustomModal from "../../../../components/modal";
import CustomForm from "../../../../components/form";

const Voter = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalLabel, setModalLabel] = useState("");
  // FETCH Voter
  const [btnType, setbtnType] = useState("Add");
  const [aadhar_num, setAadharNum] = useState("");
  const [disableBtn, setDisabledBtn] = useState(true);

  // ADD new Voter
  const [name, setName] = useState("");
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [phone_num, setPhone] = useState("");
  const [ward_num, setWard] = useState("");
  const [city, setCity] = useState("");

  // Image
  const [image, setFile] = useState(null);

  // Dialog
  const [open, setOpen] = React.useState(false);

  const handleDialogOpen = () => {
    if (props.voter.name) {
      setOpen(true);
    }
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const fetchVoterDetails = () => {
    setModalLabel("Voter Info");
    setbtnType("fetch");
    setModalIsOpen(true);
  };

  // FETCH Voter details
  const handleClose = () => {
    props.fetchVoterInfo(aadhar_num);
    setModalIsOpen(false);
    setAadharNum("");
  };

  const addNewVoter = () => {
    setModalLabel("Add Voter");
    setbtnType("Add");
    setModalIsOpen(true);
  };

  const uploadImage = (e) => {
    const imageName = e.target.value;
    const param = e.target.files[0];
    let reader = new FormData();
    reader.append("file", param, imageName);
    setFile(param);
  };

  const saveNewVoter = () => {
    const voter = {
      name,
      aadhar_num,
      fname,
      email,
      phone_num,
      ward_num,
      city,
    };
    const img = image;
    props.addVoter({ voter, img });
    setModalIsOpen(false);
  };

  const handleUpdateBtn = () => {
    if (props.voter.name) {
      setbtnType("update");
      setModalIsOpen(true);
      setModalLabel("Update Voter");
      setName(props.voter.name);
      setFname(props.voter.fname);
      setEmail(props.voter.email);
      setAadharNum(props.voter.aadhar_num);
      setPhone(props.voter.phone_num);
      setCity(props.voter.city);
      setWard(props.voter.ward_num);
      setDisabledBtn(false);
    }
  };

  const handleUpdateVoter = () => {
    const voter = {
      name,
      aadhar_num,
      fname,
      email,
      phone_num,
      ward_num,
      city,
    };

    const img = image;
    const id = props.voter._id;
    props.updateVoter({ voter, id });
    setModalIsOpen(false);
  };

  const deleteVoterHandler = () => {
    // First confirm from the admin
    const id = props.voter._id;
    props.deleteVoter(id);
    handleDialogClose();
  };

  return (
    <>
      <ButtonAppBar/>
      <div className="container mt-4">
        <div className="text-center">
          <Button
            variant="outlined"
            color="primary"
            onClick={fetchVoterDetails}
          >
            Voter Info
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className="ml-4"
            onClick={addNewVoter}
          >
            ADD Voter
          </Button>
        </div>
        {props.voter.name ? (
          <div>
            <div className="text-right mt-4">
              <Button
                variant="outlined"
                color="primary"
                onClick={handleUpdateBtn}
              >
                UPDATE Voter
              </Button>
              <Button
                variant="contained"
                color="secondary"
                disableElevation
                className="mx-4"
                onClick={handleDialogOpen}
              >
                DELETE Voter
              </Button>
            </div>
            <div className="container mt-4">
              <Typography variant="h4" component="h3">
                Voter details:{" "}
              </Typography>
              <Card>
                <CardActionArea>
                  <CardMedia
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Name:{" "}
                      <span className="text-primary">{props.voter.name}</span>
                    </Typography>
                    <Typography variant="h5" component="p">
                      Father Name:{" "}
                      <span className="text-primary">{props.voter.fname}</span>
                    </Typography>
                    {props.voter.email ? (
                      <Typography variant="h5" component="p">
                        Email:{" "}
                        <span className="text-primary">
                          {props.voter.email}
                        </span>
                      </Typography>
                    ) : null}
                    <Typography variant="h5" component="p">
                      Aadhar number:{" "}
                      <span className="text-primary">
                        {props.voter.aadhar_num}
                      </span>
                    </Typography>
                    <Typography variant="h5" component="p">
                      Phone number:{" "}
                      <span className="text-primary">
                        {props.voter.phone_num}
                      </span>
                    </Typography>
                    <Typography variant="h5" component="p">
                      City:{" "}
                      <span className="text-primary">{props.voter.city}</span>
                    </Typography>
                    <Typography variant="h5" component="p">
                      Ward number:{" "}
                      <span className="text-primary">
                        {props.voter.ward_num}
                      </span>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          </div>
        ) : null}

        {modalIsOpen ? (
          <CustomModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            heading={modalLabel}
          >
            <CustomForm>
              {btnType === "fetch" ? (
                <>
                  <br />
                  <TextField
                    id="outlined-basic"
                    label="Aadhar number"
                    variant="outlined"
                    type="number"
                    onChange={(e) => {
                      setAadharNum(e.target.value);
                      setDisabledBtn(false);
                    }}
                    helperText="Aadhar number must be of length 12"
                  />
                  <br />
                  <div className="mt-4">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleClose}
                      disabled={disableBtn}
                    >
                      Fetch Voter details
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="mt-4">
                    <label>
                      Voter Image:
                      <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={(e) => {
                          uploadImage(e);
                        }}
                      />
                    </label>
                  </div>
                  <div className="mt-4">
                    <TextField
                      id="outlined-basic"
                      label="Name"
                      variant="outlined"
                      type="text"
                      value={name}
                      required
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Father name"
                      variant="outlined"
                      type="text"
                      className="ml-4"
                      required
                      value={fname}
                      onChange={(e) => {
                        setFname(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mt-4">
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Aadhar number"
                      variant="outlined"
                      type="number"
                      className="ml-4"
                      required
                      value={aadhar_num}
                      onChange={(e) => {
                        setAadharNum(e.target.value);
                      }}
                      helperText="Aadhar number must be of length 12"
                    />
                  </div>
                  <div className="mt-4">
                    <TextField
                      id="outlined-basic"
                      label="Phone number"
                      variant="outlined"
                      type="number"
                      required
                      value={phone_num}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                    <TextField
                      id="outlined-basic"
                      label="City"
                      variant="outlined"
                      type="text"
                      className="ml-4"
                      required
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mt-4">
                    <TextField
                      id="outlined-basic"
                      label="Ward number"
                      variant="outlined"
                      type="number"
                      required
                      value={ward_num}
                      onChange={(e) => {
                        setWard(e.target.value);
                        // TODO: proper field checking
                          setDisabledBtn(false);
                      }}
                    />
                  </div>
                  <div className="mt-4">
                    <Button
                      variant="outlined"
                      color="primary"
                      disabled={disableBtn}
                      onClick={
                        btnType === "Add" ? saveNewVoter : handleUpdateVoter
                      }
                    >
                      {btnType === "Add" ? "Add new Voter" : "Update Voter"}
                    </Button>
                  </div>
                </div>
              )}
            </CustomForm>
          </CustomModal>
        ) : null}
        {open ? (
          <>
            <Dialog
              open={open}
              onClose={handleDialogClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Do you really want to delete the voter?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  By deleting the voter, he/she will not be able to cast the
                  vote.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose} color="primary">
                  Disagree
                </Button>
                <Button onClick={deleteVoterHandler} color="primary" autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ) : null}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    voter: state.dashboard.voter,
  };
};

const mapDispatchToProps = {
  fetchVoterInfo,
  addVoter,
  updateVoter,
  deleteVoter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Voter);
