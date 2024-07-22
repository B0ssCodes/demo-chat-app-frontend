import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Logout({ userDetails, setUserDetails, setUserId }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Delete token and tokenExpiry from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    setUserDetails({
      username: "",
      email: "",
      description: "",
    });
    setUserId(null);
    // Redirect to /login
    navigate("/login");
    handleClose();
  };

  return (
    <div>
      <div
        className="nav-link"
        style={{ cursor: "pointer" }}
        onClick={handleOpen}
      >
        Logout
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to logout?
          </Typography>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </Box>
      </Modal>
    </div>
  );
}

export default Logout;
