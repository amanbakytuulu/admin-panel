import * as React from 'react';
import { styled, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { LogoIcon } from '../icons/logo';
import { useMediaQuery, Theme, Avatar } from '@mui/material';
import { sidebarItems } from './utils';
import { SidebarItem } from './SidebarItem';
import { Link } from 'react-router-dom';

export const drawerWidth = 100;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  borderTopRightRadius: '15px',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 40px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    position: 'absolute',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export const Sidebar = () => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const isLgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false,
  });

  return (
    <Drawer
      anchor="left"
      onClose={handleDrawerToggle}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280,
        },
      }}
      variant={isLgUp ? 'permanent' : 'temporary'}
    >   
      <Link to="/">
        <DrawerHeader>
          <LogoIcon />
        </DrawerHeader>
      </Link>
      <List>
        <Avatar 
          sx={{ margin: '0 auto 10px', width: 60, height: 60 }} 
          src='https://cdn.pixabay.com/photo/2015/06/22/08/40/child-817373_1280.jpg' 
        />
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.title}
            open={open}
            {...item}
          />
        ))}
      </List>
    </Drawer>
  );
}
