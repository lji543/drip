import React from "react";

import { AppBar, Tab, Tabs } from "@mui/material";

function Navigation({ handlePageChange, page }) {
	return (
		<div className="navigation">
			<AppBar position="static" color="default">
				<Tabs value={page} onChange={handlePageChange}>
					<Tab label="Summary" />
					<Tab label="Expenses" />
				</Tabs>
			</AppBar>
		</div>
	);
}

export default Navigation;
