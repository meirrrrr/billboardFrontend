import axios from "axios";
import { useEffect, useState } from "react";
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

function Products() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({});

  const url = "http://192.168.1.214:8080/admin/bill/";
  const token = sessionStorage.getItem("token");

  const apiClient = axios.create({
    baseURL: url,
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
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await apiClient(`${url}`);
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}${id}`);
      setProducts(products.filter((product) => product.id !== id));
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
      await axios.put(`${url}${editData.id}`, editData);
      setProducts(
        products.map((product) =>
          product.id === editData.id ? editData : product
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
          Products List
        </Typography>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Width</TableCell>
              <TableCell>Height</TableCell>
              <TableCell>Display type</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Location</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.productId}>
                <TableCell component="th" scope="row">
                  {product.productId}
                </TableCell>
                <TableCell>{product.width}</TableCell>
                <TableCell>{product.height}</TableCell>
                <TableCell>{product.display_type}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.locationId}</TableCell>
                <TableCell align="left">
                  <Button
                    color="primary"
                    onClick={() => handleClickOpen(product)}
                  >
                    Update
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => handleDelete(product.id)}
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
        <DialogTitle>Update Product</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="height"
            type="text"
            fullWidth
            variant="outlined"
            name="height"
            value={editData.height || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="width"
            type="text"
            fullWidth
            variant="outlined"
            name="width"
            value={editData.width || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="height"
            type="text"
            fullWidth
            variant="outlined"
            name="height"
            value={editData.height || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="display-type"
            type="text"
            fullWidth
            variant="outlined"
            name="displayType"
            value={editData.displayType || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="price"
            type="text"
            fullWidth
            variant="outlined"
            name="price"
            value={editData.price || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="location"
            type="text"
            fullWidth
            variant="outlined"
            name="location"
            value={editData.price || ""}
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

export default Products;
