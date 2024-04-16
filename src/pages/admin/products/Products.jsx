import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
  const url = "192.168.1.213:8080/admin/product";

  useEffect(() => {
    fetchProducts();
  });

  const fetchProducts = async () => {
    try {
      const response = await axios.get(url);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Typography variant="h6" gutterBottom component="div" sx={{ p: 2 }}>
          Products List
        </Typography>
        <Table sx={{ minWidth: 750 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Width</TableCell>
              <TableCell>Height</TableCell>
              <TableCell>Display type</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </>
  );
}

export default Products;
