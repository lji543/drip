import React from 'react';

import { AppBar, Tab, Tabs } from '@mui/material';

function Navigation({ handlePageChange, page }) {
	return (
		<div className='navigation'>
			<AppBar position='static' className='navigation-appBar'>
				<Tabs
					className='navigation-tabs'
					value={page}
					onChange={handlePageChange}
					variant="scrollable"
      		scrollButtons="auto"
				>
					<Tab key={'summary'} className='navigation-links' label='Summary' />
					<Tab key={'monthly'} className='navigation-links' label='Monthly' />
					<Tab key={'categorically'} className='navigation-links' label='Categorically' />
					<Tab key={'tracker'} className='navigation-links' label='Tracker' />
					<Tab key={'logout'} className='navigation-links' label='-Logout-' />
				</Tabs>
			</AppBar>
		</div>
	);
}

export default Navigation;
