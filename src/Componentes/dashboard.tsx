import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  Container,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  ListItemButton ,
  Collapse,
} from '@mui/material';
import {
  Dashboard,
  People,
  BarChart,
  Pets,
  ExpandLess,
  ExpandMore,
  MusicNote,
} from '@mui/icons-material';

const drawerWidth = 240;

const Dashboards: React.FC = () => {
  const [openAnimales, setOpenAnimales] = React.useState(false);

  const handleClickAnimales = () => {
    setOpenAnimales(!openAnimales);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Intranet-Martin
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Inicio', 'Categoria', 'Digimon', 'Animales', 'Paises', 'Music', 'Youtube'].map((text, index) => (
              <div key={text}>
                {text === 'Animales' ? (
                  <ListItem component="button" onClick={handleClickAnimales}>
                    <ListItemIcon>
                      <Pets />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    {openAnimales ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                ) : (
                  <ListItemButton component={Link} to={text.toLowerCase()}>
                    <ListItemIcon>
                      {index === 0 ? (
                        <Dashboard />
                      ) : index === 1 ? (
                        <People />
                      ) : index === 2 ? (
                        <BarChart />
                      ) : index === 5 ? (
                        <MusicNote />
                      ) : (
                        <BarChart />
                      )}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                )}
                {text === 'Animales' && (
                  <Collapse in={openAnimales} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton component={Link} to="perro">
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary="Perro" />
                      </ListItemButton>
                      <ListItemButton component={Link} to="gato">
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary="Gato" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                )}
              </div>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Container>
          <Typography variant="h4" gutterBottom>
            Welcome to the Dashboard
          </Typography>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboards;