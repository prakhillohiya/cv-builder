import { Icon } from "@iconify/react";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useCustomMutationClient } from "../../config/queryClient";

export default function Badge() {
  const navigate = useNavigate();

  const { mutate, isPending, error, isSuccess } =
    useCustomMutationClient<unknown>({
      url: "/user/logout",
      method: "post",
      mutationKey: "postLogout",
      successCallback: () => {
        navigate("/login");
      },
    });

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    mutate(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          onClick={(e) => handleClick(e)}
          size="small"
          sx={{ ml: 2, marginLeft: "auto", padding: "1rem" }}
          aria-haspopup="true"
        >
          <Avatar
            sx={{
              width: 60,
              height: 60,
              backgroundColor: "white",
              color: "black",
            }}
          >
            Hi
          </Avatar>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogoutClick}>
          <ListItemIcon>
            <Icon
              icon={"heroicons-solid:logout"}
              width={"1.5rem"}
              height={"1.5rem"}
            />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
