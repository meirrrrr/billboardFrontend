import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import Header from "../../../components/admin/Header";
import { useEffect, useState } from "react";
import axios from "axios";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  passwd: "",
};

const base_url = "http://192.168.1.213:8080/admin/manager";

const Forms = () => {
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  function createUser() {
    console.log({
      name: name,
      surname: surname,
      email: email,
      username: username,
      password: password,
    });
    axios
      .post(base_url, {
        name: name,
        surname: surname,
        email: email,
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response);
      });
  }

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a new user Profile" />
      <Formik initialValues={initialValues} onSubmit={createUser}>
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
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={(e) => setName(e.target.value)}
                value={values.address1}
                name="username"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Surname"
                onBlur={handleBlur}
                onChange={(e) => setSurname(e.target.value)}
                value={values.address1}
                name="name"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Username"
                onBlur={handleBlur}
                onChange={(e) => setUsername(e.target.value)}
                value={values.address1}
                name="surname"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={(e) => setEmail(e.target.value)}
                value={values.address1}
                name="email"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => setPassword(e.target.value)}
                value={values.address2}
                name="Password"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Forms;
