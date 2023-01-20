import React, { useEffect, useState } from 'react';

import { Box, Tab, Tabs as MUITabs } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import TabPanel from './TabPanel';

const Tabs = ({ currentTab, tabContent }) => {
  const [value, setValue] = React.useState(currentTab);

  useEffect(() => {
    setValue(currentTab);
  }, [currentTab])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!tabContent || !tabContent.length) return;

  return (
  <Box sx={{ width: '100%' }}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <MUITabs value={value} onChange={handleChange} aria-label="basic tabs example">
        {tabContent.map((tab, index) => <Tab key={index} label={tab.label} id={`tab-${index}`} />)}
      </MUITabs>
    </Box>
    {tabContent.map((tab, index) => <TabPanel key={index} children={tab.panel} id={`tab-panel-${index}`} index={index} value={value} />)}
  </Box>
  );
} 

export default Tabs;