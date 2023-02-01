import React, { useEffect } from 'react';

import { Box, Tab, Tabs as MUITabs } from '@mui/material';

import TabPanel from './TabPanel';

const tabsBoxContainerStyle = {
  display: 'flex',
}
const tabsContainerStyle = {
  '& .MuiTabs-indicator': {
    display: 'none',
  },
}
const tabsStyle = {
  '&.Mui-selected': {
    background: '#d0e5ff',
    fontWeight: 600,
  },
}
const tabPanelStyle = {
  background: '#d0e5ff',
}

const Tabs = ({ currentTab, tabContent, orientation }) => {
  const [value, setValue] = React.useState(currentTab);

  useEffect(() => {
    setValue(currentTab);
  }, [currentTab])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!tabContent || !tabContent.length) return;

  return (
  <Box style={orientation === 'vertical' ? tabsBoxContainerStyle : {}}>
    <MUITabs
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      orientation={orientation}
      sx={orientation === 'vertical' ? tabsContainerStyle : {}}
    >
      {tabContent.map((tab, index) => 
        <Tab
          key={index}
          label={tab.label}
          id={`tab-${index}`}
          wrapped
          sx={orientation === 'vertical' ? tabsStyle : {}}
        />
      )}
    </MUITabs>
    {tabContent.map((tab, index) => 
      <TabPanel
        key={index}
        children={tab.panel}
        id={`tab-panel-${index}`}
        index={index}
        value={value}
        styleProps={orientation === 'vertical' ? tabPanelStyle : {}}
      />
    )}
  </Box>
  );
} 

export default Tabs;