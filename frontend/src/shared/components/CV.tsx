import { Icon } from "@iconify/react";
import {
  Box,
  Chip,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { z } from "zod";
import {
  IProfile,
  ITemplate,
  ZProfileSchema,
  ZTemplateSchema
} from "../context/StoreProvider";

export const ZCVSchema = z.object({
  _id: z.string(),
  profile: ZProfileSchema,
  template: ZTemplateSchema,
  title: z.string().min(1),
});

type ICVType = z.infer<typeof ZCVSchema>;

export interface ICV extends ICVType {}

export interface ICV {
  _id: string;
  profile: IProfile;
  template: ITemplate;
  title: string;
}

export interface IMenuItems {
  id: string;
  action: string;
  icon: string;
}

const CV: React.FC<{
  cv: ICV[];
  menuItems: IMenuItems[];
  parentMenuItemClick: ({ id, action }: Partial<IMenuItems>, cv: ICV) => void;
}> = ({ cv, parentMenuItemClick, menuItems }) => {
  const [anchorEls, setAnchorEls] = useState<{
    [key: string]: null | HTMLElement;
  }>({});

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    setAnchorEls((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  const handleClose = (id: string) => {
    setAnchorEls((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  const handleMenuItemClick = (
    anchorId: string,
    { action }: IMenuItems,
    cv: ICV
  ) => {
    parentMenuItemClick({ action }, cv);
    handleClose(anchorId);
  };

  return (
    <>
      <React.Fragment>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            margin: "5rem",
          }}
        >
          {cv.map((x, i) => {
            const id = x._id;
            return (
              <Fragment key={id}>
                <div className="flex flex-col justify-center p-4 bg-green-200 m-4 rounded-lg">
                  <IconButton
                    onClick={(e) => handleClick(e, id)}
                    size="small"
                    aria-controls={
                      anchorEls[id] ? `account-menu-${id}` : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={anchorEls[id] ? "true" : undefined}
                  >
                    <Icon
                      icon={"pepicons-pop:cv"}
                      width={"5rem"}
                      height={"5rem"}
                    />
                  </IconButton>
                  <Chip
                    label={`${cv[i].title}`}
                    color="primary"
                    sx={{
                      margin: "1rem",
                      width: "100%",
                      marginLeft: "auto",
                      marginRight: "auto",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  />
                </div>

                <Menu
                  anchorEl={anchorEls[id]}
                  id={`account-menu-${id}`}
                  open={Boolean(anchorEls[id])}
                  onClose={() => handleClose(id)}
                >
                  {menuItems.map((item, index) => (
                    <MenuItem
                      key={item.id}
                      onClick={() => handleMenuItemClick(id, item, x)}
                    >
                      <ListItemIcon>
                        <Icon
                          icon={item.icon}
                          width={"1.5rem"}
                          height={"1.5rem"}
                        />
                      </ListItemIcon>
                      {item.action}
                    </MenuItem>
                  ))}
                </Menu>
              </Fragment>
            );
          })}
        </Box>
      </React.Fragment>
    </>
  );
};

export default CV;
