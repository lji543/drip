import React from "react";

const PageWrapper = (props) => {
	const { children, value, index } = props;

	return (
		<div role="page-tabpanel" hidden={value !== index}>
			{value === index && <div className="page-wrapper">{children}</div>}
		</div>
	);
};

export default PageWrapper;
