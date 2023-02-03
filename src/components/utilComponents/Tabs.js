import React, { useEffect } from 'react';

import { Tab, Tabs as MUITabs } from '@mui/material';

import TabPanel from './TabPanel';

const tabsBoxContainerStyle = {
  display: 'flex',
}
const tabsContainerStyle = {
  '& .MuiTabs-indicator': {
    display: 'none',
  },
};

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
  <div
    className={`${orientation === 'vertical' ? 'tabs-vertical' : 'tabs'}`}
    style={orientation === 'vertical' ? tabsBoxContainerStyle : {}}
  >
    <MUITabs
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      allowScrollButtonsMobile
      orientation={orientation}
      sx={orientation === 'vertical' ? tabsContainerStyle : {}}
    >
      {tabContent.map((tab, index) => 
        <Tab
          // className={`${orientation === 'vertical' ? 'tabs-vertical-hover' : 'tabs-hover'}`}
          className='tabs-hover'
          key={index}
          label={tab.label}
          id={`tab-${index}`}
          wrapped
          disableRipple
          />
      )}
    </MUITabs>
    {tabContent.map((tab, index) => 
      <div className={`${orientation === 'vertical' ? 'tabPanel-vertical' : 'tabPanel'}`}>
        <TabPanel
          key={index}
          children={tab.panel}
          id={`tab-panel-${index}`}
          index={index}
          value={value}
        />
      </div>
    )}
  </div>
  );
} 

export default Tabs;