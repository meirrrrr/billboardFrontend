import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import Header from "../../../components/admin/Header";
import { useState } from "react";
import axios from "axios";

const baseUrl = "http://192.168.1.214:8080/admin/bill/";

const ProductForm = () => {
  const [location, setLocation] = useState(null);
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [display_type, setDisplay_type] = useState(null);
  const [price, setPrice] = useState(null);

  const apiClient = axios.create({
    baseURL: baseUrl,
  });

  const token = sessionStorage.getItem("token");

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

  const createProduct = async () => {
    try {
      const response = await apiClient.post(`${baseUrl}`, {
        locationId: location,
        height: height,
        width: width,
        display_type: display_type,
        price: price,
      });
      console.log("Manager created:", response.data);
    } catch (error) {
      console.error("Error creating manager:", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE PRODUCT" subtitle="Create a new Product" />
      <Formik onSubmit={createProduct}>
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            >
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Location"
                onBlur={handleBlur}
                onChange={(e) => setLocation(e.target.value)}
                value={values.location}
                name="location"
                error={!!touched.location && !!errors.location}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Height"
                onBlur={handleBlur}
                onChange={(e) => setHeight(e.target.value)}
                value={values.address1}
                name="height"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Width"
                onBlur={handleBlur}
                onChange={(e) => setWidth(e.target.value)}
                value={values.address1}
                name="width"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Display type"
                onBlur={handleBlur}
                onChange={(e) => setDisplay_type(e.target.value)}
                value={values.address1}
                name="display_type"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Price"
                onBlur={handleBlur}
                onChange={(e) => setPrice(e.target.value)}
                value={values.address2}
                name="price"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Product
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ProductForm;
