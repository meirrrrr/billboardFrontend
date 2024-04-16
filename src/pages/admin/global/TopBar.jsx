import { Box, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const TopBar = () => {
  return (
    <Box display={"flex"} justifyContent={"space-between"} p={2}>
      {/* {SEARCH BAR} */}
      <Box display={"flex"} borderRadius="3px">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button">
          <SearchIcon />
        </IconButton>
      </Box>

      <Box display="flex">
        <IconButton>
          <PersonOutlineIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TopBar;
