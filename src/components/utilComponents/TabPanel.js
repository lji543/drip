import React from 'react';

import { Box, Typography } from '@mui/material';

const tabPanelStyle = {
  // width: 400,
}
const panelStyle = {
  padding: '0 24px',
  // width: 400,
}

const TabPanel = (props) => {
  const { children, styleProps, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={tabPanelStyle}
      {...other}
    >
      {value === index && (
        // <Box sx={{ p: 3, ...styleProps }}>
        <div style={{ panelStyle, ...styleProps }}>
          {children}
        {/* </Box> */}
        </div>
      )}
    </div>
  );
}

export default TabPanel;