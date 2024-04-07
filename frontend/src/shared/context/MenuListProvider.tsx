import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Icon } from '@iconify/react';

export type IconType = {
  width: string;
  height: string;
  name: string;
};

export interface IMenuList {
  icon: IconType;
  label: string;
}

interface MenuListProps {
  items: IMenuList[];
}

const MenuList: React.FC<MenuListProps> = ({ items }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <button onClick={handleClick}>Open Menu</button>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {items.map((x, i) => (
          <MenuItem onClick={handleClose} key={i}>
            <ListItemIcon>
              <Icon icon={x.icon.name} width={x.icon.width} height={x.icon.height} />
            </ListItemIcon>
            {x.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MenuList;
