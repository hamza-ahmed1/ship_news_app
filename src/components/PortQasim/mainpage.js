import * as React from 'react';
import PropTypes, { func } from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Navbar from '../Navbar';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}
function ExpectedShipArrivalAtOuterAnchorage() {
  return <div>Arrivals Component</div>;
}

function OffPort() {
  return <div>Off Port Component</div>;
}

function DailyShippingProgram() {
  return <div>Daily Shipping Program Component</div>;
}
function BerthWiseCargoHandling() {
  return <div>Berth Wise Cargo Handling Component</div>;
}
 function DailyShippingandCargoHandlingReporst() {
  return <div>Daily Shipping and Cargo Handling Reports Component</div>;
}


TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function MainPagePortQasim() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Navbar />

      {/* FULL WIDTH CONTAINER */}
      <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
        <AppBar position="static" color="default" elevation={1}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            variant="fullWidth"
          >
            <Tab label="Expected Ship Arrival At Outer Anchorage" {...a11yProps(0)} />
            <Tab label="Off Port" {...a11yProps(1)} />
            <Tab label="Daily Shipping Program" {...a11yProps(2)} />
            <Tab label="Berth Wise Cargo Handling" {...a11yProps(3)} />
            <Tab label="Daily Shipping and Cargo Handling Reports" {...a11yProps(4)} />

          </Tabs>
        </AppBar>

        {/* TAB CONTENT */}
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ExpectedShipArrivalAtOuterAnchorage />
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
          <OffPort />
        </TabPanel>

        <TabPanel value={value} index={2} dir={theme.direction}>
          <DailyShippingProgram />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <BerthWiseCargoHandling />
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
            <DailyShippingandCargoHandlingReporst />
        </TabPanel>
      </Box>
    </>
  );
}

