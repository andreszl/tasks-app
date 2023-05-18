import React from 'react';

interface Props {
	children: JSX.Element
}

export default (props: Props) => {
	const { children } = props;
	return (
		<> {children} </>
	);
};
