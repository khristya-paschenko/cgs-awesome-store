import React, { FunctionComponent } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';

type NavContainerProps = {
	children: React.ReactNode;
};

export const NavContainer: FunctionComponent<NavContainerProps> = ({
	children,
}) => {
	return (
		<>
			<StatusBar style="dark" />
			<NavigationContainer>{children}</NavigationContainer>
		</>
	);
};
