import React from 'react';

import { AppBar, Tab, Tabs } from '@mui/material';

function Navigation({ handlePageChange, page }) {
	return (
		<div className='navigation'>
			<AppBar position='static'>
				<Tabs className='navigation-tabs' value={page} onChange={handlePageChange}>
					<Tab className='navigation-links' label='Summary' />
					<Tab className='navigation-links' label='Monthly' />
					<Tab className='navigation-links' label='Categorically' />
					<Tab className='navigation-links' label='Tracker' />
				</Tabs>
			</AppBar>
		</div>
	);
}

export default Navigation;
