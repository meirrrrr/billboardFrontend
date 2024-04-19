import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";

function Managers() {
  const [managers, setManagers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({});

  const baseUrl = "http://192.168.1.214:8080/admin/manager/";
  const token = sessionStorage.getItem("token");

  const apiClient = axios.create({
    baseURL: baseUrl,
  });

  apiClient.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers["Authorization"] = `Bearer ${sessionStorage.getItem(
          "token"
        )}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      const response = await apiClient(`${baseUrl}`);
      setManagers(response.data.data);
    } catch (error) {
      console.error("Error fetching managers:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}${id}`);
      setManagers(managers.filter((manager) => manager.id !== id));
    } catch (error) {
      console.error("Failed to delete manager:", error);
    }
  };

  const handleClickOpen = (manager) => {
    setEditData(manager);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${baseUrl}${editData.id}`, editData);
      setManagers(
        managers.map((manager) =>
          manager.id === editData.id ? editData : manager
        )
      );
      setOpen(false);
    } catch (error) {
      console.error("Failed to update manager:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Typography variant="h6" gutterBottom component="div" sx={{ p: 2 }}>
          Manager List
        </Typography>
        <Table sx={{ minWidth: 1170 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Manager ID</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {managers.map((manager) => (
              <TableRow key={manager.id}>
                <TableCell component="th" scope="row">
                  {manager.name}
                </TableCell>
                <TableCell>{manager.surname}</TableCell>
                <TableCell>{manager.username}</TableCell>
                <TableCell>{manager.email}</TableCell>
                <TableCell>{manager.roleId}</TableCell>
                <TableCell align="right">
                  <Button
                    color="primary"
                    onClick={() => handleClickOpen(manager)}
                  >
                    Update
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => handleDelete(manager.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Manager</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            name="name"
            value={editData.name || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Surname"
            type="text"
            fullWidth
            variant="outlined"
            name="surname"
            value={editData.surname || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            name="username"
            value={editData.username || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            name="email"
            value={editData.email || ""}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Managers;
