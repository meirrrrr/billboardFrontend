import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import { Link } from "react-router-dom";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected == title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box>
      <Sidebar collapsed={isCollapsed} style={{ height: "100%" }}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h6">Menu</Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Admin
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Managers"
              to="/admin/managers"
              icon={<AccountBoxIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Products"
              to="/admin/products"
              icon={<ShoppingBasketIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Orders"
              to="/admin/orders"
              icon={<HomeRepairServiceIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export { Item, SideBar };
