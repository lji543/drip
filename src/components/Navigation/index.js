import React from 'react';
import { Link } from "react-router-dom";

import { AppBar, Button } from '@mui/material';

function Navigation({ handleSelectionChange, isActive }) {

	return (
		<AppBar position='static' className='nav-appBar'>
			{/* <nav
				className='navigation-tabs'
				// value={page}
				// onChange={handlePageChange}
				variant="scrollable"
				// scrollButtons="auto"
			> */}
				<Button
					className={`nav-buttonLink ${isActive === '/' && 'nav-activeButtonLink'}`}
					onClick={() => handleSelectionChange('/')}
				>
					<Link className='nav-links' to='/'>
						Home
					</Link>
				</Button>
				<Button
					className={`nav-buttonLink ${isActive === '/Summary' && 'nav-activeButtonLink'}`}
					onClick={() => handleSelectionChange('/Summary')}
				>
					<Link className='nav-links' to='/Summary'>Summary</Link>
				</Button>
				<Button
					className={`nav-buttonLink ${isActive === '/Monthly' && 'nav-activeButtonLink'}`}
					onClick={() => handleSelectionChange('/Monthly')}
				>
					<Link className='nav-links' to='/Monthly'>Monthly</Link>
				</Button>
				<Button
					className={`nav-buttonLink ${isActive === '/MonthlyTally' && 'nav-activeButtonLink'}`}
					onClick={() => handleSelectionChange('/MonthlyTally')}
				>
					<Link className='nav-links' to='/MonthlyTally'>Monthly Tally</Link>
				</Button>
				<Button
					className={`nav-buttonLink ${isActive === '/Categorically' && 'nav-activeButtonLink'}`}
					onClick={() => handleSelectionChange('/Categorically')}
				>
					<Link className='nav-links' to='/Categorically'>Categorically</Link>
				</Button>
				<Button
					className={`nav-buttonLink ${isActive === '/Tracker' && 'nav-activeButtonLink'}`}
					onClick={() => handleSelectionChange('/Tracker')}
				>
					<Link className='nav-links' to='/Tracker'>Tracker</Link>
				</Button>
				<Button
					className={`nav-buttonLink ${isActive === '/Mortgage' && 'nav-activeButtonLink'}`}
					onClick={() => handleSelectionChange('/Mortgage')}
				>
					<Link className='nav-links' to='/Mortgage'>Mortgage</Link>
				</Button>
				<Button
					className={`nav-buttonLink ${isActive === '/Logout' && 'nav-activeButtonLink'}`}
					onClick={() => handleSelectionChange('/Logout')}
				>
					<Link className='nav-links' to='/Logout'>-Logout-</Link>
				</Button>
			{/* </nav> */}
		</AppBar>
	);
}

export default Navigation;
