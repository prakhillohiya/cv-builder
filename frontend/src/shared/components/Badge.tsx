import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Icon } from "@iconify/react";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
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
    mutate({logout:true});
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          onClick={(e) => handleClick(e)}
          size="small"
          sx={{ ml: 2, marginLeft: "auto", padding: "1rem" }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
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
