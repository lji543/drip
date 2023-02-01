import React from 'react';

const panelStyle = {
  padding: '0 24px',
}

const TabPanel = (props) => {
  const { children, styleProps, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div style={{ panelStyle, ...styleProps }}>
          {children}
        </div>
      )}
    </div>
  );
}

export default TabPanel;